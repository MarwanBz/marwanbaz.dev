"use client"

import { CustomCard } from "./custom-card"
import { motion } from "framer-motion"

interface ProfileInfoProps {
  name: string
  description: string
  imageUrl: string
}

export function ProfileInfo({ name, description, imageUrl }: ProfileInfoProps) {
  return (
    <CustomCard
      className="p-8 overflow-hidden"
      hover={false}
      animation={{
        initial: true,
        hover: false,
        tap: false,
      }}
    >
      <div className="flex items-start gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img
            src={imageUrl}
            alt=""
            className="w-20 h-20 rounded-full"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
        <div className="space-y-3">
          <motion.h2 
            className="text-[28px] font-medium text-black dark:text-white leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {name}
          </motion.h2>
          <motion.p 
            className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </CustomCard>
  )
}

