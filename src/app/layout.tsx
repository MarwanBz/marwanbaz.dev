import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
// import { PageTransition } from "@/components/page-transition";
import { ThemeProvider } from "@/components/components_theme-provider";

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
    default: "Marwan Baz | Frontend Developer",
    template: "%s | Marwan Baz"
  },
  description: "Frontend Developer specializing in React, Next.js, and modern web technologies. Check out my portfolio and projects.",
  keywords: ["Frontend Developer", "React", "Next.js", "Web Development", "Software Engineer"],
  authors: [{ name: "Marwan Baz" }],
  creator: "Marwan Baz",
  metadataBase: new URL("https://marwanbaz.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marwanbaz.dev",
    title: "Marwan Baz | Frontend Developer",
    description: "Frontend Developer specializing in React, Next.js, and modern web technologies. Check out my portfolio and projects.",
    siteName: "Marwan Baz Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Marwan Baz | Frontend Developer",
    description: "Frontend Developer specializing in React, Next.js, and modern web technologies",
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
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
