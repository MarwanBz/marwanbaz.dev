import type { Metadata } from 'next'
import { SITE_URL } from './site'

export const baseMetadata = {
  title: {
    default: 'Marwan Baz | Frontend Developer & Product Engineer',
    template: '%s | Marwan Baz'
  },
  description: 'Marwan Baz (Marwan Bazghifan) - Frontend Developer and Product Engineer specializing in React, Next.js, and modern web technologies. Software builder passionate about creating beautiful, performant web interfaces.',
  keywords: ['Frontend Developer', 'Product Engineer', 'React', 'Next.js', 'TypeScript', 'Software Builder', 'Web Development', 'Linux', 'Techie'],
  authors: [{ name: 'Marwan Baz', url: SITE_URL }],
  creator: 'Marwan Baz',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
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
  const url = path ? `${SITE_URL}${path}` : SITE_URL

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
