import { ProfileData } from '../types'

export const profileData: ProfileData = {
  name: "Marwan Bazighifan",
  title: "Full Stack Developer",
  description: "Passionate full-stack developer with expertise in React, Next.js, and TypeScript. Building scalable web applications and contributing to open-source projects.",
  imageUrl: "/placeholder.svg?height=200&width=200",
  location: "San Francisco, CA",
  availability: "available",
  socials: [
    {
      platform: "github",
      url: "https://github.com"
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com"
    }
  ],
  email: "example@email.com",
  cvUrl: "/cv.pdf",
  experiences: [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp",
      period: "2024 - Present",
      description: "Leading development of enterprise applications",
      technologies: ["React", "Node.js", "TypeScript"]
    },
    {
      role: "Full Stack Developer",
      company: "StartupX",
      period: "2022 - 2024",
      description: "Built scalable web applications",
      technologies: ["Next.js", "PostgreSQL", "AWS"]
    }
  ],
  skills: [
    "React", "Next.js", "TypeScript", "Node.js",
    "PostgreSQL", "AWS", "Docker", "GraphQL"
  ]
}

