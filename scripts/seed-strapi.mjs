import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT_DIR, "content", "blog");

const STRAPI_URL = process.env.STRAPI_URL?.trim()?.replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN?.trim();

if (!STRAPI_URL || !STRAPI_API_TOKEN) {
  console.error("Missing STRAPI_URL or STRAPI_API_TOKEN. Load your env vars and try again.");
  process.exit(1);
}

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${STRAPI_API_TOKEN}`,
  };
}

function buildUrl(pathname, query = {}) {
  const url = new URL(pathname, `${STRAPI_URL}/`);

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  return url;
}

async function request(method, pathname, { query, body } = {}) {
  const response = await fetch(buildUrl(pathname, query), {
    method,
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${pathname} failed (${response.status}): ${text}`);
  }

  return response.json();
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(target) : target;
    })
  );

  return files.flat();
}

function extractFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Invalid MDX frontmatter block");
  }

  return {
    frontmatter: match[1],
    body: match[2].trim(),
  };
}

function getFrontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim() || "";
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, "");
}

function parseTags(raw) {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return [];
  }

  return trimmed
    .slice(1, -1)
    .split(",")
    .map((item) => stripQuotes(item.trim()))
    .filter(Boolean);
}

function parseBoolean(raw) {
  return /^true$/i.test(raw.trim());
}

async function loadPosts() {
  const files = (await walk(CONTENT_DIR)).filter((file) => file.endsWith(".mdx"));

  return Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file, "utf8");
      const { frontmatter, body } = extractFrontmatter(raw);

      return {
        slug: path.relative(CONTENT_DIR, file).replace(/\\/g, "/").replace(/\.mdx$/, ""),
        title: stripQuotes(getFrontmatterValue(frontmatter, "title")),
        date: stripQuotes(getFrontmatterValue(frontmatter, "date")),
        summary: stripQuotes(getFrontmatterValue(frontmatter, "summary")),
        tags: parseTags(getFrontmatterValue(frontmatter, "tags")),
        draft: parseBoolean(getFrontmatterValue(frontmatter, "draft") || "false"),
        coverImage: stripQuotes(getFrontmatterValue(frontmatter, "image") || ""),
        bodyMdx: body,
      };
    })
  );
}

async function loadProjects() {
  const moduleUrl = pathToFileURL(path.join(ROOT_DIR, "src", "data", "index.ts")).href;
  const dataModule = await import(moduleUrl);
  return dataModule.projects;
}

function toValueComponents(values) {
  return values.map((value) => ({ value }));
}

function toAssetComponents(values) {
  return values.map((url) => ({ url }));
}

function toScreenshotComponents(values) {
  return values.map((item) => ({
    url: item.url,
    caption: item.caption,
  }));
}

async function findBySlug(collectionName, slug) {
  const payload = await request("GET", `/api/${collectionName}`, {
    query: {
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
      "status": "published",
    },
  });

  return payload.data?.[0] || null;
}

async function upsert(collectionName, slug, data) {
  const existing = await findBySlug(collectionName, slug);

  if (existing) {
    const identifier = existing.documentId || existing.id;
    await request("PUT", `/api/${collectionName}/${identifier}`, {
      body: { data },
    });
    return "updated";
  }

  await request("POST", `/api/${collectionName}`, {
    body: { data },
  });
  return "created";
}

async function seedPosts() {
  const posts = await loadPosts();

  for (const post of posts) {
    if (post.draft) {
      console.log(`Post skipped (draft): ${post.slug}`);
      continue;
    }

    const result = await upsert("posts", post.slug, {
      title: post.title,
      slug: post.slug,
      date: post.date,
      summary: post.summary,
      coverImage: post.coverImage || null,
      bodyMdx: post.bodyMdx,
      tags: toValueComponents(post.tags),
    });

    console.log(`Post ${result}: ${post.slug}`);
  }
}

async function seedProjects() {
  const projects = await loadProjects();

  for (const project of projects) {
    const result = await upsert("projects", project.slug, {
      title: project.title,
      slug: project.slug,
      isFeatured: Boolean(project.isFeatured),
      summary: project.summary,
      image: project.imageUrl,
      coreFunctionalities: toValueComponents(project.coreFunctionalities),
      role: project.role,
      technologies: toValueComponents(project.technologies),
      category: project.category,
      liveDemo: project.liveDemo || null,
      sourceCode: project.sourceCode || null,
      purpose: project.purpose,
      expectedOutcome: project.expectedOutcome,
      initialDesigns: toAssetComponents(project.initialDesigns),
      spotlightFeature: {
        title: project.spotlightFeature.title,
        description: project.spotlightFeature.description,
      },
      technicalChallenges: toValueComponents(project.technicalChallenges),
      solutions: toValueComponents(project.solutions),
      currentStatus: project.currentStatus
        ? {
            users: project.currentStatus.users,
            feedback: project.currentStatus.feedback,
          }
        : null,
      lessonsLearned: toValueComponents(project.lessonsLearned),
      frameworkExperience: project.frameworkExperience || null,
      accessibilityLearnings: project.accessibilityLearnings || null,
      impact: project.impact,
      screenshots: toScreenshotComponents(project.screenshots),
    });

    console.log(`Project ${result}: ${project.slug}`);
  }
}

async function main() {
  await seedPosts();
  await seedProjects();
  console.log("Strapi seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
