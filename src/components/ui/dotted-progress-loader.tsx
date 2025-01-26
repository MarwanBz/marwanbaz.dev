"use client"

import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

import type React from "react"
import { useTheme } from "next-themes"

interface DottedProgressLoaderProps {
  size?: number
  dotCount?: number
  duration?: number
  interactive?: boolean
  onComplete?: () => void
}

export const DottedProgressLoader: React.FC<DottedProgressLoaderProps> = ({
  size = 300,
  dotCount = 60,
  duration = 3,
  interactive = true,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const { theme } = useTheme()
  const controls = useAnimation()

  useEffect(() => {
    setMounted(true)
    startAnimation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startAnimation = () => {
    setProgress(0)
    setIsComplete(false)
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          setIsComplete(true)
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onComplete && onComplete()
          return 100
        }
        return prevProgress + 1
      })
    }, duration * 10)

    return () => clearInterval(timer)
  }

  useEffect(() => {
    controls.start({ rotate: progress * 3.6 })
  }, [progress, controls])

  if (!mounted) return null

  const center = size / 2
  const radius = size * 0.4
  const strokeWidth = 2

  const dots = Array.from({ length: dotCount }).map((_, index) => {
    const angle = (index / dotCount) * Math.PI * 2 - Math.PI / 2
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    const isActive = (index / dotCount) * 100 <= progress

    return { x, y, isActive }
  })

  const getColor = (opacity: number) => {
    return theme === "dark" ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`
  }

  const handleDotHover = (index: number) => {
    if (interactive) {
      setHoveredDot(index)
    }
  }

  const handleDotLeave = () => {
    setHoveredDot(null)
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="relative"
          style={{ width: size, height: size }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <svg width={size} height={size}>
            <motion.g animate={controls}>
              {dots.map((dot, index) => (
                <motion.circle
                  key={index}
                  cx={dot.x}
                  cy={dot.y}
                  r={strokeWidth}
                  initial={{ opacity: 0.1, scale: 1 }}
                  animate={{
                    opacity: dot.isActive ? 0.8 : 0.2,
                    scale: dot.isActive ? 1.5 : 1,
                    fill: hoveredDot === index ? getColor(1) : getColor(dot.isActive ? 0.8 : 0.2),
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  onMouseEnter={() => handleDotHover(index)}
                  onMouseLeave={handleDotLeave}
                  style={{ cursor: interactive ? "pointer" : "default" }}
                />
              ))}
            </motion.g>
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center font-bold"
            style={{
              fontSize: `${size / 6}px`,
              color: getColor(0.9),
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            {`${Math.round(progress)}%`}
          </motion.div>
          {interactive && (
            <button
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm transition-all hover:bg-primary/90"
              onClick={startAnimation}
            >
              Restart
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
