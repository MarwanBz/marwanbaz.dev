import "server-only";

import readingTime from "reading-time";

import type {
  CmsCurrentStatus,
  CmsPost,
  CmsProject,
  CmsReadingTime,
  CmsScreenshot,
  CmsSpotlightFeature,
} from "./types";

const CMS_REVALIDATE_SECONDS = 300;

export const CMS_TAGS = {
  home: "cms:home",
  posts: "cms:posts",
  projects: "cms:projects",
  sitemap: "cms:sitemap",
  post: (slug: string) => `cms:post:${slug}`,
  project: (slug: string) => `cms:project:${slug}`,
} as const;

interface StrapiConfig {
  baseUrl: string;
  apiToken?: string;
}

type UnknownRecord = Record<string, unknown>;

function getStrapiConfig(): StrapiConfig | null {
  const rawBaseUrl = process.env.STRAPI_URL?.trim();
  if (!rawBaseUrl) {
    return null;
  }

  return {
    baseUrl: rawBaseUrl.replace(/\/$/, ""),
    apiToken: process.env.STRAPI_API_TOKEN?.trim() || undefined,
  };
}

export function isCmsConfigured() {
  return Boolean(getStrapiConfig());
}

function getEntityField<T>(entity: unknown, key: string): T | undefined {
  if (!entity || typeof entity !== "object") {
    return undefined;
  }

  const record = entity as UnknownRecord;
  if (key in record) {
    return record[key] as T;
  }

  const attributes = record.attributes;
  if (attributes && typeof attributes === "object" && key in attributes) {
    return (attributes as UnknownRecord)[key] as T;
  }

  return undefined;
}

function unwrapSingleEntity(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return value;
  }

  const record = value as UnknownRecord;
  if ("data" in record) {
    return unwrapSingleEntity(record.data);
  }

  return value;
}

function unwrapEntityArray(value: unknown): unknown[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => unwrapSingleEntity(item)).filter(Boolean);
  }

  if (typeof value === "object" && Array.isArray((value as UnknownRecord).data)) {
    return ((value as UnknownRecord).data as unknown[])
      .map((item) => unwrapSingleEntity(item))
      .filter(Boolean);
  }

  const single = unwrapSingleEntity(value);
  return single ? [single] : [];
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTextList(value: unknown) {
  return unwrapEntityArray(value)
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      return (
        normalizeString(getEntityField(item, "value")) ||
        normalizeString(getEntityField(item, "label")) ||
        normalizeString(getEntityField(item, "text")) ||
        normalizeString(getEntityField(item, "url"))
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

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const config = getStrapiConfig();
  if (value.startsWith("/uploads/") && config) {
    return `${config.baseUrl}${value}`;
  }

  return value;
}

function resolveMediaField(value: unknown) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return resolveMediaUrl(value);
  }

  const entity = unwrapSingleEntity(value);
  if (typeof entity === "string") {
    return resolveMediaUrl(entity);
  }

  return resolveMediaUrl(normalizeString(getEntityField(entity, "url")));
}

function resolveMediaList(value: unknown) {
  return unwrapEntityArray(value)
    .map((item) => {
      if (typeof item === "string") {
        return resolveMediaUrl(item);
      }

      return (
        resolveMediaUrl(normalizeString(getEntityField(item, "url"))) ||
        resolveMediaUrl(normalizeString(getEntityField(item, "value")))
      );
    })
    .filter(Boolean);
}

function normalizeScreenshot(value: unknown): CmsScreenshot {
  return {
    url:
      resolveMediaField(getEntityField(value, "image")) ||
      resolveMediaUrl(normalizeString(getEntityField(value, "url"))),
    caption: normalizeString(getEntityField(value, "caption")),
  };
}

function normalizeSpotlightFeature(value: unknown): CmsSpotlightFeature {
  return {
    title: normalizeString(getEntityField(value, "title")),
    description: normalizeString(getEntityField(value, "description")),
  };
}

