"use client"

import { Download, Eye } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { CustomCard } from "./custom-card"
import { motion } from "framer-motion"

interface CVCardProps {
  cvUrl: string
}

export function CVCard({ cvUrl }: CVCardProps) {
  return (
    <CustomCard
      className="p-6"
      hover={true}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <motion.h3 
            className="text-[32px] font-medium text-gray-900 dark:text-white leading-none"
            animate={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            2025 CV
          </motion.h3>
          <p className="text-[15px] text-gray-600 dark:text-gray-400">Download or View</p>
        </div>
        <div className="flex gap-4">
          <motion.div
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-transparent"
              asChild
              aria-label="Download CV"
            >
              <a href={cvUrl} download>
                <Download className="w-6 h-6" />
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-transparent"
              asChild
              aria-label="View CV"
            >
              <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="w-6 h-6" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </CustomCard>
  )
}

