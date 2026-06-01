import "./globals.css";

import { Analytics } from "@vercel/analytics/react"
import { SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

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
      <body className="font-sans antialiased min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
