import  BlurryBlob  from "./components_blurry-blob"
import { DotPattern } from "../components/magicui/components_magicui_dot-pattern"
import { ThemeToggle } from "./components_theme-toggle"
import { cn } from "@/lib/utils"

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen  overflow-hidden bg-background dark:bg-dark-background">
      
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <BlurryBlob className="left-0 top-0 absolute inset-0 dark:bg-dark-blob" />
          <BlurryBlob className="bottom-0 right-0 absolute inset-0 dark:bg-dark-blob" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl dark:text-dark-heading">
            Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl dark:text-dark-muted">
            Something amazing is in the works. Stay tuned!
          </p>
        </div>
      </div>

      <DotPattern className={cn(
          "absolute inset-0 z-10",
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )} />
    </div>
  )
}
