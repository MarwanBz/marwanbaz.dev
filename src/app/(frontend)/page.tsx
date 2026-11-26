import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { profileData } from "@/data";
import { formatDateLabel } from "@/lib/date";
import { getFeaturedProjects, getLatestPosts } from "@/lib/cms/payload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Marwan Baz — Techie Who Loves Software",
  description:
    "Techie who loves software systems. I build web apps with React and Next.js, try every OS I can find, and write about how things work.",
  keywords: [
    "Software Engineer",
    "Next.js",
    "React",
    "Portfolio",
    "Web Development",
    "JavaScript",
    "TypeScript",
  ],
  openGraph: {
    title: "Marwan Baz — Techie Who Loves Software",
    description:
      "Marwan Baz builds web apps with React and Next.js, and has been taking software apart since Windows 98.",
  },
};

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getFeaturedProjects(4),
    getLatestPosts(4),
  ]);

  const projects = featuredProjects ?? [];
  const posts = latestPosts ?? [];

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-24">
      {/* Intro */}
      <section>
        <div className="flex items-center gap-5">
          <Image
            src={profileData.imageUrl}
            alt="Portrait of Marwan Baz"
            width={72}
            height={72}
            priority
            className="size-[72px] rounded-full object-cover"
          />
          <h1 className="text-3xl font-semibold tracking-tight">Marwan Baz</h1>
        </div>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          I&apos;m a techie who loves software. By day I build web apps with
          React and Next.js — currently at Wahadat, previously Haraka. The rest
          of the time I&apos;m trying out every OS I can find.
        </p>
        <p className="mt-3 text-sm text-muted-foreground/70">
          {profileData.location} · {profileData.availability}
        </p>
      </section>

      {/* Featured work */}
      {projects.length > 0 && (
        <RevealOnScroll className="mt-16">
          <section>
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold tracking-wide">Work</h2>
              <Link
                href="/work"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                All projects
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="mt-3">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="border-t border-border last:border-b"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="group flex items-start gap-4 py-5"
                  >
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt=""
                        width={64}
                        height={64}
                        className="mt-0.5 size-16 shrink-0 rounded-lg border border-border object-cover"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>
                      {project.technologies.length > 0 && (
                        <p className="mt-2 text-xs text-muted-foreground/70">
                          {project.technologies.slice(0, 3).join(" · ")}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </RevealOnScroll>
      )}

      {/* Writing */}
      {posts.length > 0 && (
        <RevealOnScroll className="mt-16">
          <section>
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold tracking-wide">Writing</h2>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                All posts
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="mt-3">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="border-t border-border last:border-b"
                >
                  <Link
                    href={post.url}
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {post.title}
                    </span>
                    <time className="shrink-0 text-sm text-muted-foreground">
                      {formatDateLabel(post.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </RevealOnScroll>
      )}
    </main>
  );
}
