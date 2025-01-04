"use client"

import { CustomCard } from "./custom-card"
import { Mail } from 'lucide-react'
import { motion } from "framer-motion"

interface EmailCardProps {
  email: string
}

export function EmailCard({ email }: EmailCardProps) {
  return (
    <CustomCard
      className="p-8 aspect-square"
      hover={true}
      onClick={() => window.location.href = `mailto:${email}`}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Mail className="w-10 h-10 text-gray-600 dark:text-gray-400" />
      </motion.div>
    </CustomCard>
  )
}

