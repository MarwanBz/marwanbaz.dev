"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Home, MessageCircleWarning, RefreshCw } from "lucide-react";

import { AnimatedDotBackground } from "@/components/animated-dot-background";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "967770108459";

type CmsErrorSection = "work" | "blog";

const COPY: Record<
  CmsErrorSection,
  { title: string; description: string; reportAction: string; reportWhat: string }
> = {
  work: {
    title: "Jeez, couldn\u2019t pull my work \uD83D\uDE05\uD83D\uDE73",
    description:
      "The project list didn\u2019t load \u2014 probably a hiccup with the backend. Give it another try, or send a quick report and I will jump on it.",
    reportAction: "- View your projects",
    reportWhat: "- The project list didn't load",
  },
  blog: {
    title: "Jeez, couldn\u2019t load the blog \uD83D\uDE05\uD83D\uDE73",
    description:
      "The posts didn\u2019t come through \u2014 likely a backend hiccup. Try again in a sec, or ping me and I will jump on it.",
    reportAction: "- Read your blog posts",
    reportWhat: "- The blog post list didn't load",
  },
};

export function CmsError({ section }: { section: CmsErrorSection }) {
  const router = useRouter();
  const copy = COPY[section];

  const reportHref = useMemo(() => {
    const currentUrl =
      typeof window === "undefined" ? "unknown" : window.location.href;
    const browser =
      typeof navigator === "undefined" ? "unknown" : navigator.userAgent;
    const occurredAt = new Date().toISOString();
    const message = [
      "Hey Marwan \uD83D\uDC4B",
      "I ran into an issue while browsing your site and wanted to report it.",
      "",
      "What I was trying to do:",
      copy.reportAction,
      "",
      "What happened instead:",
      copy.reportWhat,
      "",
      `Page: ${currentUrl}`,
      `Time: ${occurredAt}`,
      `Browser: ${browser}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [copy.reportAction, copy.reportWhat]);

  return (
    <AnimatedDotBackground className="min-h-dvh">
      <main className="flex min-h-dvh items-center justify-center px-6 py-16 pt-44">
        <section className="w-full max-w-2xl rounded-3xl border border-border/80 bg-background/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {copy.title}
          </h1>

          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="h-10 rounded-full px-5"
              onClick={() => router.refresh()}
              type="button"
            >
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

            <Button
              asChild
              className="h-10 rounded-full px-5"
              variant="secondary"
            >
              <a
                href={reportHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircleWarning className="h-4 w-4" />
                Report issue on WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>
    </AnimatedDotBackground>
  );
}
