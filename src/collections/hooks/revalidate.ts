import { createRequire } from "node:module";

import { CMS_TAGS } from "../../lib/cms/tags.ts";

type RevalidateDoc = {
  slug?: string;
};

type NextCache = {
  revalidatePath: (path: string) => void;
  revalidateTag: (tag: string) => void;
};

/**
 * Payload collection hooks run inside the Next.js server process when content
 * changes via the admin panel or REST API — but they also run from standalone
 * scripts (seeding) where the Next.js runtime and its cache APIs are absent.
 * The lazy require + try/catch keeps standalone scripts safe; cache purging
 * only matters for request-driven changes.
 */
function getNextCache(): NextCache | null {
  try {
    return createRequire(import.meta.url)("next/cache") as NextCache;
  } catch {
    return null;
  }
}

export function revalidateCms(doc: RevalidateDoc, paths: string[], tags: string[]) {
  const cache = getNextCache();
  if (!cache) {
    return;
  }

  const revalidatedPaths = new Set<string>(["/", ...paths]);
  const revalidatedTags = new Set<string>([CMS_TAGS.home, CMS_TAGS.sitemap, ...tags]);

  if (doc.slug) {
    for (const path of paths) {
      revalidatedPaths.add(`${path}/${doc.slug}`);
    }
  }

  try {
    for (const path of revalidatedPaths) {
      cache.revalidatePath(path);
    }

    for (const tag of revalidatedTags) {
      cache.revalidateTag(tag);
    }
  } catch {
    // Not running inside a Next.js request context.
  }
}
