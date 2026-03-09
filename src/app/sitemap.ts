import type { MetadataRoute } from 'next'
import { projects } from '@/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://marwanbaz.dev'

  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Dynamic project pages
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
