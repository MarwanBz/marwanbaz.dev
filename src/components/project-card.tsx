"use client"

import { ExternalLink, Github } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { CustomCard } from "./custom-card"
import Image from 'next/image'
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export function ProjectCard({ title, description, imageUrl, technologies, githubUrl, liveUrl }: ProjectCardProps) {
  return (
    <CustomCard className="flex flex-col overflow-hidden group">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[3s] ease-in-out group-hover:-translate-y-[calc(100%-192px)]">
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={1200}
            className="w-full object-cover object-top"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4">
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Github size={18} />
              <span>Source</span>
            </motion.a>
          )}
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </CustomCard>
  )
}
