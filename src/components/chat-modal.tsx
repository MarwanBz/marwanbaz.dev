"use client"

import { Calendar, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Chat</DialogTitle>
          <DialogDescription>
            Choose a convenient time for us to have a virtual coffee and discuss technology!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button className="w-full" asChild>
            <a href="https://calendly.com/yourusername/virtual-coffee" target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" /> Schedule on Calendly
            </a>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Or send me an email to find a time that works for both of us.
          </p>
          <Button variant="outline" className="w-full" asChild>
            <a href="mailto:your.email@example.com?subject=Schedule%20a%20Virtual%20Coffee">
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
