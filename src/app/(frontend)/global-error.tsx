"use client";

import "./globals.css";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Home, MessageCircleWarning, RefreshCw } from "lucide-react";

import { AnimatedDotBackground } from "@/components/animated-dot-background";
import { Button } from "@/components/ui/button";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const WHATSAPP_NUMBER = "967770108459";

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reportHref = useMemo(() => {
    const currentUrl = typeof window === "undefined" ? "unknown" : window.location.href;
    const browser = typeof navigator === "undefined" ? "unknown" : navigator.userAgent;
    const occurredAt = new Date().toISOString();
    const message = [
      "Hey Marwan 👋",
      "I ran into an issue while browsing your site and wanted to report it.",
      "",
      "What I was trying to do:",
      "- ...",
      "",
      "What happened instead:",
      "- ...",
      "",
      `Page: ${currentUrl}`,
      `Time: ${occurredAt}`,
      `Browser: ${browser}`,
      `Error reference: ${error.digest ?? "n/a"}`,
      `Technical message: ${error.message || "No message provided"}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [error.digest, error.message]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-dvh bg-background text-foreground">
        <AnimatedDotBackground className="min-h-dvh">
          <main className="flex min-h-dvh items-center justify-center px-6 py-16">
            <section className="w-full max-w-2xl rounded-3xl border border-border/80 bg-background/80 p-8 shadow-2xl backdrop-blur-xl">
              <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">Jeez sorry for that 😅🫣</h1>

              <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
                Plz report this bug to me directly. If this interrupted what you were doing, send a quick report and I will jump on it.
              </p>

              {error.digest ? (
                <p className="mt-4 rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground">
                  Error reference: {error.digest}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="h-10 rounded-full px-5" onClick={reset} type="button">
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </Button>

                <Button
                  asChild
                  className="h-10 rounded-full border-border bg-background px-5 text-foreground hover:bg-accent hover:text-accent-foreground"
                  variant="outline"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Back home
                  </Link>
                </Button>

                <Button asChild className="h-10 rounded-full px-5" variant="secondary">
                  <a href={reportHref} rel="noopener noreferrer" target="_blank">
                    <MessageCircleWarning className="h-4 w-4" />
                    Report issue on WhatsApp
                  </a>
                </Button>
              </div>
            </section>
          </main>
        </AnimatedDotBackground>
      </body>
    </html>
  );
}
