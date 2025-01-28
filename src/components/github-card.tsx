"use client"

import { CustomCard } from "./custom-card"
import { Github } from 'lucide-react'
import { motion } from "framer-motion"

interface GitHubLinkProps {
  url: string
}

export function GitHubLink({ url }: GitHubLinkProps) {
  return (
    <CustomCard
      className="p-6 mb-1 flex items-center justify-center border-none"
      hover={true}
      // onClick={() => window.open(url, '_blank')}
       onClick={() => window.location.href = `${url}`}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        whileHover={{
          scale: 1.2,
          rotate: 360,
          transition: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        <Github className="w-20 h-20 text-black dark:text-white" />
      </motion.div>
    </CustomCard>
  )
}

