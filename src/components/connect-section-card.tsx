"use client"

import { Calendar1Icon, MessageCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { ChatModal } from './chat-modal'
import { CollaborationModal } from './connect-model'
import type { ConnectOption } from "@/types"
import { CustomCard } from "./custom-card"
import { motion } from "framer-motion"
import { useState } from 'react'

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
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)

  return (
    <CustomCard className="p-8 text-center h-full flex flex-col items-center justify-center">
      <CollaborationModal isOpen={isCollabModalOpen} onClose={() => setIsCollabModalOpen(false)} />
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
      
      <motion.div 
        className="flex justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
          <MessageCircle className="w-8 h-8" />
        </div>
      </motion.div>
      
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">Let&apos;s Connect</h2>
        <p className="text-muted-foreground">
          Passionate about technology? or just want to chat?
Let&apos;s grab a virtual coffee!
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
          <Button
            variant="outline"
            onClick={() => setIsChatModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Calendar1Icon className="w-4 h-4" />
            Schedule A Chat
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsCollabModalOpen(true)}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Let&apos;s Collaborate
          </Button>
        </div>
      </motion.div>
    </CustomCard>
  )
}
