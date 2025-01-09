import { CVCard } from "@/components/cv-card";
import { ConnectSection } from "@/components/connect-section-card";
import { EmailCard } from "@/components/email-card";
import { ExperienceSection } from "@/components/experiance-card";
import { GitHubLink } from "@/components/github-card";
import Hero from "@/components/hero";
import { LinkedInLink } from "@/components/linkedin-card";
import { ProfileInfo } from "@/components/profile-info";
import { ProjectCard } from "@/components/project-card";
import { profileData } from "./data/profile-data";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <Hero />
      
      {/* Profile and Social Links Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 justify-items-center items-center">
        <div className="lg:col-span-5 ">
          <ProfileInfo {...profileData} />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-4 gap-4 align-items-end max-[400px]:grid-cols-1 max-[400px]:gap-0 max-[400px]:align-items-center max-[400px]:gap-y-2">
            <div className="col-span-1">
                <GitHubLink  url={profileData.githubUrl} />
            <LinkedInLink url={profileData.linkedinUrl} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            </div>
          
            <div className="col-span-3 flex flex-col justify-center gap-2 ">
               <CVCard cvUrl={profileData.cvUrl} />
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
