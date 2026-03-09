import { notFound } from 'next/navigation'
import { ProjectShowcase } from '@/components/project-showcase'
import { ProjectStructuredData } from '@/components/project-structured-data'
import { projects } from '@/data'
import type { Metadata } from 'next'

const siteUrl = 'https://marwanbaz.dev'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) return {}

  return {
    title: `${project.title} | Project Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Project Case Study`,
      description: project.summary,
      url: `${siteUrl}/work/${id}`,
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
      canonical: `${siteUrl}/work/${id}`,
    },
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = projects.find(p => p.id === parseInt(id))

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
