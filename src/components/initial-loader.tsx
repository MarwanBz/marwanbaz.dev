"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

import { DottedProgressLoader } from "@/components/ui/dotted-progress-loader"

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start loading sequence when component mounts
    const loadSequence = async () => {
      // Wait for initial content to load
      await document.fonts.ready
      
      // Ensure minimum loading time for visual effect
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Complete the loading
      setIsLoading(false)
    }

    loadSequence()
  }, [])

  const handleComplete = () => {
    // This will be called when the loader reaches 100%
    setProgress(100)
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
        >
          <DottedProgressLoader
            size={250}
            interactive={false}
            duration={8}
            onComplete={handleComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
