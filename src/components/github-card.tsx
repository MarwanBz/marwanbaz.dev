"use client"

import { Github } from 'lucide-react'
import Link from 'next/link'
import { motion } from "framer-motion"

interface GitHubLinkProps {
  url: string
}

export function GitHubLink({ url }: GitHubLinkProps) {
  return (
    <Link href={""} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="relative p-6 mb-1 rounded-2xl transition-shadow duration-300 ease-in-out"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-500 to-black dark:from-white dark:to-gray-500" />
        <div className="absolute inset-[3px] rounded-2xl bg-white dark:bg-black" />
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          whileHover={{
            y: -5,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 10
            }
          }}
          animate={{
            scale: [1, 1.05, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Github className="w-20 h-20 text-black dark:text-white" />
        </motion.div>
      </motion.div>
    </Link>
  )
}