function normalizeCurrentStatus(value: unknown): CmsCurrentStatus | null {
  const users = normalizeString(getEntityField(value, "users"));
  const feedback = normalizeString(getEntityField(value, "feedback"));

  if (!users && !feedback) {
    return null;
  }

  return { users, feedback };
}

const CMS_REQUEST_TIMEOUT_MS = 5000;

async function fetchStrapi<T>(
  pathname: string,
  searchParams: Record<string, string | number | undefined>,
  tags: string[]
): Promise<T | null> {
  const config = getStrapiConfig();
  if (!config) {
    return null;
  }

  const url = new URL(pathname, `${config.baseUrl}/`);
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined || value === "") {
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (config.apiToken) {
    headers.Authorization = `Bearer ${config.apiToken}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CMS_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      headers,
      signal: controller.signal,
      next: {
        revalidate: CMS_REVALIDATE_SECONDS,
        tags,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Strapi request failed: ${response.status} ${response.statusText}`, url.toString());
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`Strapi request timed out after ${CMS_REQUEST_TIMEOUT_MS}ms`, url.toString());
    } else {
      console.error(`Strapi request failed for ${url.toString()}`, error);
    }
    return null;
  }
}

function normalizePost(entity: unknown): CmsPost | null {
  const slug = normalizeString(getEntityField(entity, "slug"));
  const title = normalizeString(getEntityField(entity, "title"));

  if (!slug || !title) {
    return null;
  }

  const bodyMdx = normalizeString(getEntityField(entity, "bodyMdx"));
  const date =
    normalizeString(getEntityField(entity, "date")) ||
    normalizeString(getEntityField(entity, "publishedAt")) ||
    normalizeString(getEntityField(entity, "updatedAt"));

  return {
    id: String(getEntityField(entity, "documentId") ?? getEntityField(entity, "id") ?? slug),
    documentId: normalizeString(getEntityField(entity, "documentId")) || undefined,
    slug,
    title,
    date,
    summary: normalizeString(getEntityField(entity, "summary")),
    tags: normalizeTextList(getEntityField(entity, "tags")),
    coverImage: resolveMediaField(getEntityField(entity, "coverImage")) || null,
    bodyMdx,
    readingTime: normalizeReadingTime(readingTime(bodyMdx)),
    url: `/blog/${slug}`,
    publishedAt: normalizeString(getEntityField(entity, "publishedAt")) || null,
    updatedAt: normalizeString(getEntityField(entity, "updatedAt")) || null,
  };
}

function normalizeProject(entity: unknown): CmsProject | null {
  const slug = normalizeString(getEntityField(entity, "slug"));
  const title = normalizeString(getEntityField(entity, "title"));

  if (!slug || !title) {
    return null;
  }

  const mediaInitialDesigns = resolveMediaList(getEntityField(entity, "initialDesigns"));
  const initialDesigns =
    mediaInitialDesigns.length > 0
      ? mediaInitialDesigns
      : normalizeTextList(getEntityField(entity, "initialDesigns"));

  const screenshots = unwrapEntityArray(getEntityField(entity, "screenshots"))
    .map(normalizeScreenshot)
    .filter((item) => item.url || item.caption);

  const project: CmsProject = {
    id: String(getEntityField(entity, "documentId") ?? getEntityField(entity, "id") ?? slug),
    documentId: normalizeString(getEntityField(entity, "documentId")) || undefined,
    slug,
    title,
    isFeatured: Boolean(getEntityField(entity, "isFeatured")),
    summary: normalizeString(getEntityField(entity, "summary")),
    imageUrl:
      resolveMediaField(getEntityField(entity, "image")) ||
      resolveMediaUrl(normalizeString(getEntityField(entity, "imageUrl"))),
    coreFunctionalities: normalizeTextList(getEntityField(entity, "coreFunctionalities")),
    role: normalizeString(getEntityField(entity, "role")),
    technologies: normalizeTextList(getEntityField(entity, "technologies")),
    category: normalizeString(getEntityField(entity, "category")) === "mobile" ? "mobile" : "web",
    liveDemo: normalizeString(getEntityField(entity, "liveDemo")) || null,
    sourceCode: normalizeString(getEntityField(entity, "sourceCode")) || null,
    purpose: normalizeString(getEntityField(entity, "purpose")),
    expectedOutcome: normalizeString(getEntityField(entity, "expectedOutcome")),
    initialDesigns,
    spotlightFeature: normalizeSpotlightFeature(getEntityField(entity, "spotlightFeature")),
    technicalChallenges: normalizeTextList(getEntityField(entity, "technicalChallenges")),
    solutions: normalizeTextList(getEntityField(entity, "solutions")),
    currentStatus: normalizeCurrentStatus(getEntityField(entity, "currentStatus")),
    lessonsLearned: normalizeTextList(getEntityField(entity, "lessonsLearned")),
    frameworkExperience: normalizeString(getEntityField(entity, "frameworkExperience")) || null,
    accessibilityLearnings:
      normalizeString(getEntityField(entity, "accessibilityLearnings")) || null,
    impact: normalizeString(getEntityField(entity, "impact")),
    screenshots,
    publishedAt: normalizeString(getEntityField(entity, "publishedAt")) || null,
    updatedAt: normalizeString(getEntityField(entity, "updatedAt")) || null,
  };

  return project;
}

