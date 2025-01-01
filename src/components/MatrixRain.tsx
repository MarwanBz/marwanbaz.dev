"use client"

import React, { useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface MatrixRainProps {
  width?: number
  height?: number
  fontSize?: number
  speed?: number
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  width = 800,
  height = 600,
  fontSize = 14,
  speed = 1.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    const columns = Math.floor(width / fontSize)
    const drops: number[] = new Array(columns).fill(1)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()ابتثجحخدذرزسشصضطظعغفقكلمنهوي'

    // Create gradient for fade effect
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, theme === 'dark' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 0, 139, 0.3)')
      gradient.addColorStop(0.2, theme === 'dark' ? 'rgba(0, 255, 0, 0.8)' : 'rgba(0, 0, 139, 0.8)')
      gradient.addColorStop(0.8, theme === 'dark' ? 'rgba(0, 255, 0, 0.8)' : 'rgba(0, 0, 139, 0.8)')
      gradient.addColorStop(1, theme === 'dark' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 0, 139, 0.3)')
      return gradient
    }

    const draw = () => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = createGradient()
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Add fade effect based on position
        const alpha = Math.min(1, Math.min(y / (height * 0.2), (height - y) / (height * 0.2)))
        ctx.globalAlpha = alpha

        ctx.fillText(text, x, y)
        ctx.globalAlpha = 1

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += speed
      }
    }

    let animationFrameId: number

    const animate = () => {
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [width, height, fontSize, speed, theme])

  return <canvas ref={canvasRef} className="matrix-rain" />
}

export default MatrixRain
