"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FilterBarProps {
  currentFilter: string
  onFilterChange: (filter: string) => void
}

const filterItems = [
  { name: "all", label: "ALL" },
  { name: "web", label: "WEB APPS" },
  { name: "mobile", label: "MOBILE APPS" },
]

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="relative w-fit max-w-full flex rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-gray-200/50 dark:bg-gray-600/50 p-1 backdrop-blur-md">
      {filterItems.map((item) => (
        <motion.button
          key={item.name}
          onClick={() => onFilterChange(item.name)}
          className={cn(
            "relative rounded-full px-6 py-4 text-sm font-medium text-black/90 dark:text-white/90 transition-colors",
            "hover:text-black dark:hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20",
            currentFilter === item.name && "text-black dark:text-white"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentFilter === item.name && (
            <motion.div
              className="absolute inset-0 rounded-full"
              layoutId="active-filter"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-500" />
              <div className="absolute inset-[3px] rounded-full bg-white dark:bg-black" />
            </motion.div>
          )}
          <span className="relative z-10">{item.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
