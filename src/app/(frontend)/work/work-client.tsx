"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { CmsProject } from "@/lib/cms/types";

const filters = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
] as const;

export function WorkClient({ projects }: { projects: CmsProject[] }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight">Work</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        A selection of products I&apos;ve helped build — web platforms, a mobile
        app, and everything in between.
      </p>

      <div className="mt-8 flex gap-2" role="group" aria-label="Filter projects">
        {filters.map((item) => {
          const active = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                active
                  ? "border-border bg-accent text-accent-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-6">
        {filtered.map((project) => (
          <li key={project.id} className="border-t border-border last:border-b">
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
                  <h2 className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {project.title}
                  </h2>
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

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No projects are published for this filter yet.
        </p>
      )}
    </main>
  );
}
