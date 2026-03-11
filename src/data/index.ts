// Single source of truth for all Marwan's data
import { Experience } from "@/types";

// Types for unified data structure
export interface SocialLink {
  platform: string;
  url: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  coreFunctionalities: string[];
  role: string;
  technologies: string[];
  category: "web" | "mobile";
  liveDemo?: string;
  sourceCode?: string;
  purpose: string;
  expectedOutcome: string;
  initialDesigns: string[];
  spotlightFeature: {
    title: string;
    description: string;
  };
  technicalChallenges: string[];
  solutions: string[];
  currentStatus: {
    users: string;
    feedback: string;
  };
  lessonsLearned: string[];
  frameworkExperience: string;
  accessibilityLearnings: string;
  impact: string;
  screenshots: Array<{
    url: string;
    caption: string;
  }>;
}

export interface UnifiedData {
  // Personal Information
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  email: string;
  availability?: string;

  // CV and Links
  cvUrl: string;
  cvLink: string;
  githubUrl: string;
  linkedinUrl: string;

  // Skills and Technologies
  skills: string[];

  // Social Links
  socials: SocialLink[];

  // Professional Experience
  experiences: Experience[];

  // Projects Portfolio
  projects: Project[];
}

// The single source of truth
export const marwanData: UnifiedData = {
  // Personal Information
  name: "Marwan Bazighifan",
  title: "Frontend Web Developer",
  description:
    "I'm a passionate web developer with expertise in modern web technologies. I specialize in building responsive, user-friendly web applications using React, Next.js, and TypeScript.",
  imageUrl: "/assets/marwan_img.png",
  location: "127.0.0.1 | Remote",
  email: "marouane.bazghifan@gmail.com",
  availability: "Available for new opportunities",

  // CV and Professional Links
  cvUrl: "/assets/Marwan_cv_2025.pdf",
  cvLink:
    "https://drive.google.com/file/d/1EDrEKGQdEKTJzoNCJ-BiFzIWMV5UMSz9/view?usp=sharing",
  githubUrl: "https://github.com/marwanbz",
  linkedinUrl: "https://linkedin.com/in/marwanbz",

  // Skills and Technologies
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "SCSS",
    "Tailwind CSS",
    "Node.js",
    "React Native",
    "Expo",
    "NextUI",
    "Shadcn",
    "i18Next",
    "SQL",
    "PostgreSQL",
    "PrismaORM",
    "ExpressJS",
    "RESTful APIs",
    "Git",
    "GitHub",
    "GitLab",
    "Figma",
    "UI Design",
    "Web Design",
    "Linux",
    "Supabase",
    "React Query",
  ],

  // Social Links
  socials: [
    { platform: "linkedin", url: "https://linkedin.com/in/marwanbz" },
    { platform: "github", url: "https://github.com/marwanbz" },
    { platform: "twitter", url: "" },
  ],

  // Professional Experience (most recent first)
  experiences: [
    {
      role: "Frontend Developer",
      company: "Wahadat App",
      period: "Apr 2025 - Present",
      description:
        "Developed frontend features using React.js and Next.js for the company products. Integrated RESTful APIs and handled data fetching. Converted Figma designs into responsive components and layouts.",
      technologies: [
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Shadcn",
        "Tailwind CSS",
        "RESTful APIs",
      ],
    },
    {
      role: "Frontend Web Developer Intern",
      company: "Haraka",
      period: "Nov 2024 - Apr 2025",
      description:
        "Structured and developed the frontend of an AI-powered Project Management Tool using Next.js. Implemented a responsive, user-friendly interface for intelligent task management and team collaboration.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "API Integration",
        "React Query",
      ],
    },
    // {
    //   role: "Web Developer Intern",
    //   company: "CodSoft",
    //   period: "Sep 2023 - Oct 2023",
    //   description:
    //     "Developed and designed responsive landing pages and JavaScript applications during remote internship program.",
    //   technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    // },
    {
      role: "Freelance Web Developer",
      company: "Self-employed",
      period: "Nov 2021 - Present",
      description:
        "Provide frontend development services to clients, creating visually appealing websites and web applications with modern technologies and best practices.",
      technologies: [
        "Frontend Development",
        "Web Design",
        "React",
        "Next.js",
        "Tailwind CSS",
      ],
    },
  ],

  // Projects Portfolio
  projects: [
    {
      id: 4,
      title: "Haraka - AI Project Management Tool",
      slug: "haraka-ai-project-management-tool",
      summary:
        "An AI-powered project management tool that intelligently assigns tasks based on team strengths, automates workflows, and optimizes productivity with real-time insights.",
      imageUrl: "/assets/haraka.png",
      coreFunctionalities: [
        "AI-powered task generation and assignment",
        "Intelligent task prioritization based on team strengths",
        "Real-time project reports and insights",
        "Context-aware AI assistance for task management",
        "Automated workflow optimization",
        "Team collaboration and communication tools",
        "Instant report generation",
        "User-friendly interface with minimal learning curve",
      ],
      role: "Frontend Web Developer Intern",
      technologies: [
        "NextJS",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "API Integration",
        "React Query",
      ],
      category: "web",
      liveDemo: "https://www.haraka.pro/",
      sourceCode: "",
      purpose:
        "Developed during internship to create an AI-powered project management solution that maximizes efficiency, enhances team collaboration, and streamlines workflows through smart automation.",
      expectedOutcome:
        "An intelligent project management platform that leverages AI to optimize team productivity, automate routine tasks, and provide real-time insights for better decision-making.",
      initialDesigns: ["/assets/haraka.png"],
      spotlightFeature: {
        title: "AI-Powered Task Management",
        description:
          "Revolutionary AI agent that understands team dynamics, automatically assigns tasks based on individual strengths, and provides context-aware assistance to maximize productivity and efficiency.",
      },
      technicalChallenges: [
        "Integrating AI capabilities into the user interface",
        "Building responsive and intuitive design",
        "Implementing complex state management for AI features",
        "Creating seamless user experience with AI assistance",
        "Ensuring optimal performance with AI processing",
      ],
      solutions: [
        "Utilized Next.js for optimal performance and AI integration",
        "Implemented TypeScript for type safety in AI workflows",
        "Created responsive design with Tailwind CSS",
        "Developed modular component architecture for AI features",
        "Built efficient state management for real-time AI updates",
      ],
      currentStatus: {
        users: "Live platform serving teams worldwide",
        feedback:
          "Successfully launched AI-powered project management tool with positive user adoption",
      },
      lessonsLearned: [
        "AI integration in web applications",
        "Advanced React patterns for AI workflows",
        "TypeScript implementation in AI-powered projects",
        "User experience design for AI-assisted tools",
        "Performance optimization for AI features",
      ],
      frameworkExperience:
        "Next.js provided excellent foundation for building AI-powered features with its optimization capabilities and TypeScript support for complex AI workflows.",
      accessibilityLearnings:
        "Implemented accessibility best practices to ensure AI-powered features are usable by all team members, including proper AI feedback and assistance.",
      impact:
        "Successfully contributed to creating an innovative AI-powered project management tool that revolutionizes how teams collaborate and manage projects through intelligent automation.",
      screenshots: [
        {
          url: "/assets/haraka.png",
          caption: "Haraka AI Project Management Interface",
        },
      ],
    },
    {
      id: 1,
      title: "Leapat Web App",
      slug: "leapat-web-app",
      summary:
        "Youth-led tech initiative aims to create digital transformation in culture, art, education, economy, and more.",
      imageUrl: "/assets/leapat.png",
      coreFunctionalities: [
        "Digital transformation platform",
        "Cultural and educational content",
        "Community engagement features",
        "Multi-language support",
        "Responsive design",
      ],
      role: "Full-stack Developer",
      technologies: ["NextJS", "Tailwind CSS", "Supabase"],
      category: "web",
      liveDemo: "https://leapat.org",
      sourceCode: "https://github.com/leapat-mukalla/leapat/",
      purpose:
        "Created to drive digital transformation in Yemen's cultural and educational landscape, providing a platform for youth engagement and community development.",
      expectedOutcome:
        "A comprehensive platform that bridges traditional culture with modern technology, making educational and cultural content more accessible to youth.",
      initialDesigns: ["/assets/leapat.png"],
      spotlightFeature: {
        title: "Cultural Digital Transformation",
        description:
          "Innovative platform that seamlessly integrates cultural preservation with modern technology, creating an engaging space for youth to connect with their heritage while embracing digital innovation.",
      },
      technicalChallenges: [
        "Implementing efficient content delivery",
        "Building a scalable architecture",
        "Ensuring cultural sensitivity in design",
        "Optimizing for low-bandwidth conditions",
      ],
      solutions: [
        "Utilized Supabase for robust backend operations",
        "Implemented responsive design principles",
        "Created optimized content delivery system",
        "Developed user-friendly interface with Tailwind CSS",
      ],
      currentStatus: {
        users: "Actively serving the youth community in Yemen",
        feedback:
          "Positive response from users and cultural organizations regarding the platform's impact on digital transformation",
      },
      lessonsLearned: [
        "Importance of cultural context in tech solutions",
        "Value of community-driven development",
        "Balancing tradition with innovation",
        "Optimization for local infrastructure conditions",
      ],
      frameworkExperience:
        "NextJS provided an excellent foundation for building a fast, SEO-friendly platform with great developer experience.",
      accessibilityLearnings:
        "Implemented inclusive design practices to ensure content accessibility across different user groups.",
      impact:
        "Successfully bridging the gap between traditional culture and digital innovation, creating new opportunities for youth engagement and education.",
      screenshots: [
        { url: "/assets/leapat.png", caption: "Leapat Platform Homepage" },
      ],
    },
    {
      id: 2,
      title: "Deemat Mobile App",
      slug: "deemat-mobile-app",
      summary:
        "Mobile application intended for children and parents, offering audio stories and visual stories.",
      imageUrl: "/assets/deemat1.jpg",
      coreFunctionalities: [
        "Audio story playback",
        "Visual story presentation",
        "Parent-child interaction features",
        "Multi-language support",
        "Offline content access",
      ],
      role: "Full-stack Mobile Developer",
      technologies: [
        "NextJS",
        "NextUI",
        "React Native",
        "Expo",
        "i18Next",
        "NodeJS",
        "ExpressJS",
        "PrismaORM",
        "PostgreSQL",
      ],
      category: "mobile",
      liveDemo:
        "https://apps.apple.com/in/app/deemat-%D8%AF%D9%8A%D9%85%D8%A7%D8%AA/id6467549633",
      sourceCode: "",
      purpose:
        "Developed to provide children and parents with an engaging platform for storytelling and learning through interactive audio and visual content.",
      expectedOutcome:
        "An intuitive mobile application that makes storytelling more accessible and engaging for children while providing parents with tools to monitor and participate in their children's learning journey.",
      initialDesigns: ["/assets/deemat1.jpg"],
      spotlightFeature: {
        title: "Interactive Storytelling",
        description:
          "Combines audio and visual elements to create an immersive storytelling experience, making learning engaging and fun for children.",
      },
      technicalChallenges: [
        "Implementing smooth audio playback",
        "Managing offline content storage",
        "Ensuring cross-platform compatibility",
        "Optimizing app performance",
      ],
      solutions: [
        "Built robust backend with NodeJS and ExpressJS",
        "Implemented efficient data management with PrismaORM",
        "Created seamless mobile experience with React Native",
        "Developed multilingual support using i18Next",
      ],
      currentStatus: {
        users: "Available on App Store with growing user base",
        feedback:
          "Parents appreciate the educational value and engaging content format",
      },
      lessonsLearned: [
        "Mobile-first design principles",
        "Audio content optimization",
        "Cross-platform development strategies",
        "User experience for children",
      ],
      frameworkExperience:
        "React Native and Expo provided excellent tools for building a cross-platform mobile application with native performance.",
      accessibilityLearnings:
        "Focused on creating child-friendly interfaces and ensuring content is accessible to different age groups.",
      impact:
        "Successfully created an educational platform that makes learning enjoyable for children through interactive storytelling.",
      screenshots: [
        { url: "/assets/deemat1.jpg", caption: "Deemat App Interface" },
      ],
    },
    {
      id: 3,
      title: "MIS Pay Web App",
      slug: "mis-pay-web-app",
      summary:
        'A Website showcasing MISpay\'s "Shop Now, Pay Later" service, featured stores, and merchant solutions.',
      imageUrl: "/assets/misPay.png",
      coreFunctionalities: [
        "Shop Now, Pay Later service",
        "Merchant integration",
        "Store directory",
        "Payment processing",
        "User dashboard",
      ],
      role: "Frontend Developer",
      technologies: [
        "NextJS",
        "Tailwind CSS",
        "Shadcn",
        "i18Next",
        "TypeScript",
      ],
      category: "web",
      liveDemo: "",
      sourceCode: "",
      purpose:
        "Created to provide a modern, user-friendly platform for MISpay's payment solutions, connecting merchants with customers through flexible payment options.",
      expectedOutcome:
        "A robust web application that streamlines the shopping experience while providing merchants with powerful tools to manage their payment solutions.",
      initialDesigns: ["/assets/misPay.png"],
      spotlightFeature: {
        title: "Flexible Payment Solutions",
        description:
          "Innovative payment system that allows customers to split their purchases into manageable installments while providing merchants with secure payment processing.",
      },
      technicalChallenges: [
        "Implementing secure payment processing",
        "Creating intuitive merchant interfaces",
        "Managing complex state",
        "Ensuring payment compliance",
      ],
      solutions: [
        "Utilized TypeScript for type-safe development",
        "Implemented responsive UI with Tailwind CSS",
        "Created reusable components with Shadcn",
        "Developed multilingual support with i18Next",
      ],
      currentStatus: {
        users: "In development phase",
        feedback: "Positive response from initial merchant testing",
      },
      lessonsLearned: [
        "Payment system integration best practices",
        "TypeScript implementation strategies",
        "Component library development",
        "Multi-language system design",
      ],
      frameworkExperience:
        "NextJS with TypeScript provided a robust foundation for building a secure and scalable payment platform.",
      accessibilityLearnings:
        "Implemented WCAG guidelines to ensure the platform is accessible to all users.",
      impact:
        "Creating a more accessible and flexible payment solution for both merchants and customers.",
      screenshots: [
        { url: "/assets/misPay.png", caption: "MIS Pay Platform Interface" },
      ],
    },
    {
      id: 5,
      title: "Alkhair Foundation",
      slug: "alkhair-foundation",
      summary:
        "A charitable organization working towards a better future. Key initiatives include education for children, disaster relief, and orphan care.",
      imageUrl: "/assets/alkhiar-found.png",
      coreFunctionalities: [
        "Charitable organization management",
        "Education for children programs",
        "Disaster relief coordination",
        "Orphan care services",
        "Community outreach",
      ],
      role: "Frontend Developer",
      technologies: [
        "NextJS",
        "Tailwind CSS",
        "Shadcn",
        "i18Next",
        "TypeScript",
      ],
      category: "web",
      liveDemo: "https://alkhir-org.vercel.app/",
      sourceCode: "",
      purpose:
        "Created a digital platform for a charitable organization to showcase their initiatives and facilitate community engagement.",
      expectedOutcome:
        "A professional website that effectively communicates the organization's mission and enables better community outreach.",
      initialDesigns: ["/assets/alkhiar-found.png"],
      spotlightFeature: {
        title: "Charitable Impact Showcase",
        description:
          "Digital platform that highlights charitable work and makes it easy for supporters to learn about and contribute to various causes.",
      },
      technicalChallenges: [
        "Creating emotional impact through design",
        "Organizing complex charitable programs",
        "Implementing multi-language support",
        "Ensuring accessibility for all users",
      ],
      solutions: [
        "Developed compelling visual design with NextJS",
        "Structured content hierarchy effectively",
        "Implemented comprehensive i18Next integration",
        "Created accessible user interface with Tailwind CSS",
      ],
      currentStatus: {
        users: "Active charitable organization website",
        feedback: "Positive response from community and stakeholders",
      },
      lessonsLearned: [
        "Designing for social impact",
        "Content organization for non-profits",
        "Community-focused user experience",
        "Accessibility in charitable websites",
      ],
      frameworkExperience:
        "NextJS provided excellent performance for content-heavy charitable organization website.",
      accessibilityLearnings:
        "Ensured the platform is accessible to diverse community members with varying technical abilities.",
      impact:
        "Successfully created a digital presence that amplifies the organization's charitable impact and community reach.",
      screenshots: [
        {
          url: "/assets/alkhiar-found.png",
          caption: "Alkhair Foundation Website",
        },
      ],
    },
    {
      id: 6,
      title: "AWJ Legal Consultancy and Law Firm",
      slug: "awj-legal-consultancy-and-law-firm",
      summary:
        "A legal, financial, and administrative firm committed to protecting your rights and achieving justice.",
      imageUrl: "/assets/awj-legal.png",
      coreFunctionalities: [
        "Legal consultation services",
        "Financial advisory",
        "Administrative support",
        "Client case management",
        "Legal document processing",
      ],
      role: "Frontend Developer",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      category: "web",
      liveDemo: "https://awj-website.vercel.app/",
      sourceCode: "",
      purpose:
        "Developed a professional website for a legal firm to establish credibility and attract clients seeking legal services.",
      expectedOutcome:
        "A trustworthy and professional online presence that effectively communicates legal expertise and services.",
      initialDesigns: ["/assets/awj-legal.png"],
      spotlightFeature: {
        title: "Professional Legal Presence",
        description:
          "Sophisticated website design that builds trust and credibility while clearly presenting legal services and expertise.",
      },
      technicalChallenges: [
        "Creating professional appearance",
        "Organizing complex legal services",
        "Ensuring credibility through design",
        "Mobile responsiveness for professional use",
      ],
      solutions: [
        "Implemented clean, professional design with Bootstrap",
        "Structured legal services clearly",
        "Used appropriate color schemes and typography",
        "Ensured cross-device compatibility",
      ],
      currentStatus: {
        users: "Active legal firm website serving clients",
        feedback: "Professional appearance appreciated by legal industry peers",
      },
      lessonsLearned: [
        "Designing for professional services",
        "Building trust through web design",
        "Legal industry design standards",
        "Professional website architecture",
      ],
      frameworkExperience:
        "Bootstrap provided reliable framework for creating professional, responsive legal website.",
      accessibilityLearnings:
        "Focused on clear navigation and readability essential for legal information presentation.",
      impact:
        "Successfully established strong digital presence for legal firm, enhancing client trust and professional credibility.",
      screenshots: [
        {
          url: "/assets/awj-legal.png",
          caption: "AWJ Legal Consultancy Website",
        },
      ],
    },
    {
      id: 7,
      title: "Gulf Tadawul Transport",
      slug: "gulf-tadawul-transport",
      summary:
        "Comprehensive transport solutions to meet your business needs. Services include land, air, and sea freight, as well as customs clearance.",
      imageUrl: "/assets/gulf.png",
      coreFunctionalities: [
        "Land freight services",
        "Air freight coordination",
        "Sea freight management",
        "Customs clearance",
        "Logistics optimization",
      ],
      role: "Frontend Developer",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "web",
      liveDemo: "https://www.gulftadawultransport.com/",
      sourceCode: "",
      purpose:
        "Created a comprehensive website for a transport company to showcase their logistics services and attract business clients.",
      expectedOutcome:
        "A professional platform that effectively presents transport services and builds confidence in logistics capabilities.",
      initialDesigns: ["/assets/gulf.png"],
      spotlightFeature: {
        title: "Comprehensive Logistics Platform",
        description:
          "Professional website showcasing full-service transport and logistics capabilities across multiple transportation modes.",
      },
      technicalChallenges: [
        "Presenting complex logistics services",
        "Creating industry-appropriate design",
        "Organizing diverse service offerings",
        "Building business credibility",
      ],
      solutions: [
        "Developed clear service categorization",
        "Implemented professional industry design",
        "Created intuitive navigation structure",
        "Used appropriate business imagery and content",
      ],
      currentStatus: {
        users: "Active transport company website serving business clients",
        feedback: "Effective representation of logistics capabilities",
      },
      lessonsLearned: [
        "Designing for B2B logistics industry",
        "Presenting complex services clearly",
        "Building business credibility online",
        "Industry-specific web development",
      ],
      frameworkExperience:
        "Vanilla JavaScript and CSS provided solid foundation for business-focused transport website.",
      accessibilityLearnings:
        "Ensured clear presentation of complex logistics information for business decision-makers.",
      impact:
        "Successfully created professional digital presence that effectively communicates transport capabilities to business clients.",
      screenshots: [
        { url: "/assets/gulf.png", caption: "Gulf Tadawul Transport Website" },
      ],
    },
    {
      id: 8,
      title: "Tadamn Development Forum 2025",
      slug: "tadamn-development-forum-2025",
      summary:
        "A comprehensive Arabic RTL website for the Tadamn Development Forum 2025, featuring event information, speakers, agenda, and interactive engagement tools.",
      imageUrl: "/assets/tadamn.png",
      coreFunctionalities: [
        "Event information and overview",
        "Speakers directory and profiles",
        "Event agenda and schedule",
        "Google Forms integration for Q&A",
        "Downloadable event guide",
        "RTL (Right-to-Left) Arabic support",
        "Responsive mobile design",
        "Floating CTA button",
      ],
      role: "Frontend Developer",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "web",
      liveDemo: "https://marwanbz.github.io/tadamn/index.html#fromHistory",
      sourceCode: "",
      purpose:
        "Developed a modern, accessible website for the Tadamn Development Forum 2025 to showcase event information, facilitate participant engagement, and provide easy access to forum resources.",
      expectedOutcome:
        "A professional, user-friendly platform that effectively communicates forum details and enables seamless participant interaction with event content and resources.",
      initialDesigns: ["/assets/tadamn.png"],
      spotlightFeature: {
        title: "RTL Arabic Interface",
        description:
          "Fully responsive Arabic RTL website with elegant typography using Tajawal font, featuring intuitive navigation cards and seamless integration with Google Forms for interactive participant engagement.",
      },
      technicalChallenges: [
        "Implementing proper RTL (Right-to-Left) layout for Arabic content",
        "Ensuring cross-browser compatibility for RTL websites",
        "Creating responsive design for Arabic typography",
        "Integrating external services (Google Forms, Google Drive)",
        "Optimizing font loading for Arabic fonts",
      ],
      solutions: [
        "Used semantic HTML with dir='rtl' attribute",
        "Implemented CSS Grid and Flexbox for RTL layouts",
        "Integrated Google Fonts (Tajawal) for Arabic typography",
        "Created modular CSS architecture for maintainability",
        "Developed smooth animations and transitions",
        "Implemented floating CTA with delayed visibility",
      ],
      currentStatus: {
        users: "Live website serving forum participants and attendees",
        feedback: "Positive user experience with Arabic RTL interface and easy navigation",
      },
      lessonsLearned: [
        "RTL web development best practices",
        "Arabic typography and font optimization",
        "Building accessible multi-page websites with vanilla HTML/CSS/JS",
        "Integrating third-party services (Google Forms, Drive)",
        "Creating engaging user interfaces without frameworks",
      ],
      frameworkExperience:
        "Vanilla HTML, CSS, and JavaScript provided complete control over RTL implementation and Arabic typography, demonstrating the power of foundational web technologies.",
      accessibilityLearnings:
        "Ensured proper RTL support and Arabic language accessibility, making the forum information accessible to Arabic-speaking participants.",
      impact:
        "Successfully created a professional forum website that effectively communicates event information and facilitates participant engagement through modern web technologies.",
      screenshots: [
        {
          url: "/assets/tadamn.png",
          caption: "Tadamn Development Forum 2025 Homepage",
        },
      ],
    },
    {
      id: 9,
      title: "Tawreed Plus",
      slug: "tawreed-plus",
      summary:
        "B2B e-commerce supply chain platform with bilingual (AR/EN) support, product categories, cart, 'Tawreed Extra+' membership tier, and Google Maps integration.",
      imageUrl: "/assets/tawreedplus.png",
      coreFunctionalities: [
        "Bilingual (Arabic/English) product catalog with RTL support",
        "Product categories, search, and filtering",
        "Shopping cart and multi-step checkout",
        "Tawreed Extra+ membership tier with free delivery benefits",
        "Google Maps integration for delivery address selection",
        "Onboarding flow for new business accounts",
        "Invoice generation with React PDF",
        "OTP authentication with JWT via jose",
      ],
      role: "Frontend Developer",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS v4",
        "TanStack Query v5",
        "React Hook Form",
        "Zod",
        "next-intl v4",
        "Framer Motion",
        "Google Maps API",
        "Radix UI",
        "Axios",
        "next-themes",
        "React PDF",
      ],
      category: "web",
      liveDemo: "https://www.tawreedplus.com/en",
      sourceCode: "",
      purpose:
        "Built the frontend for a B2B marketplace connecting businesses with suppliers across Saudi Arabia, featuring full bilingual support and a premium membership tier.",
      expectedOutcome:
        "A performant, bilingual B2B platform that streamlines supply chain operations for Saudi businesses with an intuitive purchasing experience.",
      initialDesigns: ["/assets/tawreedplus.png"],
      spotlightFeature: {
        title: "Bilingual B2B Marketplace",
        description:
          "Full Arabic/English support with next-intl, RTL layout switching, and a dedicated 'Tawreed Extra+' membership tier offering unlimited free delivery and premium benefits.",
      },
      technicalChallenges: [
        "Implementing seamless RTL/LTR switching for Arabic and English",
        "Managing complex server state with TanStack Query across the catalog",
        "Building type-safe forms with React Hook Form and Zod validation",
        "Integrating Google Maps API for location-based delivery features",
        "Migrating to Tailwind CSS v4 syntax and new configuration model",
      ],
      solutions: [
        "Used next-intl for robust i18n routing and locale-aware layouts",
        "Leveraged TanStack Query for caching and background refetching",
        "Built reusable form components with Zod schema validation",
        "Integrated Google Maps JavaScript API for address selection",
        "Applied Framer Motion for smooth page transitions and animations",
      ],
      currentStatus: {
        users: "Live platform serving B2B customers across Saudi Arabia",
        feedback: "Positive reception for bilingual support and clean UI",
      },
      lessonsLearned: [
        "Deep experience with Next.js 15 App Router and server components",
        "Advanced i18n patterns with next-intl and RTL layout handling",
        "TanStack Query v5 patterns for complex server state",
        "Tailwind CSS v4 configuration and new utility patterns",
        "Building accessible bilingual e-commerce interfaces",
      ],
      frameworkExperience:
        "Next.js 15 with App Router enabled efficient server-side rendering and streaming for the product catalog, while TanStack Query managed client-side caching and mutations.",
      accessibilityLearnings:
        "Implemented full RTL support and bilingual accessibility, ensuring Arabic-speaking users receive a native experience with proper text direction and font rendering.",
      impact:
        "Delivered a production B2B marketplace that enables Saudi businesses to efficiently source supplies with a modern, accessible bilingual interface.",
      screenshots: [
        {
          url: "/assets/tawreedplus.png",
          caption: "Tawreed Plus Homepage — Extra+ membership banner",
        },
      ],
    },
    {
      id: 10,
      title: "Basma — Maintenance Management System",
      slug: "basma-maintenance-management-system",
      summary:
        "Full-stack maintenance request management system with an Express.js API, Next.js 15 admin dashboard, and Expo React Native mobile app for residents and technicians.",
      imageUrl: "/assets/basma.png",
      coreFunctionalities: [
        "Maintenance request creation and tracking",
        "Admin dashboard for request management",
        "Technician assignment and scheduling",
        "Image upload via AWS S3",
        "Push notifications via Firebase",
        "Role-based access control",
        "Expo mobile app for residents",
        "Swagger API documentation",
      ],
      role: "Full-Stack Developer",
      technologies: [
        "Express.js",
        "Prisma ORM",
        "PostgreSQL",
        "AWS S3",
        "Firebase Push Notifications",
        "Swagger",
        "Next.js 15",
        "Radix UI",
        "TanStack Query",
        "TanStack Table",
        "Expo",
        "React Native",
      ],
      category: "web",
      liveDemo: "https://basma-admin-dashboard.vercel.app/login",
      sourceCode: "",
      purpose:
        "Built a comprehensive three-layer system to digitize and streamline maintenance request workflows for residential properties, replacing manual paper-based processes.",
      expectedOutcome:
        "A unified platform where residents submit requests via mobile, admins manage workflows via dashboard, and technicians receive assignments — all in real time.",
      initialDesigns: ["/assets/basma.png"],
      spotlightFeature: {
        title: "Three-Layer Full-Stack Architecture",
        description:
          "A unified system spanning an Express.js REST API with Prisma and PostgreSQL, a Next.js 15 admin dashboard with TanStack Table, and an Expo React Native mobile app — all connected via Firebase push notifications and AWS S3 for media.",
      },
      technicalChallenges: [
        "Designing a normalized PostgreSQL schema for multi-role workflows",
        "Implementing secure file uploads to AWS S3 with presigned URLs",
        "Delivering real-time push notifications across iOS and Android via Firebase",
        "Building a data-dense admin table interface with TanStack Table",
        "Coordinating API contracts between three separate client surfaces",
      ],
      solutions: [
        "Used Prisma ORM for type-safe database access and migrations",
        "Implemented S3 presigned URL pattern for secure direct uploads",
        "Integrated Firebase Admin SDK for server-triggered push notifications",
        "Built composable TanStack Table columns with sorting and filtering",
        "Documented all endpoints with Swagger for cross-team alignment",
      ],
      currentStatus: {
        users: "Deployed admin dashboard serving property management staff",
        feedback: "Significantly reduced time to resolve maintenance requests",
      },
      lessonsLearned: [
        "Full-stack system design across API, web, and mobile surfaces",
        "PostgreSQL schema design for role-based multi-tenant workflows",
        "AWS S3 integration patterns for file management",
        "Firebase push notification delivery for mobile apps",
        "Building complex data tables with TanStack Table v8",
      ],
      frameworkExperience:
        "Express.js provided a lightweight, flexible API layer while Prisma enabled type-safe database operations. Next.js 15 App Router powered the admin dashboard with server components for fast initial loads.",
      accessibilityLearnings:
        "Used Radix UI primitives in the admin dashboard to ensure keyboard navigation and screen reader support for all management workflows.",
      impact:
        "Transformed a manual maintenance process into a fully digital workflow, reducing request resolution time and improving communication between residents, admins, and technicians.",
      screenshots: [
        {
          url: "/assets/basma.png",
          caption: "Basma Admin Dashboard — Maintenance Request List",
        },
      ],
    },
  ],
};

// Export specific sections for backward compatibility
export const profileData = {
  name: marwanData.name,
  title: marwanData.title,
  description: marwanData.description,
  imageUrl: marwanData.imageUrl,
  location: marwanData.location,
  availability: marwanData.availability,
  email: marwanData.email,
  cvUrl: marwanData.cvUrl,
  cvLink: marwanData.cvLink,
  githubUrl: marwanData.githubUrl,
  linkedinUrl: marwanData.linkedinUrl,
  socials: marwanData.socials,
  experiences: marwanData.experiences,
  skills: marwanData.skills,
};

export const projects = marwanData.projects;

// Default export for main data
export default marwanData;
