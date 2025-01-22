import { ArrowLeft, Code, Github, Instagram, Linkedin, Sparkles, Twitter, Wrench } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import { CreativeCodeCard } from "@/components/creative-code-card"
import { CustomCard } from "@/components/custom-card"
import Image from 'next/image'
import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { SocialLinks } from "@/components/social-links"

const interests = ["Web Development", "UI/UX Design", "Animation", "AI & Machine Learning", "Open Source", "Code Arts", "3D Animations"]
const techStack = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Three.js", "WebGL", "GLSL"]
const currentTools = ["VS Code", "Figma", "GitHub", "Vercel", "Framer Motion", "Storybook", "Blender", "Unity"]

const socialLinks = [
  { icon: Github, url: "https://github.com/yourusername", label: "GitHub" },
  { icon: Linkedin, url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: Twitter, url: "https://twitter.com/yourusername", label: "Twitter" },
  { icon: Instagram, url: "https://instagram.com/yourusername", label: "Instagram" },
]

const smallProjects = [
  {
    title: "Interactive Portfolio",
    description: "A personal portfolio website with smooth animations and interactive elements.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    link: "https://github.com/yourusername/interactive-portfolio",
    media: {
      type: "gif",
      url: "/placeholder.gif"
    }
  },
  {
    title: "Real-time Drawing App",
    description: "A collaborative drawing application using WebSockets for real-time updates.",
    tech: ["Node.js", "Socket.io", "Canvas API"],
    link: "https://github.com/yourusername/realtime-drawing-app",
    media: {
      type: "video",
      url: "/placeholder.mp4"
    }
  },
  {
    title: "CSS Animation Library",
    description: "A custom CSS animation library for creating engaging micro-interactions.",
    tech: ["CSS", "JavaScript"],
    link: "https://github.com/yourusername/css-animation-library",
    media: {
      type: "gif",
      url: "/placeholder.gif"
    }
  },
  {
    title: "React Particle Effects",
    description: "A React component for creating customizable particle effects.",
    tech: ["React", "TypeScript"],
    link: "https://github.com/yourusername/react-particle-effects",
    media: {
      type: "video",
      url: "/placeholder.mp4"
    }
  }
]



export default function AboutPage() {
  return (
    <main className="min-h-screen  p-4 pt-44  flex flex-col items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-6xl">
        
        
        <CustomCard className="p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full  lg:w-1/2">
              <Image
                src="/assets/marwan_img.png"
                alt="Your Name"
                width={600}
                height={600}
                className="rounded-full object-cover shadow-lg border"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <h1 className="text-4xl font-bold mb-4">About Me</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Hi there! I&apos;m a passionate web developer with a love for creating beautiful, interactive, and performant web applications. I thrive on turning complex problems into simple, elegant solutions.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                My journey in tech has led me to explore various aspects of web development, from front-end frameworks to back-end architectures. I&apos;m particularly excited about code arts and 3D animations, pushing the boundaries of what&lsquo;s possible on the web.
              </p>
              {socialLinks && socialLinks.length > 0 && <SocialLinks links={socialLinks} />}
            </div>
          </div>
        </CustomCard>

        <CustomCard className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="text-yellow-500" />
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {(interests ?? []).map((interest, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {interest}
              </Badge>
            ))}
            {interests?.length === 0 && <p>No interests listed</p>}
          </div>
        </CustomCard>

        <CustomCard className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="text-blue-500" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {(techStack ?? []).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
            {techStack?.length === 0 && <p>No tech stack listed</p>}
          </div>
        </CustomCard>

        <CustomCard className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Wrench className="text-green-500" />
            Current Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {(currentTools ?? []).map((tool, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tool}
              </Badge>
            ))}
            {currentTools?.length === 0 && <p>No tools listed</p>}
          </div>
        </CustomCard>

        <CustomCard className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Github className="text-purple-500" />
            Small Projects
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            I love creating and animating things on the web. Here are some of my small but noteworthy projects:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(smallProjects ?? []).map((project, index) => (
              <ProjectCard imageUrl={''} key={index} {...project} technologies={["NextJs", "Tailwind CSS", "Supabase"]} />
            ))}
            {smallProjects?.length === 0 && <p>No projects available</p>}
          </div>
        </CustomCard>

        {/* <CustomCard className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="text-indigo-500" />
            Creative Coding: Code Arts & 3D Animations
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Exploring the intersection of code, art, and three-dimensional space, here are some of my creative coding projects:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(creativeProjects ?? []).map((project, index) => (
              <CustomCard key={index} {...project} />
            ))}
            {creativeProjects?.length === 0 && <p>No creative coding projects available</p>}
          </div>
        </CustomCard> */}

        <CustomCard className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Let&apos;s Connect!</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            I&apos;m always excited to collaborate on new projects or discuss the latest in web development, code arts, and 3D animations. Whether you have a project in mind or just want to chat about tech and creativity, feel free to reach out!
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/work">View My Work</Link>
            </Button>
          </div>
        </CustomCard>
      </div>
    </main>
  )
}

