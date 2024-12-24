'use client'

import { ArrowBigRight, ExternalLink, Sparkles } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface V1ButtonProps {
  href?: string
}

export default function V1Button({ href = "https://marwanbaz.netlify.app/" }: V1ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div className="absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2 z-50 group">
      {/* Magical glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
      
      <Button
        variant="outline"
        size="lg"
        className="relative flex items-center gap-3 px-8 py-6 bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-purple-900 border-2 border-blue-200/50 dark:border-blue-400/20 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-500 transform hover:scale-105 hover:border-blue-300/75 dark:hover:border-blue-400/50 hover:shadow-xl dark:hover:shadow-purple-500/20 backdrop-blur-sm text-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(href, '_blank')}
      >
        <span className="relative flex items-center gap-2 group">
          <Sparkles 
            className={`w-4 h-4 transition-all duration-500 ${
              isHovered ? 'rotate-12 scale-110 text-purple-500 dark:text-purple-400 animate-pulse' : 'text-blue-400 dark:text-blue-300'
            }`}
          />
          <span className="relative">
            <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
              Visit v1 Website
            </span>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
          </span>
          <ExternalLink 
            className={`w-4 h-4 transition-all duration-500 ${
              isHovered 
                ? 'translate-x-1 translate-y-[-2px] rotate-45 text-blue-500 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          />
        </span>

        {/* Animated particles */}
        <div className="absolute -z-10 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className={`w-1 h-1 rounded-full bg-blue-400/50 dark:bg-blue-300/50 transition-all duration-500 ${
                isHovered 
                  ? `opacity-100 translate-y-[-8px] delay-[${i * 100}ms]` 
                  : 'opacity-0 translate-y-0'
              }`}
            />
          ))}
        </div>
      </Button>

      {/* Particle effects on hover */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${20 + i * 12}%`,
              top: isHovered ? '0%' : '50%',
              transform: isHovered ? 'scale(1)' : 'scale(0)',
              transitionDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>
    </div>
  )
}
