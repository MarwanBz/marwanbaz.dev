import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site";

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
  description: "Marwan Baz (Marwan Bazghifan) - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies.",
  keywords: ["Frontend Developer", "Product Engineer", "React", "Next.js", "TypeScript", "Web Development"],
  authors: [{ name: "Marwan Baz", url: SITE_URL }],
  creator: "Marwan Baz",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Marwan Baz | Frontend Developer & Product Engineer",
    description: "Marwan Baz - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies.",
    siteName: "Marwan Baz Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Marwan Baz | Frontend Developer & Product Engineer",
    description: "Marwan Baz - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies.",
    creator: "@marwanbaz"
  },
  robots: {
    index: true,
    follow: true,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
