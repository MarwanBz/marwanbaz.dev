import type { Metadata } from 'next'

const siteUrl = 'https://marwanbaz.dev'

export const baseMetadata = {
  title: {
    default: 'Marwan Baz | Frontend Developer & Product Engineer',
    template: '%s | Marwan Baz'
  },
  description: 'Marwan Baz (Marwan Bazghifan) - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies. Software builder passionate about creating beautiful, performant web interfaces.',
  keywords: ['Frontend Developer', 'Product Engineer', 'React', 'Next.js', 'TypeScript', 'Software Builder', 'Web Development', 'Linux', 'Techie'],
  authors: [{ name: 'Marwan Baz', url: siteUrl }],
  creator: 'Marwan Baz',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Marwan Baz Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@marwanbaz',
  },
}

export function createPageMetadata(config: {
  title: string
  description: string
  path?: string
  ogImage?: string
}): Metadata {
  const { title, description, path, ogImage } = config
  const url = path ? `${siteUrl}${path}` : siteUrl

  return {
    ...baseMetadata,
    title,
    description,
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
      url,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: url,
    },
  }
}