function normalizeCollection<T>(
  payload: unknown,
  mapper: (item: unknown) => T | null
): T[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const items = Array.isArray((payload as UnknownRecord).data)
    ? ((payload as UnknownRecord).data as unknown[])
    : [];

  return items.map(mapper).filter((item): item is T => Boolean(item));
}

function normalizeSingle<T>(
  payload: unknown,
  mapper: (item: unknown) => T | null
): T | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = (payload as UnknownRecord).data;
  if (Array.isArray(data)) {
    return mapper(data[0]);
  }

  return mapper(data);
}

export async function getPosts() {
  const payload = await fetchStrapi(
    "/api/posts",
    {
      "status": "published",
      "sort[0]": "date:desc",
      "populate": "*",
      "pagination[pageSize]": 100,
    },
    [CMS_TAGS.posts, CMS_TAGS.sitemap]
  );

  return normalizeCollection(payload, normalizePost);
}

export async function getLatestPosts(limit = 6) {
  const payload = await fetchStrapi(
    "/api/posts",
    {
      "status": "published",
      "sort[0]": "date:desc",
      "populate": "*",
      "pagination[pageSize]": limit,
    },
    [CMS_TAGS.posts, CMS_TAGS.home]
  );

  return normalizeCollection(payload, normalizePost);
}

export async function getPostBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const payload = await fetchStrapi(
    "/api/posts",
    {
      "status": "published",
      "filters[slug][$eq]": decodedSlug,
      "populate": "*",
      "pagination[pageSize]": 1,
    },
    [CMS_TAGS.posts, CMS_TAGS.post(decodedSlug), CMS_TAGS.sitemap]
  );

  return normalizeSingle(payload, normalizePost);
}

export async function getProjects() {
  const payload = await fetchStrapi(
    "/api/projects",
    {
      "status": "published",
      "sort[0]": "title:asc",
      "populate": "*",
      "pagination[pageSize]": 100,
    },
    [CMS_TAGS.projects, CMS_TAGS.sitemap]
  );

  return normalizeCollection(payload, normalizeProject);
}

export async function getFeaturedProjects(limit = 6) {
  const payload = await fetchStrapi(
    "/api/projects",
    {
      "status": "published",
      "filters[isFeatured][$eq]": "true",
      "sort[0]": "title:asc",
      "populate": "*",
      "pagination[pageSize]": limit,
    },
    [CMS_TAGS.projects, CMS_TAGS.home]
  );

  return normalizeCollection(payload, normalizeProject);
}

export async function getProjectBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const payload = await fetchStrapi(
    "/api/projects",
    {
      "status": "published",
      "filters[slug][$eq]": decodedSlug,
      "populate": "*",
      "pagination[pageSize]": 1,
    },
    [CMS_TAGS.projects, CMS_TAGS.project(decodedSlug), CMS_TAGS.sitemap]
  );

  return normalizeSingle(payload, normalizeProject);
}
