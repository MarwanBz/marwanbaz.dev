import { ExternalLink, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

function CompactList({
  items,
}: {
  items: string[]
}) {
  return (
    <ul className="grid gap-3">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground shadow-sm"
        >
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
  const topMeta = [
    { label: "Role", value: role },
    { label: "Platform", value: categoryLabels[category] },
    { label: "Status", value: currentStatus?.users || "" },
  ].filter((item) => item.value)

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-32 md:px-6 md:pt-40">
      <header className="space-y-6">
        <div className="space-y-4">
          <Badge
            variant="outline"
            className="w-fit rounded-full border-border/80 px-3 py-1 uppercase tracking-[0.18em] text-[10px] text-muted-foreground"
          >
            {categoryLabels[category]}
          </Badge>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
              {summary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge
              key={`${tech}-${index}`}
              variant="outline"
              className="rounded-full border-border/70 bg-background px-3 py-1"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {liveDemo && (
            <Button size="sm" asChild>
              <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            </Button>
          )}
          {sourceCode && (
            <Button size="sm" variant="outline" asChild>
              <a href={sourceCode} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {topMeta.map((item) => (
            <div
              key={item.label}
              className="rounded-[24px] border border-border/70 bg-background px-5 py-4 shadow-sm"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground md:text-base">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      {scenes.length > 0 && (
        <div className="mt-8">
          <ProjectSceneGallery projectTitle={title} scenes={scenes} />
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[28px] border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>{purpose}</p>
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Goal
              </p>
              <p className="mt-2 text-sm text-foreground">{expectedOutcome}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">What I Built</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(spotlightFeature.title || spotlightFeature.description) && (
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                {spotlightFeature.title && (
                  <p className="text-sm font-medium text-foreground">{spotlightFeature.title}</p>
                )}
                {spotlightFeature.description && (
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {spotlightFeature.description}
                  </p>
                )}
              </div>
            )}
            <CompactList items={coreFunctionalities} />
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <CompactList items={technicalChallenges} />
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <CompactList items={solutions} />
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>{impact}</p>
            {currentStatus?.feedback && (
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Feedback
                </p>
                <p className="mt-2 text-sm text-foreground">{currentStatus.feedback}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">What I Learned</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CompactList items={lessonsLearned} />

            {(frameworkExperience || accessibilityLearnings) && (
              <div className="grid gap-4">
                {frameworkExperience && (
                  <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Framework
                    </p>
                    <p className="mt-2 text-sm text-foreground">{frameworkExperience}</p>
                  </div>
                )}
                {accessibilityLearnings && (
                  <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Accessibility
                    </p>
                    <p className="mt-2 text-sm text-foreground">{accessibilityLearnings}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </article>
  )
}
