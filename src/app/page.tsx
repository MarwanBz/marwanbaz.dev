import { CVCard } from "@/components/cv-card";
import { ConnectSection } from "@/components/connect-section-card";
import { EmailCard } from "@/components/email-card";
import { ExperienceSection } from "@/components/experiance-card";
import { GitHubLink } from "@/components/github-card";
import Hero from "@/components/hero";
import   { LinkedInLink } from "@/components/linkedin-card";
import { ProfileInfo } from "@/components/profile-info";
import { ProjectCard } from "@/components/project-card";
import { profileData } from "./data/profile-data";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <Hero />
      
      {/* Profile and Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <div className="md:col-span-5">
          <ProfileInfo {...profileData} />
        </div>
        <div className="md:col-span-3 grid grid-cols-2 gap-4">
          <GitHubLink url={profileData.githubUrl} />
          <LinkedInLink url={profileData.linkedinUrl} />
          <CVCard cvUrl={profileData.cvUrl} />
          <EmailCard email={profileData.email} />
        </div>
      </div>

      {/* Connect and Experience Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConnectSection />
        <ExperienceSection experiences={profileData.experiences} />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          title="The Future of Web Development"
          description="A full-stack e-commerce solution with real-time inventory management and secure payment processing"
          imageUrl=""
          technologies={["React", "Next.js", "TypeScript"]}
        />
        <ProjectCard
          title="The Future of Web Development"
          description="A full-stack e-commerce solution with real-time inventory management and secure payment processing"
          imageUrl=""
          technologies={["React", "Next.js", "TypeScript"]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          title="The Future of Web Development"
          description="A full-stack e-commerce solution with real-time inventory management and secure payment processing"
          imageUrl=""
          technologies={["React", "Next.js", "TypeScript"]}
        />
        <ProjectCard
          title="The Future of Web Development"
          description="A full-stack e-commerce solution with real-time inventory management and secure payment processing"
          imageUrl=""
          technologies={["React", "Next.js", "TypeScript"]}
        />
      </div>
    </main>
  );
}
