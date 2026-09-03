import "server-only";

import { unstable_cache } from "next/cache";
import readingTime from "reading-time";
import { getPayload, type Payload } from "payload";

import configPromise from "@payload-config";

import type {
  CmsCurrentStatus,
  CmsPost,
  CmsProject,
  CmsReadingTime,
  CmsScreenshot,
  CmsSpotlightFeature,
} from "./types";
import { CMS_TAGS } from "./tags";
import {
  getFallbackFeaturedProjects,
  getFallbackPostBySlug,
  getFallbackPosts,
  getFallbackProjectBySlug,
  getFallbackProjects,
} from "./fallback-content";

const CMS_REVALIDATE_SECONDS = 300;

export { CMS_TAGS };

let payloadInstancePromise: Promise<Payload> | null = null;

function getPayloadClient(): Promise<Payload> {
  if (!payloadInstancePromise) {
    payloadInstancePromise = getPayload({ config: configPromise });
  }

  return payloadInstancePromise;
}

export function isCmsConfigured() {
  return true;
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTextList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      const record = item as Record<string, unknown>;
      return (
        normalizeString(record.value) ||
        normalizeString(record.label) ||
        normalizeString(record.url)
      );
    })
    .filter(Boolean);
}

function normalizeReadingTime(raw: ReturnType<typeof readingTime>): CmsReadingTime {
  return {
    text: raw.text,
    minutes: Math.max(1, Math.ceil(raw.minutes)),
    words: raw.words,
  };
}

export function resolveMediaUrl(value?: string | null) {
  if (!value) {
    return "";
  }

  return value.trim();
}

type PostDoc = {
  id: number | string;
  slug?: string;
  title?: string;
  date?: string | Date | null;
  summary?: string | null;
  coverImage?: string | null;
  bodyMdx?: string | null;
  tags?: Array<{ value?: string } | string> | null;
};

function isoDate(value?: string | Date | null): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return normalizeString(value);
}

function normalizePost(doc: PostDoc, idFallback: string): CmsPost | null {
  const slug = normalizeString(doc.slug);
  const title = normalizeString(doc.title);

  if (!slug || !title) {
    return null;
  }

  const bodyMdx = normalizeString(doc.bodyMdx);
  const publishedAt = isoDate((doc as { createdAt?: string }).createdAt);
  const date = isoDate(doc.date) || publishedAt;

  return {
    id: String(doc.id ?? idFallback),
    slug,
    title,
    date,
    summary: normalizeString(doc.summary),
    tags: normalizeTextList(doc.tags),
    coverImage: resolveMediaUrl(doc.coverImage) || null,
    bodyMdx,
    readingTime: normalizeReadingTime(readingTime(bodyMdx)),
    url: `/blog/${slug}`,
    publishedAt,
    updatedAt: isoDate((doc as { updatedAt?: string }).updatedAt),
  };
}

type ProjectDoc = {
  id: number | string;
  slug?: string;
  title?: string;
  isFeatured?: boolean | null;
  summary?: string | null;
  image?: string | null;
  role?: string | null;
  category?: string | null;
  liveDemo?: string | null;
  sourceCode?: string | null;
  purpose?: string | null;
  expectedOutcome?: string | null;
  frameworkExperience?: string | null;
  accessibilityLearnings?: string | null;
  impact?: string | null;
  coreFunctionalities?: Array<{ value?: string }> | null;
  technologies?: Array<{ value?: string }> | null;
  technicalChallenges?: Array<{ value?: string }> | null;
  solutions?: Array<{ value?: string }> | null;
  lessonsLearned?: Array<{ value?: string }> | null;
  initialDesigns?: Array<{ url?: string }> | null;
  spotlightFeature?: { title?: string | null; description?: string | null } | null;
  currentStatus?: { users?: string | null; feedback?: string | null } | null;
  screenshots?: Array<{ url?: string; caption?: string }> | null;
};

function normalizeSpotlightFeature(
  value: ProjectDoc["spotlightFeature"]
): CmsSpotlightFeature {
  return {
    title: normalizeString(value?.title),
    description: normalizeString(value?.description),
  };
}

function normalizeCurrentStatus(value: ProjectDoc["currentStatus"]): CmsCurrentStatus | null {
  const users = normalizeString(value?.users);
  const feedback = normalizeString(value?.feedback);

  if (!users && !feedback) {
    return null;
  }

  return { users, feedback };
}

function normalizeScreenshots(value: ProjectDoc["screenshots"]): CmsScreenshot[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      url: resolveMediaUrl(item.url),
      caption: normalizeString(item.caption),
    }))
    .filter((item) => item.url || item.caption);
}

