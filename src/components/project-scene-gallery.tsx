"use client"

import { Expand } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

export interface ProjectScene {
  description?: string
  label: string
  title: string
  url: string
}

export function ProjectSceneGallery({
  projectTitle,
  scenes,
}: {
  projectTitle: string
  scenes: ProjectScene[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (scenes.length === 0) {
    return null
  }

  const activeScene = scenes[activeIndex]

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="overflow-hidden rounded-[30px] border border-border/70 bg-background shadow-sm">
        <div className="relative aspect-[16/10] w-full bg-muted/30">
          <Image
            src={activeScene.url}
            alt={`${projectTitle} ${activeScene.title}`}
            fill
            priority={activeIndex === 0}
            sizes="(min-width: 1280px) 960px, 100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-border/70 px-5 py-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
            >
              {activeScene.label}
            </Badge>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">{activeScene.title}</h2>
              {activeScene.description && (
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                  {activeScene.description}
                </p>
              )}
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Expand className="h-4 w-4" />
                Expand
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl border-border/70 bg-background p-3 sm:p-4">
              <DialogHeader className="pr-10">
                <DialogTitle>{activeScene.title}</DialogTitle>
                {activeScene.description && (
                  <DialogDescription>{activeScene.description}</DialogDescription>
                )}
              </DialogHeader>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-border/70 bg-muted/30">
                <Image
                  src={activeScene.url}
                  alt={`${projectTitle} ${activeScene.title}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {scenes.length > 1 && (
        <div className="rounded-[30px] border border-border/70 bg-background p-3 shadow-sm">
          <div className="mb-3 px-2 pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Gallery
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {scenes.map((scene, index) => (
              <button
                key={`${scene.url}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex items-center gap-3 rounded-[22px] border border-transparent p-2 text-left transition-colors",
                  "hover:border-border/70 hover:bg-muted/30",
                  index === activeIndex && "border-border/70 bg-muted/40"
                )}
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
                  <Image
                    src={scene.url}
                    alt={`${projectTitle} ${scene.title}`}
                    fill
                    sizes="96px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {scene.label}
                  </p>
                  <p className="truncate text-sm font-medium text-foreground">{scene.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
