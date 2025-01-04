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
    <CustomCard className="flex flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
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
        <div className="flex justify-between">
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              <Github size={20} />
            </motion.a>
          )}
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>
    </CustomCard>
  )
}

