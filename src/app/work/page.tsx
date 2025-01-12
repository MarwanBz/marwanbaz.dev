"use client"

// import { CustomCard } from "@/components/custom-card"
import { FilterBar } from "@/components/filter-bar"
// import Link from "next/link"
import { ProjectCard } from "@/components/project-card"
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: "Leapat Web App",
    description: "Youth-led tech initiative aims to create digital transformation in culture, art, education, economy, and more.",
    imageUrl: "/assets/leapat.png",
    technologies: ["NextJS", "Tailwind CSS", "Supabase"],
    category: "web",
    learnMoreUrl: "#"
  },
  {
    id: 2,
    title: "Deemat Mobile App Admin Dashboard",
    description: "Mobile application intended for children and parents, offering audio stories and visual stories.",
    imageUrl: "/assets/deemat.png", 
    technologies: ["NextJS", "NextUI", "React Native", "Expo", "i18Next", "NodeJS", "ExpressJS", "PrismaORM", "PostgreSQL"],
    category: "mobile",
    learnMoreUrl: "#"
  },
  {
    id: 3,
    title: "MIS Pay Web App",
    description: "A Website showcasing MISpay's \"Shop Now, Pay Later\" service, featured stores, and merchant solutions.",
    imageUrl: "/assets/misPay.png",
    technologies: ["NextJS", "Tailwind CSS", "Shadcn", "i18Next", "TypeScript"],
    category: "web",
    learnMoreUrl: "#"
  }
]

export default function WorkPage() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  )

  return (
    <main className="min-h-screen  p-4 pt-44 flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl">
        
        
        <div className="p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Work</h1>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
          <div className="grid gap-6 mt-8 grid-cols-1">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
