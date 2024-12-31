"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sun } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [active, setActive] = React.useState(() => {
    const path = pathname === "/" ? "Home" : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)
    return path
  })

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <nav className="mx-auto">
          <ul className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/50 p-1 backdrop-blur-md">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <motion.button
                    onClick={() => setActive(item.name)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors",
                      "hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                      active === item.name && "text-white"
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
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-gray-500" />
                        <div className="absolute inset-[1px] rounded-full bg-black" />
                      </motion.div>
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <motion.button
          className="rounded-full bg-white/[0.08] p-2 text-white transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5" />
        </motion.button>
      </div>
    </header>
  )
}
