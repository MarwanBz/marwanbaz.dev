"use client"

import { cn } from "@/lib/utils"

export function DotPattern({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
    className={cn(
      "absolute inset-0 z-0 bg-transparent",
      "[background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
      className
    )}
    {...props}
  />
  )
}

