/**
 * Seeds Payload with content from the repo's local sources:
 *   - projects from src/data/index.ts
 *   - posts   from content/blog/*.mdx
 *
 * Idempotent by slug: existing entries are updated, new entries are created.
 *
 * Run against a target database with its env vars loaded, e.g.:
 *   vercel env run node --disable-warning=ExperimentalWarning scripts/seed-payload.mts
 */

import { existsSync, promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(ROOT_DIR, "content", "blog");

type LocalProject = {
  id: number;
  slug: string;
  title: string;
  isFeatured?: boolean;
  summary: string;
  imageUrl: string;
  coreFunctionalities: string[];
  role: string;
  technologies: string[];
  category: string;
  liveDemo?: string;
  sourceCode?: string;
  purpose: string;
  expectedOutcome: string;
  initialDesigns: string[];
  spotlightFeature: { title: string; description: string };
  technicalChallenges: string[];
  solutions: string[];
  currentStatus?: { users: string; feedback: string } | null;
  lessonsLearned: string[];
  frameworkExperience?: string;
  accessibilityLearnings?: string;
  impact: string;
  screenshots: Array<{ url: string; caption: string }>;
};

type SeedPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  coverImage: string | null;
  bodyMdx: string;
};

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

function normalizeDate(raw) {
  const trimmed = stripQuotes(raw).trim();
  const match = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    const [, year, month, day] = match;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return trimmed;
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

async function loadPosts(): Promise<SeedPost[]> {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = (await walk(CONTENT_DIR)).filter((file) => file.endsWith(".mdx"));

  return Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file, "utf8");
      const { frontmatter, body } = extractFrontmatter(raw);

      return {
        slug: path.relative(CONTENT_DIR, file).replace(/\\/g, "/").replace(/\.mdx$/, ""),
        title: stripQuotes(getFrontmatterValue(frontmatter, "title")),
        date: normalizeDate(getFrontmatterValue(frontmatter, "date")),
        summary: stripQuotes(getFrontmatterValue(frontmatter, "summary")),
        tags: parseTags(getFrontmatterValue(frontmatter, "tags")),
        draft: /^true$/i.test(getFrontmatterValue(frontmatter, "draft") || "false"),
        coverImage: stripQuotes(getFrontmatterValue(frontmatter, "image")) || null,
        bodyMdx: body,
      };
    })
  );
}

async function loadProjects(): Promise<LocalProject[]> {
  const dataModule = await import(path.join(ROOT_DIR, "src", "data", "index.ts"));
  return dataModule.marwanData.projects;
}

async function upsertBySlug(collection, slug, data, payload) {
  // Include drafts so an unpublished-but-existing doc gets updated instead of duplicated.
  const existing = await payload.find({
    collection,
    depth: 0,
    draft: true,
    limit: 1,
    where: { slug: { equals: slug } },
  });

  if (existing.docs.length > 0) {
    const doc = existing.docs[0];
    await payload.update({
      collection,
      id: doc.id,
      data: { ...data, _status: "published" },
      draft: false,
    });
    return `updated ${collection}/${slug}`;
  }

  await payload.create({
    collection,
    data: { ...data, _status: "published" },
    draft: false,
  });
  return `created ${collection}/${slug}`;
}

function projectToPayload(project: LocalProject) {
  const toValues = (values: string[]) => values.map((value) => ({ value }));
  const currentStatus = project.currentStatus;

  return {
    title: project.title,
    slug: project.slug,
    isFeatured: Boolean(project.isFeatured),
    summary: project.summary,
    image: project.imageUrl,
    role: project.role,
    category: project.category === "mobile" ? "mobile" : "web",
    liveDemo: project.liveDemo || undefined,
    sourceCode: project.sourceCode || undefined,
    purpose: project.purpose,
    expectedOutcome: project.expectedOutcome,
    frameworkExperience: project.frameworkExperience || undefined,
    accessibilityLearnings: project.accessibilityLearnings || undefined,
    impact: project.impact,
    coreFunctionalities: toValues(project.coreFunctionalities ?? []),
    technologies: toValues(project.technologies ?? []),
    technicalChallenges: toValues(project.technicalChallenges ?? []),
    solutions: toValues(project.solutions ?? []),
    lessonsLearned: toValues(project.lessonsLearned ?? []),
    initialDesigns: (project.initialDesigns ?? []).map((url) => ({ url })),
    spotlightFeature: {
      title: project.spotlightFeature?.title ?? "",
      description: project.spotlightFeature?.description ?? "",
    },
    currentStatus:
      currentStatus?.users || currentStatus?.feedback
        ? {
            users: currentStatus.users,
            feedback: currentStatus.feedback,
          }
        : undefined,
    screenshots: (project.screenshots ?? []).map((item) => ({
      url: item.url,
      caption: item.caption ?? "",
    })),
  };
}

async function main() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL && !process.env.DATABASE_URI) {
    console.error("Missing DATABASE_URL / POSTGRES_URL / DATABASE_URI.");
    console.error("Run through `vercel env run` or pass --env-file=<file> explicitly.");
    process.exit(1);
  }

  const [{ getPayload }, configModule] = await Promise.all([
    import("payload"),
    import("../payload.config.ts"),
  ]);

  const payload = await getPayload({ config: configModule.default });

  const posts = (await loadPosts()).filter((post) => !post.draft);
  for (const post of posts) {
    const message = await upsertBySlug(
      "posts",
      post.slug,
      {
        title: post.title,
        slug: post.slug,
        date: post.date ? `${post.date}T00:00:00.000Z` : undefined,
        summary: post.summary,
        coverImage: post.coverImage ?? undefined,
        bodyMdx: post.bodyMdx,
        tags: post.tags.map((value) => ({ value })),
      },
      payload
    );
    console.log(message);
  }

  const projects = await loadProjects();
  for (const project of projects) {
    const message = await upsertBySlug("projects", project.slug, projectToPayload(project), payload);
    console.log(message);
  }

  console.log(`Done. ${posts.length} post(s), ${projects.length} project(s).`);
  await payload.destroy();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
