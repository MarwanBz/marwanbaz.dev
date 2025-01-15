"use client"

import { ArrowLeft, CheckCircle, ExternalLink, Github } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
import { CustomCard } from "@/components/custom-card"
import Image from 'next/image'
import Link from "next/link"
import { useParams } from 'next/navigation'

// Project data with extended information
const projects = [
  {
    id: 1,
    title: "Leapat Web App",
    description: "Youth-led tech initiative aims to create digital transformation in culture, art, education, economy, and more.",
    longDescription: "Leapat is a pioneering youth-led tech initiative focused on driving digital transformation across multiple sectors including culture, art, education, and economy. The platform serves as a central hub for connecting young innovators, sharing resources, and fostering collaboration within the community.",
    imageUrl: "/assets/leapat.png",
    screenshots: [
      "/assets/leapat.png",
      "/assets/leapat-2.png",
      "/assets/leapat-3.png"
    ],
    technologies: ["NextJS", "Tailwind CSS", "Supabase"],
    category: "web",
    githubUrl: "https://github.com/leapat-mukalla/leapat/",
    liveUrl: "https://leapat.org",
    challenges: [
      "Building a scalable platform that could handle multiple sectors",
      "Implementing a robust user authentication system",
      "Creating an intuitive interface for diverse user groups",
      "Ensuring fast performance with dynamic content loading"
    ],
    solutions: [
      "Developed a modular architecture for easy expansion",
      "Integrated Supabase for secure authentication and database management",
      "Conducted user research to optimize the interface",
      "Implemented efficient data fetching and caching strategies"
    ],
    learnings: [
      "Advanced Next.js deployment strategies",
      "Best practices for Supabase integration",
      "Responsive design patterns for complex layouts",
      "Performance optimization techniques"
    ]
  },
  {
    id: 2,
    title: "Deemat Mobile App",
    description: "Mobile application intended for children and parents, offering audio stories and visual stories.",
    longDescription: "Deemat is an innovative mobile application designed to enrich children's learning experience through interactive audio and visual stories. The app provides a safe, engaging environment where parents can monitor and participate in their children's educational journey.",
    imageUrl: "/assets/deemat1.jpg",
    screenshots: [
      "/assets/deemat1.jpg",
      "/assets/deemat2.jpg",
      "/assets/deemat3.jpg"
    ],
    technologies: ["NextJS", "NextUI", "React Native", "Expo", "i18Next", "NodeJS", "ExpressJS", "PrismaORM", "PostgreSQL"],
    category: "mobile",
    liveUrl: "https://apps.apple.com/in/app/deemat-%D8%AF%D9%8A%D9%85%D8%A7%D8%AA/id6467549633",
    challenges: [
      "Developing a cross-platform mobile application",
      "Implementing secure content delivery for children",
      "Creating an engaging user interface for young users",
      "Managing multilingual content with i18Next"
    ],
    solutions: [
      "Utilized React Native and Expo for cross-platform development",
      "Implemented robust parental controls and content filtering",
      "Designed child-friendly UI components with NextUI",
      "Created an efficient content management system"
    ],
    learnings: [
      "Mobile app development best practices",
      "Content security and child safety features",
      "Multilingual app development strategies",
      "Performance optimization for mobile devices"
    ]
  },
  {
    id: 3,
    title: "MIS Pay Web App",
    description: "A Website showcasing MISpay's \"Shop Now, Pay Later\" service, featured stores, and merchant solutions.",
    longDescription: "MIS Pay is a comprehensive web application that revolutionizes the shopping experience by offering a 'Shop Now, Pay Later' service. The platform connects merchants with customers, providing flexible payment solutions while maintaining a seamless user experience.",
    imageUrl: "/assets/mispay.png",
    screenshots: [
      "/assets/mispay.png",
      "/assets/mispay-2.png",
      "/assets/mispay-3.png"
    ],
    technologies: ["NextJS", "Tailwind CSS", "TypeScript"],
    category: "web",
    challenges: [
      "Building a secure payment processing system",
      "Creating an intuitive merchant onboarding process",
      "Implementing real-time payment tracking",
      "Ensuring compliance with financial regulations"
    ],
    solutions: [
      "Integrated secure payment gateways",
      "Developed streamlined merchant dashboard",
      "Implemented WebSocket for real-time updates",
      "Built robust validation and compliance checks"
    ],
    learnings: [
      "Payment gateway integration techniques",
      "Financial compliance requirements",
      "Real-time data handling strategies",
      "Security best practices for financial applications"
    ]
  }
]

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState(null)

  useEffect(() => {
    const projectId = parseInt(params.id as string)
    const foundProject = projects.find(p => p.id === projectId)
    setProject(foundProject)
  }, [params.id])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/work">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Work
            </Button>
          </Link>
          {/* <ThemeToggle /> */}
        </div>
        
        <CustomCard className="p-8 mb-8">
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
        </CustomCard>
      </div>
    </main>
  )
}
