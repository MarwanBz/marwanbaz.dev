import { ArrowLeft } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CustomCard } from "@/components/custom-card"
import Link from "next/link"
import { profileData } from "@/app/data/profile-data"

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4 pt-44 flex flex-col items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <CustomCard className="p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {profileData.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {profileData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">My Journey</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            As a passionate web developer, I've been working on various projects and continuously expanding my skill set. From freelancing to internships at companies like CodSoft and Harkh, I've gained valuable experience in frontend development, focusing on modern technologies like React.js, Next.js, and Tailwind CSS.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">My Approach</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            I believe in creating clean, efficient, and user-friendly web applications. My focus is on writing maintainable code while staying up-to-date with the latest web technologies. Whether it's building responsive interfaces or implementing complex functionality, I strive to deliver high-quality solutions that meet both user needs and technical requirements.
          </p>
        </CustomCard>
        
        <CustomCard className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Get in Touch</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            I'm currently available for new opportunities and collaborations. If you're interested in working together or have any questions, feel free to reach out!
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href={`mailto:${profileData.email}`}>Email Me</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={profileData.socials.find(s => s.platform === 'linkedin')?.url || '#'} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </Link>
            </Button>
          </div>
        </CustomCard>
      </div>
    </main>
  )
}
