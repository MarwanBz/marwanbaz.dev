import Link from "next/link";
import type { Metadata } from "next";

import { CmsError } from "@/components/cms-error";
import { getPosts } from "@/lib/cms/payload";
import { formatDateLabel } from "@/lib/date";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on web development, React, Next.js, and building products.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  if (posts === null) {
    return <CmsError section="blog" />;
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        This is my space on the internet where I share my weird thoughts,
        opinions, principles, learnings, interests, and anything in between.
      </p>

      <ul className="mt-10">
        {posts.map((post) => (
          <li key={post.id} className="border-t border-border last:border-b">
            <Link
              href={post.url}
              className="group block py-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <time
                  dateTime={post.date}
                  className="shrink-0 text-sm text-muted-foreground"
                >
                  {formatDateLabel(post.date)}
                </time>
              </div>
              {post.summary && (
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No posts yet. Check back soon!
        </p>
      )}
    </main>
  );
}
