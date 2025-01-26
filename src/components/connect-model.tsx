"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Github, Linkedin, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface CollaborationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CollaborationModal({ isOpen, onClose }: CollaborationModalProps) {
  const [activeTab, setActiveTab] = useState<"project" | "social">("project")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission, e.g., sending data to a server
    console.log("Form submitted")
    onClose()
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
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project" className="text-right">
                      Project Idea
                    </Label>
                    <Textarea id="project" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    Send Proposal <Send className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </form>
            )}
            {activeTab === "social" && (
              <div className="flex justify-center space-x-4 py-4">
                <Button variant="outline" size="lg" asChild>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </a>
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
