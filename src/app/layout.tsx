import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/react"
import { AnimatedDotBackground } from "@/components/animated-dot-background";
import { StructuredData } from "@/components/structured-data";
import Loading from "./loading";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Marwan Baz | Frontend Developer & Product Engineer",
    template: "%s | Marwan Baz"
  },
  description: "Marwan Baz (Marwan Bazghifan) - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies. Software builder passionate about creating beautiful, performant web interfaces.",
  keywords: ["Frontend Developer", "Product Engineer", "React", "Next.js", "TypeScript", "Software Builder", "Web Development", "Linux", "Techie", "Software Wizard"],
  authors: [{ name: "Marwan Baz", url: "https://marwanbaz.dev" }],
  creator: "Marwan Baz",
  metadataBase: new URL("https://marwanbaz.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marwanbaz.dev",
    title: "Marwan Baz | Frontend Developer & Product Engineer",
    description: "Marwan Baz (Marwan Bazghifan) - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies. Software builder passionate about creating beautiful, performant web interfaces.",
    siteName: "Marwan Baz Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Marwan Baz | Frontend Developer & Product Engineer",
    description: "Marwan Baz (Marwan Bazghifan) - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies.",
    creator: "@marwanbaz"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'alternate-name': 'Marwan Bazghifan',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Marwan Baz" />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased relative min-h-screen`}
      >
        <AnimatedDotBackground className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ThemeProvider>
          </AnimatedDotBackground>
      </body>
      <Analytics />
    </html>
  );
}
