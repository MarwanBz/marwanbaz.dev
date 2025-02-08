import { ProfileData } from '../../types/index'

export const profileData: ProfileData = {
  name: "Marwan Bazighifan",
  title: "Web Developer",
  description: "Web developer with a passion for technology, skilled in HTML, CSS, JavaScript, and various web development frameworks and libraries, including ReactJS. Solid understanding of computer networks and operating systems.",
  imageUrl: "/assets/marwan_img.png",
  location: "127.0.0.1 | Remote",
  socials: [
    {
      platform: "linkedin",
      url: "https://linkedin.com"
    }
  ],
  email: "marouane.bazghifan@gmail.com",
  cvLink: "https://drive.google.com/file/d/1EDrEKGQdEKTJzoNCJ-BiFzIWMV5UMSz9/view?usp=sharing",
  cvUrl: "/assets/Marwan_cv_2025.pdf",
  experiences: [
    // {
    //   role: "System Administrator",
    //   company: "Bin-Mahfouz Org",
    //   period: "12-2023 - Present",
    //   description: "Monitor computer networks, manage Windows server, and configure Dahua security systems",
    //   technologies: ["Windows Server", "Network Administration", "Security Systems"]
    // },
    {
      role: "Web Developer",
      company: "Harkh",
      period: "11-2024 - Present",
      description: "Current internship position",
      technologies: ["NextJs", "Shadcn", "Tailwind CSS"]
    },
    {
      role: "Internship",
      company: "CodSoft",
      period: "9-2023 - 10-2023",
      description: "Developed and designed responsive landing pages and JavaScript applications",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      role: "Freelance Web Developer",
      company: "Self-employed",
      period: "11-2021 - Present",
      description: "Provide frontend development services to clients, creating visually appealing websites and web applications",
      technologies: ["Frontend Development", "Web Design"]
    }
  ],
  skills: [
    "JavaScript", "HTML5", "CSS3", "SCSS", "React.js", 
    "NextJs", "React Native", "NextUI", "i18next", 
    "SQL", "TypeScript", "Tailwind CSS", "Git", 
    "GitHub", "GitLab", "Figma", "UI Design", 
    "Web Design", "Linux"
  ]
}
