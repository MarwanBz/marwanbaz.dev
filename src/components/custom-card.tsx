"use client"

import { Card } from "@/components/ui/card"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CustomCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  showing?: boolean
}

export function CustomCard({
  children,
  className,
  // hover = true,
  onClick,
  showing = true,
}: CustomCardProps) {
  return (
    <div className="relative ">
      {showing && (
        <>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-500" />
          <div className="absolute inset-[3px] rounded-2xl bg-white dark:bg-black" />
        </>
      )}
      <Card className={cn(
        "relative rounded-2xl bg-transparent border-none shadow-none",
        {
          "cursor-pointer": onClick,
        },
        className
      )}>
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </div>
  )
}

