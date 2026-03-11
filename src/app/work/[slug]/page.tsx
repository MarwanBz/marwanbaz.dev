import { notFound } from 'next/navigation'
import { ProjectShowcase } from '@/components/project-showcase'
import { ProjectStructuredData } from '@/components/project-structured-data'
import { projects } from '@/data'
import type { Metadata } from 'next'

const siteUrl = 'https://marwanbaz.dev'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const project = projects.find(p => p.slug === decodedSlug)

  if (!project) return {}

  return {
    title: `${project.title} | Project Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Project Case Study`,
      description: project.summary,
      url: `${siteUrl}/work/${slug}`,
      siteName: 'Marwan Baz Portfolio',
      images: [
        {
          url: `${siteUrl}${project.imageUrl}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Project Case Study`,
      description: project.summary,
      images: [`${siteUrl}${project.imageUrl}`],
    },
    alternates: {
      canonical: `${siteUrl}/work/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const project = projects.find(p => p.slug === decodedSlug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <ProjectStructuredData project={project} />
      <ProjectShowcase {...project} />
    </>
  )
}
