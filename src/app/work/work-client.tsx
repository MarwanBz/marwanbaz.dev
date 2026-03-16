"use client";

import { FilterBar } from "@/components/filter-bar";
import { ProjectCard } from "@/components/project-card";
import type { CmsProject } from "@/lib/cms/types";
import { useState } from "react";

export function WorkClient({ projects }: { projects: CmsProject[] }) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <main className="min-h-screen p-4 pt-44 flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl">
        <div className="p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Work</h1>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
          <div className="grid gap-8 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.summary}
                imageUrl={project.imageUrl}
                technologies={project.technologies}
                githubUrl={project.sourceCode || undefined}
                liveUrl={project.liveDemo || undefined}
                isFeatured={project.isFeatured}
                projectUrl={`/work/${project.slug}`}
              />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <p className="mt-8 text-sm text-muted-foreground">
              No projects are published for this filter yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
