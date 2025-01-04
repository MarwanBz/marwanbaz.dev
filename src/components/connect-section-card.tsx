"use client"

import { Button } from "@/components/ui/button"
import type { ConnectOption } from "@/types"
import { CustomCard } from "./custom-card"
import { MessageCircle } from 'lucide-react'
import { motion } from "framer-motion"

interface ConnectSectionProps {
  options?: ConnectOption[]
}

const defaultOptions: ConnectOption[] = [
  {
    label: "Schedule A Chat",
    href: "#",
    variant: "outline"
  },
  {
    label: "Let's Collaborate",
    href: "#",
    variant: "secondary"
  }
]

export function ConnectSection({ options = defaultOptions }: ConnectSectionProps) {
  return (
    <CustomCard className="p-8 text-center">
      <motion.div 
        className="flex justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-[#0EA5E9]" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-medium mb-2 text-gray-900 dark:text-white">Let's Connect and Talk Tech!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Passionate about technology? or just want to talk?<br />
          Let's grab a virtual coffee!
        </p>
      </motion.div>
      <motion.div 
        className="flex gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {options.map((option, index) => (
          <Button
            key={index}
            variant={option.variant}
            className={
              option.variant === 'outline'
                ? "border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white dark:text-white dark:hover:bg-[#0EA5E9] dark:hover:text-black transition-colors"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            }
            asChild
          >
            <a href={option.href}>{option.label}</a>
          </Button>
        ))}
      </motion.div>
    </CustomCard>
  )
}

