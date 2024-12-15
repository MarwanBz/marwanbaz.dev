"use client"

import { FaGithub, FaLinkedinIn, FaPhone, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { useEffect, useState } from "react"

import BlurryBlob from "./components_blurry-blob"
import { Button } from "@/components/ui/button"
import { DotPattern } from "../components/magicui/components_magicui_dot-pattern"
import { MdEmail } from 'react-icons/md';
import { ThemeToggle } from "./components_theme-toggle"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)
      const difference = target.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <BlurryBlob firstBlobColor="bg-yellow-400 transition-blobs fade-in" secondBlobColor="bg-pink-400 transition-blobs fade-in" className="dark:hidden" />
        <BlurryBlob firstBlobColor="bg-purple-700 transition-blobs fade-in" secondBlobColor="bg-blue-700 transition-blobs fade-in" className="hidden dark:block" />
      </div>

      <DotPattern
        className={cn(
          "absolute inset-0 z-10",
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-8 relative z-20"
      >
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-8 text-foreground"
        >
          Coming Soon
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center space-x-8 text-3xl font-bold mb-12 text-foreground"
        >
          <div>
            <div>{timeLeft.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div>
            <div>{timeLeft.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div>
            <div>{timeLeft.minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div>
            <div>{timeLeft.seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center justify-center space-x-12 mb-8">
            <div className="icon-float transition-all hover:scale-110">
              <SiNextdotjs className="text-7xl text-gray-800 dark:text-gray-200" />
            </div>
            <div className="icon-float transition-all hover:scale-110">
              <FaReact className="text-7xl text-blue-500 dark:text-blue-300 animate-spin-slow" />
            </div>
            <div className="icon-float transition-all hover:scale-110">
              <SiTailwindcss className="text-7xl text-teal-500 dark:text-teal-300" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center space-x-4"
          >
            <Button variant="outline" size="icon" asChild>
              <a href="https://www.linkedin.com/in/marwanbz/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://www.github.com/marwanbz" target="_blank" rel="noopener noreferrer">
                <FaGithub className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:marouane.bazghifan@gmail.com">
                <MdEmail className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="tel:+967770108459">
                <FaPhone className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            Something amazing is in the works. Stay tuned!
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Copyright {new Date().getFullYear()} All Rights Reserved
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
