import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"
import Link from "next/link"

import { ProjectSceneGallery, type ProjectScene } from "@/components/project-scene-gallery"
import type { CmsProject } from "@/lib/cms/types"

const categoryLabels: Record<CmsProject["category"], string> = {
  web: "Web app",
  mobile: "Mobile app",
}

function normalizeAssetKey(url: string) {
  return url.trim().replace(/\/+$/, "")
}

function buildScenes(project: CmsProject): ProjectScene[] {
  const seenKeys = new Set<string>()
  const scenes: ProjectScene[] = []

  const pushScene = (scene: ProjectScene | null) => {
    if (!scene) {
      return
    }

    const assetKey = normalizeAssetKey(scene.url)
    if (!assetKey || seenKeys.has(assetKey)) {
      return
    }

    seenKeys.add(assetKey)
    scenes.push(scene)
  }

  pushScene(
    project.imageUrl
      ? {
          description: "",
          label: "01",
          title: "Overview",
          url: project.imageUrl,
        }
      : null
  )

  project.screenshots.forEach((screenshot, index) => {
    pushScene(
      screenshot.url
        ? {
            description: screenshot.caption || "",
            label: String(index + 2).padStart(2, "0"),
            title: screenshot.caption || `Screen ${index + 1}`,
            url: screenshot.url,
          }
        : null
    )
  })

  return scenes
}

function MetaRow({ items }: { items: { label: string; value: string }[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            {item.label}
          </dt>
          <dd className="mt-0.5 text-sm font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Section({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-16">
      <h2 className="text-sm font-semibold tracking-wide">{heading}</h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex gap-3 text-base leading-relaxed text-muted-foreground"
        >
          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProjectShowcase({ project }: { project: CmsProject }) {
  const {
    title,
    summary,
    coreFunctionalities,
    role,
    technologies,
    category,
    liveDemo,
    sourceCode,
    purpose,
    expectedOutcome,
    spotlightFeature,
    currentStatus,
    technicalChallenges,
    solutions,
    impact,
    lessonsLearned,
    frameworkExperience,
    accessibilityLearnings,
  } = project

  const scenes = buildScenes(project)

  return (
    <article className="mx-auto w-full max-w-2xl px-6 pb-24">
      <Link
        href="/work"
        className="group mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Work
      </Link>

      <header className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {summary}
        </p>

        <div className="mt-6">
          <MetaRow
            items={[
              { label: "Role", value: role },
              { label: "Platform", value: categoryLabels[category] },
              { label: "Stack", value: technologies.join(", ") },
              currentStatus?.users
                ? { label: "Status", value: currentStatus.users }
                : { label: "", value: "" },
            ].filter((item) => item.value)}
          />
        </div>

        {(liveDemo || sourceCode) && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400"
              >
                Live
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
            {sourceCode && (
              <a
                href={sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400"
              >
                <Github className="size-3.5" />
                Code
              </a>
            )}
          </div>
        )}
      </header>

      {scenes.length > 0 && (
        <div className="mt-10">
          <ProjectSceneGallery projectTitle={title} scenes={scenes} />
        </div>
      )}

      {purpose && (
        <Section heading="Overview">
          <p>{purpose}</p>
          {expectedOutcome && <p>{expectedOutcome}</p>}
        </Section>
      )}

      {(spotlightFeature.title || spotlightFeature.description) && (
        <Section heading="Spotlight">
          {spotlightFeature.title && (
            <p className="font-medium text-foreground">
              {spotlightFeature.title}
            </p>
          )}
          {spotlightFeature.description && <p>{spotlightFeature.description}</p>}
        </Section>
      )}

      {coreFunctionalities.length > 0 && (
        <Section heading="What I built">
          <BulletList items={coreFunctionalities} />
        </Section>
      )}

      {technicalChallenges.length > 0 && (
        <Section heading="Challenges">
          <BulletList items={technicalChallenges} />
        </Section>
      )}

      {solutions.length > 0 && (
        <Section heading="Solutions">
          <BulletList items={solutions} />
        </Section>
      )}

      {impact && (
        <Section heading="Impact">
          <p>{impact}</p>
          {currentStatus?.feedback && (
            <p className="text-sm text-muted-foreground/80">
              {currentStatus.feedback}
            </p>
          )}
        </Section>
      )}

      {lessonsLearned.length > 0 && (
        <Section heading="What I learned">
          <BulletList items={lessonsLearned} />
          {(frameworkExperience || accessibilityLearnings) && (
            <div className="mt-2 space-y-3 border-t border-border pt-4 text-sm leading-relaxed">
              {frameworkExperience && (
                <p>
                  <span className="font-medium text-foreground">
                    Framework:
                  </span>{" "}
                  {frameworkExperience}
                </p>
              )}
              {accessibilityLearnings && (
                <p>
                  <span className="font-medium text-foreground">
                    Accessibility:
                  </span>{" "}
                  {accessibilityLearnings}
                </p>
              )}
            </div>
          )}
        </Section>
      )}
    </article>
  )
}
