"use client";

import "./globals.css";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { AlertTriangle, Home, MessageCircleWarning, RefreshCw } from "lucide-react";

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
    const message = [
      "Jeez sorry for that 😅🫣",
      "Plz report this bug to me directly.",
      "",
      `Page: ${currentUrl}`,
      `Digest: ${error.digest ?? "n/a"}`,
      `Message: ${error.message || "No message provided"}`,
      "",
      "What I was doing:",
      "1) ...",
      "2) ...",
      "3) ...",
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [error.digest, error.message]);

  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-950 text-slate-100 antialiased">
        <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 right-8 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
          />

          <section className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
              <AlertTriangle className="h-3.5 w-3.5" />
              Global fallback active
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">Jeez sorry for that 😅🫣</h1>

            <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
              Plz report this bug to me directly. You can retry now, go back home, or send the report button below.
            </p>

            {error.digest ? (
              <p className="mt-4 rounded-lg border border-white/20 bg-black/20 px-3 py-2 font-mono text-xs text-slate-300">
                Error digest: {error.digest}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="h-10 rounded-full bg-cyan-500 px-5 text-cyan-950 hover:bg-cyan-400"
                onClick={reset}
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>

              <Button asChild className="h-10 rounded-full px-5" variant="outline">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back home
                </Link>
              </Button>

              <Button
                asChild
                className="h-10 rounded-full border-emerald-300/40 bg-emerald-500/20 px-5 text-emerald-100 hover:bg-emerald-500/30"
                variant="outline"
              >
                <a href={reportHref} rel="noopener noreferrer" target="_blank">
                  <MessageCircleWarning className="h-4 w-4" />
                  Report this bug directly
                </a>
              </Button>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
