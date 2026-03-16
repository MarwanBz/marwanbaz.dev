import type { CmsProject } from '@/lib/cms/types'
import { absoluteUrl } from '@/lib/site'

interface ProjectStructuredDataProps {
  project: CmsProject
}

export function ProjectStructuredData({ project }: ProjectStructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork' as const,
    name: project.title,
    description: project.summary,
    image: project.imageUrl ? absoluteUrl(project.imageUrl) : undefined,
    url: absoluteUrl(`/work/${project.slug}`),
    author: {
      '@type': 'Person' as const,
      name: 'Marwan Baz',
    },
    keywords: project.technologies.join(', '),
    applicationCategory: project.category === 'mobile' ? 'Mobile Application' : 'Web Application',
    genre: project.category,
    about: {
      '@type': 'Thing',
      description: project.purpose,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
