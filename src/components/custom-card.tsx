"use client"

import { Card } from "@/components/ui/card"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CustomCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  animation?: {
    initial?: boolean
    hover?: boolean
    tap?: boolean
  }
  onClick?: () => void
}

export function CustomCard({
  children,
  className,
  hover = true,
  animation = {
    initial: true,
    hover: true,
    tap: true,
  },
  onClick,
}: CustomCardProps) {
  return (
    <motion.div
      className="relative"
      initial={animation.initial ? { opacity: 0, y: 20 } : undefined}
      animate={animation.initial ? { opacity: 1, y: 0 } : undefined}
      whileHover={animation.hover ? { scale: hover ? 1.02 : 1 } : undefined}
      whileTap={animation.tap ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      <motion.div 
        className="absolute -inset-[2px] rounded-2xl overflow-hidden"
      >
        <motion.div
          className="w-[200%] h-full bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "linear",
          }}
          style={{
            maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          }}
        />
      </motion.div>
      <motion.div 
        className="absolute -inset-[2px] rounded-2xl bg-[#0EA5E9]"
        style={{
          boxShadow: '0 0 10px rgba(14, 165, 233, 0.5), inset 0 0 10px rgba(14, 165, 233, 0.5)'
        }}
      />
      <Card className={cn(
        "relative p-6 rounded-2xl border-0",
        "before:absolute before:inset-[2px] before:rounded-xl before:bg-black",
        "hover:shadow-lg transition-shadow duration-200",
        {
          "cursor-pointer": onClick,
        },
        className
      )}>
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </motion.div>
  )
}

