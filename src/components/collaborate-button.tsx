"use client";

import { useState } from "react";

import { CollaborationModal } from "@/components/connect-model";

export function CollaborateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Let&apos;s collaborate
      </button>
      <CollaborationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
