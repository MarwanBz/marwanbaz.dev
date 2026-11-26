"use client";

import { useState } from "react";

import { ChatModal } from "@/components/chat-modal";
import { profileData } from "@/data";

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function SiteFooter() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marwan Baz
        </p>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <a
            href={profileData.githubUrl}
            {...externalLinkProps}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profileData.linkedinUrl}
            {...externalLinkProps}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profileData.email}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </a>
          <a
            href={profileData.cvLink}
            {...externalLinkProps}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            CV
          </a>
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Book a call
          </button>
        </nav>
      </div>
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </footer>
  );
}
