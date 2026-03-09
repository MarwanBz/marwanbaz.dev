"use client";

import { Code, Github, Instagram, Linkedin, Palette, Sparkles, Twitter, Wrench } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CustomCard } from "@/components/custom-card"
import { DesignGallery } from '@/components/design-gallery'
import Image from 'next/image'
import Link from "next/link"
import { SocialLinks } from "@/components/social-links"

const interests = ["Web Development", "UI Design", "Animation", "AI", "Open Source", "Code Arts", "3D Animations"]
const techStack = ["React", "Next.js", "Javascript","TypeScript",  "Tailwind CSS", ]
const currentTools = ["VS Code", "Figma", "GitHub", "Vercel", "Ubuntu" ]

const socialLinks = [
  { icon: Github, url: "https://github.com/marwanebaz", label: "GitHub" },
  { icon: Linkedin, url: "https://linkedin.com/in/marwanbaz", label: "LinkedIn" },
  { icon: Twitter, url: "https://twitter.com/marwanbz_", label: "Twitter" },
  { icon: Instagram, url: "https://instagram.com/marwan_dev_", label: "Instagram" },
]

const designGallery = [
  {
    id: 1,
    title: "Card Design",
    description: "minimalist Card Design",
    imageUrl: "/assets/design/card.png",
  },
  {
    id: 2,
    title: "AI Logo Concept",
    description: "Logo design ",
    imageUrl: "/assets/design/logo.png",
  },
  {
    id: 3,
    title: "Landing Page",
    description: "Modern, design for web applications",
    imageUrl: "/assets/design/08.png",
  },
  {
    id: 4,
    title: "AI Logo Design ",
    description: "AI Logo design ",
    imageUrl: "/assets/design/logo_design.jpg",
  },
  {
    id: 5,
    title: "Landing Page Design for Readers",
    description: "Landing Page ",
    imageUrl: "/assets/design/01.png",
  },
]

export function AboutClient() {
  return (
    <main className="min-h-screen  p-4 pt-44  flex flex-col items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-6xl">

        <CustomCard className="p-8 mb-8" >
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
                Hi there! I&apos;m a passionate web developer with a love for creating beautiful, interactive, and performant web interfaces. I thrive on turning complex problems into simple, elegant solutions.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                My journey in tech has led me to explore various aspects of web development, from front-end frameworks.
              </p>
              {socialLinks && socialLinks.length > 0 && <SocialLinks links={socialLinks} />}
            </div>
          </div>
        </CustomCard>

        <CustomCard className="p-8 mb-8" showing={false}>
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

        <CustomCard className="p-8 mb-8" showing={false}>
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

        <CustomCard className="p-8 mb-8" showing={false}>
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
            <Palette className="text-indigo-500" />
            Design Gallery
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            When I&apos;m not coding, I like to play around with design tools like Figma and Adobe XD. It&apos;s pretty fun! This
            gallery shows off some of my UI designs - just a bunch of interfaces I&apos;ve enjoyed creating that look good
            and are easy to use.
          </p>
          <DesignGallery designs={designGallery} />
        </CustomCard>

        <CustomCard className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Let&apos;s Connect!</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            I&apos;m always excited to collaborate on new projects or discuss the latest in web development, code arts, and
            3D animations. Whether you have a project in mind or just want to chat about tech and creativity, feel free
            to reach out!
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="mailto:marouane.bazghifan@gmail.com
">Get in Touch</Link>
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
