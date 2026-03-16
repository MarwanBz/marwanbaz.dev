import { WorkClient } from './work-client'
import { getProjects } from '@/lib/cms/strapi'
import { createPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = createPageMetadata({
  title: 'Work | Projects Portfolio',
  description: "Explore Marwan Baz's portfolio of web and mobile applications. Featuring projects built with React, Next.js, TypeScript, and modern technologies.",
  path: '/work',
})

export default async function WorkPage() {
  const projects = await getProjects()

  return <WorkClient projects={projects} />
}
