import { notFound } from 'next/navigation'
import { ProjectShowcase } from '@/components/project-showcase'
import { ProjectStructuredData } from '@/components/project-structured-data'
import { getProjectBySlug } from '@/lib/cms/strapi'
import { absoluteUrl } from '@/lib/site'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) return {}

  return {
    title: `${project.title} | Project Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Project Case Study`,
      description: project.summary,
      url: absoluteUrl(`/work/${project.slug}`),
      siteName: 'Marwan Baz Portfolio',
      images: project.imageUrl
        ? [
            {
              url: absoluteUrl(project.imageUrl),
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Project Case Study`,
      description: project.summary,
      images: project.imageUrl ? [absoluteUrl(project.imageUrl)] : [],
    },
    alternates: {
      canonical: absoluteUrl(`/work/${project.slug}`),
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <ProjectStructuredData project={project} />
      <ProjectShowcase project={project} />
    </>
  )
}
