"use client"

import { Download, Eye } from 'lucide-react'

import { CustomCard } from "./custom-card"
import Link from 'next/link'
import { motion } from "framer-motion"

interface CVCardProps {
  cvUrl: string
  cvLink: string
}

export function CVCard({ cvUrl,cvLink }: CVCardProps) {
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
        <div className="flex gap-4 items-center">
          <motion.div
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-transparent"
              aria-label="Download CV"
            >
                <Link href={cvUrl} download>
                <Download height={40} width={40}/>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className=" text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-transparent"
              aria-label="View CV"
            >
              <Link href={cvLink} target="_blank" rel="noopener noreferrer">
                <Eye height={40} width={40} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </CustomCard>
  )
}

