"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Github, Linkedin, Send } from "lucide-react"
import { ValidationError, useForm } from '@formspree/react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface CollaborationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CollaborationModal({ isOpen, onClose }: CollaborationModalProps) {
  const [activeTab, setActiveTab] = useState<"project" | "social">("project")
  const [state, handleSubmit] = useForm("xjkggeea") // Replace with your Formspree form ID

  if (state.succeeded) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thank you for reaching out!</DialogTitle>
            <DialogDescription>
              I'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Let&apos;s Collaborate!</DialogTitle>
          <DialogDescription>Choose how you&apos;d like to collaborate with me.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button variant={activeTab === "project" ? "default" : "outline"} onClick={() => setActiveTab("project")}>
            Project Idea
          </Button>
          <Button variant={activeTab === "social" ? "default" : "outline"} onClick={() => setActiveTab("social")}>
            Connect
          </Button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "project" && (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" name="name" className="col-span-3" required />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" name="email" className="col-span-3" required />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project" className="text-right">
                      Project Idea
                    </Label>
                    <Textarea id="project" name="project" className="col-span-3" required />
                    <ValidationError prefix="Message" field="project" errors={state.errors} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={state.submitting}>
                    Send Proposal <Send className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </form>
            )}
            {activeTab === "social" && (
              <div className="flex justify-center space-x-4 py-4">
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://github.com/marwanbz" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://linkedin.com/in/marwanbz" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
