import { Experience } from "@/types";

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileData {
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string;
  cvLink: string;
  experiences: Experience[];
  email: string;
  socials: SocialLink[];
  description: string;
  skills: string[];
}

export const profileData: ProfileData = {
  description: "I'm a passionate web developer with expertise in modern web technologies. I specialize in building responsive, user-friendly web applications using React, Next.js, and TypeScript.",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "JavaScript",
    "HTML/CSS",
    "Git",
    "RESTful APIs"
  ],
  email: "marouane.bazghifan@gmail.com",
  socials: [
    { platform: "linkedin", url: "https://linkedin.com/in/marwanbz" },
    { platform: "github", url: "https://github.com/marwanbz" },
    { platform: "twitter", url: "" }
  ],
  githubUrl: "https://github.com/marwanbz",
  linkedinUrl: "https://linkedin.com/in/marwanbz",
  cvUrl: "https://drive.google.com/file/d/1EDrEKGQdEKTJzoNCJ-BiFzIWMV5UMSz9/view?usp=sharing",
  cvLink: "https://https://drive.google.com/file/d/1EDrEKGQdEKTJzoNCJ-BiFzIWMV5UMSz9/view?usp=sharing",
  experiences: [
    {
      role: "Frontend Developer",
      company: "Wahadat App",
      period: "4 2025 to present",
      description: "Developed frontend features using React.js and Next.js for the company products. Integrated RESTful APIs and handled data fetching. Converted Figma designs into responsive components and layouts.",
      technologies: ["React.js", "Next.js", "JavaScript", "TypeScript", "Shadcn", "Tailwind CSS", "RESTful APIs"]
    },
    {
      role: "Frontend Web developer internship",
      company: "Harkeh",
      period: "11 2024 to 2025-4",
      description: "Structured and developed the frontend of a Project Management Tool using Next.js. Implemented a responsive, user-friendly interface.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Project Management"]
    }
  ]
}
