import { CVCard } from "@/components/cv-card";
import { ConnectSection } from "@/components/connect-section-card";
import { EmailCard } from "@/components/email-card";
import { ExperienceSection } from "@/components/experiance-card";
import { GitHubLink } from "@/components/github-card";
import Hero from "@/components/hero";
import { LinkedInLink } from "@/components/linkedin-card";
import type { Metadata } from 'next';
import { ProfileInfo } from "@/components/profile-info";
import { ProjectCard } from "@/components/project-card";
import { profileData } from "./data/profile-data";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Marwan Baz's portfolio - Frontend Developer specializing in modern web technologies",
  openGraph: {
    title: "Marwan Baz - Frontend Developer Portfolio",
    description: "Welcome to Marwan Baz's portfolio - Frontend Developer specializing in modern web technologies",
  }
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <Hero />
      
      {/* Profile and Social Links Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 justify-items-center items-center">
        <div className="lg:col-span-5 ">
          <ProfileInfo name={""} imageUrl={""} {...profileData} />
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
          title="Leapat Web App"
          description="Youth-led tech initiative aimed at creating digital transformation in culture, art, education, economy, and more."
          imageUrl="/assets/leapat.png"
          technologies={["NextJs", "Tailwind CSS", "Supabase"]}
          githubUrl="https://github.com/leapat-mukalla/leapat/"
          liveUrl="https://leapat.org"
        />
        <ProjectCard
          title="Deemat Mobile App"
          description="Mobile application for children and parents, offering audio stories and visual stories. Includes comprehensive admin dashboard."
          imageUrl="/assets/deemat.png"
          technologies={["NextJS", "NextUI", "React Native", "Expo", "i18Next", "NodeJS", "ExpressJS", "PrismaORM", "PostgreSQL"]}
          // liveUrl="https://admin.deemat.com"
        />
        <ProjectCard
          title="MIS Pay Web App"
          description="Website showcasing MISpay's 'Shop Now, Pay Later' service, featured stores, and merchant solutions."
          imageUrl="/assets/misPay.png"
          technologies={["NextJS", "Tailwind CSS", "Shadcn", "i18Next", "TypeScript"]}
          // liveUrl="https://mispay.co"
        />
      </div>
    </main>
  );
}
