"use client"

import { useEffect, useState } from "react"

import Loading from "@/app/loading"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { CustomCard } from "@/components/custom-card"
// import Link from "next/link"
import { ProjectShowcase } from "@/components/project-showcase"
import { projects } from "@/app/data/projects"
import { useParams } from "next/navigation"

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<typeof projects[0] | null>(null)

  useEffect(() => {
    const projectId = parseInt(params.id as string)
    const foundProject = projects.find(p => p.id === projectId)
    setProject(foundProject || null)
  }, [params.id])

  if (!project) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-4 pt-44 flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl">
        
        {/* <CustomCard className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
              <p className="text-muted-foreground mb-6">{project.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4">
                {project.githubUrl && (
                  <Button asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Github size={20} />
                      View on GitHub
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild variant="outline">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink size={20} />
                      Visit Live Site
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </CustomCard>

        <CustomCard className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Project Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.screenshots.map((screenshot, index) => (
              <Image
                key={index}
                src={screenshot}
                alt={`${project.title} screenshot ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full"
              />
            ))}
          </div>
        </CustomCard>

        <CustomCard className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Case Study</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Challenges</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-500" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CustomCard>

        <CustomCard className="p-8">
          <h2 className="text-2xl font-bold mb-6">What I Learned</h2>
          <ul className="space-y-4">
            {project.learnings.map((learning, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-purple-500" />
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </CustomCard> */}

        <ProjectShowcase {...project} />
      </div>
    </main>
  )
}
