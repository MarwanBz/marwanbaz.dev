import { ExternalLink, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectShowcaseProps {
  title: string
  summary: string
  coreFunctionalities: string[]
  role: string
  technologies: string[]
  liveDemo?: string
  sourceCode?: string
  purpose: string
  expectedOutcome: string
  initialDesigns: string[]
  spotlightFeature: {
    title: string
    description: string
  }
  technicalChallenges: string[]
  solutions: string[]
  currentStatus?: {
    users: string
    feedback: string
  }
  lessonsLearned: string[]
  frameworkExperience?: string
  accessibilityLearnings?: string
  impact: string
  screenshots: {
    url: string
    caption: string
  }[]
}

export function ProjectShowcase({
  title,
  summary,
  coreFunctionalities,
  role,
  technologies,
  liveDemo,
  sourceCode,
  purpose,
  expectedOutcome,
  initialDesigns,
  spotlightFeature,
  technicalChallenges,
  solutions,
  currentStatus,
  lessonsLearned,
  frameworkExperience,
  accessibilityLearnings,
  impact,
  screenshots,
}: ProjectShowcaseProps) {
  return (
    <article className="max-w-4xl mx-auto space-y-8 p-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{summary}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          {liveDemo && (
            <Button asChild>
              <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </a>
            </Button>
          )}
          {sourceCode && (
            <Button variant="outline" asChild>
              <a href={sourceCode} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source Code
              </a>
            </Button>
          )}
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <ul className="list-disc pl-6 space-y-2">
          {coreFunctionalities.map((functionality, index) => (
            <li key={index}>{functionality}</li>
          ))}
        </ul>
        <p className="mt-4">
          <strong>My Role:</strong> {role}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Purpose and Goal</h2>
        <p className="mb-4">{purpose}</p>
        <p className="mb-4">
          <strong>Expected Outcome:</strong> {expectedOutcome}
        </p>
        <h3 className="text-xl font-semibold mb-2">Initial Designs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialDesigns.map((design, index) => (
            <Image
              key={index}
              src={design || "/placeholder.svg"}
              alt={`Initial design ${index + 1}`}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Spotlight Feature</h2>
        <h3 className="text-xl font-semibold mb-2">{spotlightFeature.title}</h3>
        <p>{spotlightFeature.description}</p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Technical Challenges</h3>
        <ul className="list-disc pl-6 space-y-2">
          {technicalChallenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Solutions</h3>
        <ul className="list-disc pl-6 space-y-2">
          {solutions.map((solution, index) => (
            <li key={index}>{solution}</li>
          ))}
        </ul>
      </section>

      {currentStatus && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
          <p>
            <strong>Users:</strong> {currentStatus.users}
          </p>
          <p>
            <strong>Feedback:</strong> {currentStatus.feedback}
          </p>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Lessons Learned</h2>
        <ul className="list-disc pl-6 space-y-2">
          {lessonsLearned.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ul>
        {frameworkExperience && (
          <p className="mt-4">
            <strong>Framework Experience:</strong> {frameworkExperience}
          </p>
        )}
        {accessibilityLearnings && (
          <p className="mt-4">
            <strong>Accessibility Learnings:</strong> {accessibilityLearnings}
          </p>
        )}
        <p className="mt-4">
          <strong>Impact on Future Work:</strong> {impact}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screenshots.map((screenshot, index) => (
            <figure key={index} className="space-y-2">
              <Image
                src={screenshot.url || "/placeholder.svg"}
                alt={screenshot.caption}
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
              <figcaption className="text-sm text-center text-gray-600 dark:text-gray-400">
                {screenshot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </article>
  )
}

