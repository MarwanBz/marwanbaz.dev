import { CVCard } from "@/components/cv-card"
import { BlogComponent } from "@/components/blog-marque"
import { ConnectSection } from "@/components/connect-section-card"
import { EmailCard } from "@/components/email-card"
import { ExperienceSection } from "@/components/experiance-card"
import { GitHubLink } from "@/components/github-card"
import Hero from "@/components/hero"
import { HomeLoaderWrapper } from "@/components/home-loader-wrapper"
import { LinkedInLink } from "@/components/linkedin-card"
import type { Metadata } from 'next'
import { ProfileInfo } from "@/components/profile-info"
// import { ProfileInfo } from "@/components/profile-card"
import { ProjectCard } from "@/components/project-card"
import { profileData } from "@/data"
import { getFeaturedProjects, getLatestPosts } from "@/lib/cms/strapi"

export const metadata: Metadata = {
  title: "Marwan Baz - Web Engineer  | Next.js & React ",
  description: "Explore the website of Marwan Baz, a Frontend Developer specializing in Next.js, React, and modern web technologies. View projects and learn about my skills in web development.",
  keywords: ["Frontend Developer", "Next.js", "React", "Portfolio", "Web Development", "JavaScript", "TypeScript"],
  openGraph: {
    title: "Marwan Baz - Frontend Developer Portfolio | Next.js Expert",
    description: "Explore the portfolio of Marwan Baz, a Frontend Developer specializing in Next.js, React, and modern web technologies.",
  },
}

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getFeaturedProjects(6),
    getLatestPosts(6),
  ])

  return (
    <HomeLoaderWrapper>
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <Hero />
        
        {/* Profile and Social Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 justify-items-center items-center">
          <div className="lg:col-span-5">
            <ProfileInfo {...profileData} />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-4 gap-4 align-items-end max-[400px]:grid-cols-1 max-[400px]:gap-0 max-[400px]:align-items-center max-[400px]:gap-y-2">
              <div className="col-span-1">
                <GitHubLink  />
                <LinkedInLink  />
              </div>
              <div className="col-span-3 flex flex-col justify-center gap-2">
                <CVCard cvUrl={profileData.cvUrl} cvLink={profileData.cvLink} />
                <EmailCard email={profileData.email} />
              </div>
            </div>
          </div>
        </div>

        {/* Connect and Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConnectSection />
          <ExperienceSection experiences={profileData.experiences} />
        </div>
        <BlogComponent posts={latestPosts} />
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              isFeatured={project.isFeatured}
              description={project.summary}
              imageUrl={project.imageUrl}
              technologies={project.technologies}
              githubUrl={project.sourceCode || undefined}
              liveUrl={project.liveDemo || undefined}
              projectUrl={`/work/${project.slug}`}
            />
          ))}
        </div>
      </main>
    </HomeLoaderWrapper>
  )
}