function normalizeProject(doc: ProjectDoc, idFallback: string): CmsProject | null {
  const slug = normalizeString(doc.slug);
  const title = normalizeString(doc.title);

  if (!slug || !title) {
    return null;
  }

  const publishedAt = isoDate((doc as { createdAt?: string }).createdAt);

  return {
    id: String(doc.id ?? idFallback),
    slug,
    title,
    isFeatured: Boolean(doc.isFeatured),
    summary: normalizeString(doc.summary),
    imageUrl: resolveMediaUrl(doc.image),
    coreFunctionalities: normalizeTextList(doc.coreFunctionalities),
    role: normalizeString(doc.role),
    technologies: normalizeTextList(doc.technologies),
    category: normalizeString(doc.category) === "mobile" ? "mobile" : "web",
    liveDemo: normalizeString(doc.liveDemo) || null,
    sourceCode: normalizeString(doc.sourceCode) || null,
    purpose: normalizeString(doc.purpose),
    expectedOutcome: normalizeString(doc.expectedOutcome),
    initialDesigns: normalizeTextList(doc.initialDesigns),
    spotlightFeature: normalizeSpotlightFeature(doc.spotlightFeature),
    technicalChallenges: normalizeTextList(doc.technicalChallenges),
    solutions: normalizeTextList(doc.solutions),
    currentStatus: normalizeCurrentStatus(doc.currentStatus),
    lessonsLearned: normalizeTextList(doc.lessonsLearned),
    frameworkExperience: normalizeString(doc.frameworkExperience) || null,
    accessibilityLearnings: normalizeString(doc.accessibilityLearnings) || null,
    impact: normalizeString(doc.impact),
    screenshots: normalizeScreenshots(doc.screenshots),
    publishedAt,
    updatedAt: isoDate((doc as { updatedAt?: string }).updatedAt),
  };
}

function cached<T>(name: string, tags: string[], loader: () => Promise<T>) {
  return unstable_cache(loader, [name], {
    tags,
    revalidate: CMS_REVALIDATE_SECONDS,
  })();
}

async function queryPosts(options: {
  limit?: number;
}): Promise<CmsPost[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
    draft: false,
    depth: 0,
    sort: "-date",
    limit: options.limit ?? 100,
  });

  return result.docs
    .map((doc) => normalizePost(doc as PostDoc, String(doc.id)))
    .filter((post): post is CmsPost => Boolean(post));
}

async function queryProjects(options: {
  featuredOnly?: boolean;
  limit?: number;
}): Promise<CmsProject[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "projects",
    draft: false,
    depth: 0,
    sort: "title",
    limit: options.limit ?? 100,
    where: options.featuredOnly ? { isFeatured: { equals: true } } : undefined,
  });

  return result.docs
    .map((doc) => normalizeProject(doc as ProjectDoc, String(doc.id)))
    .filter((project): project is CmsProject => Boolean(project));
}

export async function getPosts(): Promise<CmsPost[] | null> {
  try {
    return await cached("cms-posts", [CMS_TAGS.posts, CMS_TAGS.sitemap], () =>
      queryPosts({})
    );
  } catch (error) {
    console.error("Payload query failed for getPosts — serving local fallback.", error);
    return getFallbackPosts();
  }
}

export async function getLatestPosts(limit = 6): Promise<CmsPost[] | null> {
  try {
    return await cached(`cms-posts-latest-${limit}`, [CMS_TAGS.posts, CMS_TAGS.home], () =>
      queryPosts({ limit })
    );
  } catch (error) {
    console.error("Payload query failed for getLatestPosts — serving local fallback.", error);
    return getFallbackPosts().slice(0, limit);
  }
}

export async function getPostBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);

  try {
    const posts = await cached(`cms-post-${decodedSlug}`, [CMS_TAGS.post(decodedSlug), CMS_TAGS.posts], async () => {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "posts",
        draft: false,
        depth: 0,
        limit: 1,
        where: { slug: { equals: decodedSlug } },
      });
      return result.docs.map((doc) => normalizePost(doc as PostDoc, String(doc.id)));
    });

    return posts[0] ?? null;
  } catch (error) {
    console.error(`Payload query failed for getPostBySlug(${decodedSlug}) — serving local fallback.`, error);
    return getFallbackPostBySlug(decodedSlug);
  }
}

export async function getProjects(): Promise<CmsProject[] | null> {
  try {
    return await cached("cms-projects", [CMS_TAGS.projects, CMS_TAGS.sitemap], () =>
      queryProjects({})
    );
  } catch (error) {
    console.error("Payload query failed for getProjects — serving local fallback.", error);
    return getFallbackProjects();
  }
}

export async function getFeaturedProjects(limit = 6): Promise<CmsProject[] | null> {
  try {
    return await cached(`cms-projects-featured-${limit}`, [CMS_TAGS.projects, CMS_TAGS.home], () =>
      queryProjects({ featuredOnly: true, limit })
    );
  } catch (error) {
    console.error("Payload query failed for getFeaturedProjects — serving local fallback.", error);
    return getFallbackFeaturedProjects(limit);
  }
}

export async function getProjectBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);

  try {
    const projects = await cached(`cms-project-${decodedSlug}`, [CMS_TAGS.project(decodedSlug), CMS_TAGS.projects], async () => {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "projects",
        draft: false,
        depth: 0,
        limit: 1,
        where: { slug: { equals: decodedSlug } },
      });
      return result.docs.map((doc) => normalizeProject(doc as ProjectDoc, String(doc.id)));
    });

    return projects[0] ?? null;
  } catch (error) {
    console.error(`Payload query failed for getProjectBySlug(${decodedSlug}) — serving local fallback.`, error);
    return getFallbackProjectBySlug(decodedSlug);
  }
}
