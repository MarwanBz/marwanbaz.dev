import { WorkClient } from './work-client'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Work | Projects Portfolio',
  description: "Explore Marwan Baz's portfolio of web and mobile applications. Featuring projects built with React, Next.js, TypeScript, and modern technologies.",
  path: '/work',
})

export default function WorkPage() {
  return <WorkClient />
}
