import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { CMS_TAGS } from "@/lib/cms/strapi";

interface StrapiWebhookPayload {
  model?: string;
  event?: string;
  entry?: {
    slug?: string;
  };
}

function getExpectedSecret() {
  return process.env.STRAPI_WEBHOOK_SECRET?.trim();
}

function normalizeModel(model?: string) {
  return model?.toLowerCase().replace(/^api::/, "").replace(/\..*$/, "");
}

function getProvidedSecret(request: Request) {
  const headerSecret =
    request.headers.get("x-revalidate-secret") ||
    request.headers.get("x-strapi-secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  return headerSecret?.trim() || "";
}

export async function POST(request: Request) {
  const expectedSecret = getExpectedSecret();
  if (!expectedSecret || getProvidedSecret(request) !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as StrapiWebhookPayload;
  const model = normalizeModel(payload.model);
  const slug = payload.entry?.slug;
  const revalidatedPaths = new Set<string>(["/", "/blog", "/work"]);
  const revalidatedTags = new Set<string>([
    CMS_TAGS.home,
    CMS_TAGS.posts,
    CMS_TAGS.projects,
    CMS_TAGS.sitemap,
  ]);

  if (model === "post" && slug) {
    revalidatedPaths.add(`/blog/${slug}`);
    revalidatedTags.add(CMS_TAGS.post(slug));
  }

  if (model === "project" && slug) {
    revalidatedPaths.add(`/work/${slug}`);
    revalidatedTags.add(CMS_TAGS.project(slug));
  }

  for (const path of revalidatedPaths) {
    revalidatePath(path);
  }

  for (const tag of revalidatedTags) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    ok: true,
    event: payload.event || null,
    model: model || null,
    paths: Array.from(revalidatedPaths),
    tags: Array.from(revalidatedTags),
  });
}
