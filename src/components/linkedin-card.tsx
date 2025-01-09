"use client"

import { CustomCard } from "./custom-card"
import { Linkedin } from 'lucide-react'
import { motion } from "framer-motion"

interface LinkedInLinkProps {
  url: string
}

export function LinkedInLink({ url }: LinkedInLinkProps) {
  return (
    <CustomCard
      className="py-7 flex items-center justify-center border-none"
      hover={true}
      onClick={() => window.open(url, '_blank')}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Linkedin className="w-20 h-20 text-black dark:text-white" />
      </motion.div>
    </CustomCard>
  )
}

