"use client"

import { Badge } from "@/components/ui/badge"
import { CustomCard } from "./custom-card"
import type { Experience } from "@/types"
import { motion } from "framer-motion"

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <CustomCard className="p-8" hover={false}>
      <motion.h2 
        className="text-2xl font-medium mb-6 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white">{exp.role}</h3>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{exp.period}</p>
              </div>
            </div>
            {exp.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.description}</p>
            )}
            {exp.technologies && (
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <Badge 
                    key={techIndex}
                    variant="outline" 
                    className="text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-700"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </CustomCard>
  )
}

