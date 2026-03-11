"use client"

import { useEffect, useRef, useState } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Simple fixed size for the inline tag
    canvas.width = 70
    canvas.height = 20

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*".split("")
    const fontSize = 10
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    let animationFrameId: number

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0" // Matrix green
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0
        }
        drops[i]++
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <a
      href="https://en.wikipedia.org/wiki/The_Matrix"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-5 w-[70px] items-center justify-center overflow-hidden rounded bg-black mx-1 align-middle transition-transform hover:scale-105"
      title="The Matrix (Wikipedia)"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full opacity-60"
      />
      <span className="relative z-10 font-mono text-xs font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] group-hover:text-green-400">
        MATRIX
      </span>
    </a>
  )
}
