"use client"

import * as React from "react"

import { Moon, Sun } from 'lucide-react'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
]

export default function Navbar() {
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()
  const [active, setActive] = React.useState(() => {
    const path = pathname === "/" ? "Home" : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)
    return path
  })

  return (
    <header className="fixed top-0 z-50 w-full pt-12">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 ">
        <nav className="mx-auto">
          <ul className="flex items-center gap-1 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-gray-200/50 dark:bg-gray-600/50 p-1 backdrop-blur-md">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <motion.button
                    onClick={() => setActive(item.name)}
                    className={cn(
                      "relative rounded-full px-6 py-4 text-lg font-medium text-black/90 dark:text-white/90 transition-colors",
                      "hover:text-black dark:hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20",
                      active === item.name && "text-black dark:text-white"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {active === item.name && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        layoutId="active"
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
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full size-16  bg-black/[0.08] dark:bg-white/[0.08] text-black dark:text-white"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
