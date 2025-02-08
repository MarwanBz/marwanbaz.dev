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
  experiences: []
}
