import type { Project } from '@/data'

const BASE_URL = 'https://marwanbaz.dev'

interface ProjectStructuredDataProps {
  project: Project
}

export function ProjectStructuredData({ project }: ProjectStructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork' as const,
    name: project.title,
    description: project.summary,
    image: `${BASE_URL}${project.imageUrl}`,
    url: `${BASE_URL}/work/${project.id}`,
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
