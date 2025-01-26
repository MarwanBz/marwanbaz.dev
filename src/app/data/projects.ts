export const projects = [
  {
    id: 1,
    title: "Leapat Web App",
    summary: "Youth-led tech initiative aims to create digital transformation in culture, art, education, economy, and more.",
    imageUrl: "/assets/leapat.png",
    coreFunctionalities: [
      "Digital transformation platform",
      "Cultural and educational content",
      "Community engagement features",
      "Multi-language support",
      "Responsive design"
    ],
    role: "Full-stack Developer",
    technologies: ["NextJS", "Tailwind CSS", "Supabase"],
    category: "web",
    liveDemo: "https://leapat.org",
    sourceCode: "https://github.com/leapat-mukalla/leapat/",
    purpose: "Created to drive digital transformation in Yemen's cultural and educational landscape, providing a platform for youth engagement and community development.",
    expectedOutcome: "A comprehensive platform that bridges traditional culture with modern technology, making educational and cultural content more accessible to youth.",
    initialDesigns: ["/assets/leapat.png"],
    spotlightFeature: {
      title: "Cultural Digital Transformation",
      description: "Innovative platform that seamlessly integrates cultural preservation with modern technology, creating an engaging space for youth to connect with their heritage while embracing digital innovation."
    },
    technicalChallenges: [
      "Implementing efficient content delivery",
      "Building a scalable architecture",
      "Ensuring cultural sensitivity in design",
      "Optimizing for low-bandwidth conditions"
    ],
    solutions: [
      "Utilized Supabase for robust backend operations",
      "Implemented responsive design principles",
      "Created optimized content delivery system",
      "Developed user-friendly interface with Tailwind CSS"
    ],
    currentStatus: {
      users: "Actively serving the youth community in Yemen",
      feedback: "Positive response from users and cultural organizations regarding the platform's impact on digital transformation"
    },
    lessonsLearned: [
      "Importance of cultural context in tech solutions",
      "Value of community-driven development",
      "Balancing tradition with innovation",
      "Optimization for local infrastructure conditions"
    ],
    frameworkExperience: "NextJS provided an excellent foundation for building a fast, SEO-friendly platform with great developer experience.",
    accessibilityLearnings: "Implemented inclusive design practices to ensure content accessibility across different user groups.",
    impact: "Successfully bridging the gap between traditional culture and digital innovation, creating new opportunities for youth engagement and education.",
    screenshots: [
      { url: "/assets/leapat.png", caption: "Leapat Platform Homepage" }
    ]
  },
  {
    id: 2,
    title: "Deemat Mobile App",
    summary: "Mobile application intended for children and parents, offering audio stories and visual stories.",
    imageUrl: "/assets/deemat1.jpg",
    coreFunctionalities: [
      "Audio story playback",
      "Visual story presentation",
      "Parent-child interaction features",
      "Multi-language support",
      "Offline content access"
    ],
    role: "Full-stack Mobile Developer",
    technologies: ["NextJS", "NextUI", "React Native", "Expo", "i18Next", "NodeJS", "ExpressJS", "PrismaORM", "PostgreSQL"],
    category: "mobile",
    liveDemo: "https://apps.apple.com/in/app/deemat-%D8%AF%D9%8A%D9%85%D8%A7%D8%AA/id6467549633",
    sourceCode: "",
    purpose: "Developed to provide children and parents with an engaging platform for storytelling and learning through interactive audio and visual content.",
    expectedOutcome: "An intuitive mobile application that makes storytelling more accessible and engaging for children while providing parents with tools to monitor and participate in their children's learning journey.",
    initialDesigns: ["/assets/deemat1.jpg"],
    spotlightFeature: {
      title: "Interactive Storytelling",
      description: "Combines audio and visual elements to create an immersive storytelling experience, making learning engaging and fun for children."
    },
    technicalChallenges: [
      "Implementing smooth audio playback",
      "Managing offline content storage",
      "Ensuring cross-platform compatibility",
      "Optimizing app performance"
    ],
    solutions: [
      "Built robust backend with NodeJS and ExpressJS",
      "Implemented efficient data management with PrismaORM",
      "Created seamless mobile experience with React Native",
      "Developed multilingual support using i18Next"
    ],
    currentStatus: {
      users: "Available on App Store with growing user base",
      feedback: "Parents appreciate the educational value and engaging content format"
    },
    lessonsLearned: [
      "Mobile-first design principles",
      "Audio content optimization",
      "Cross-platform development strategies",
      "User experience for children"
    ],
    frameworkExperience: "React Native and Expo provided excellent tools for building a cross-platform mobile application with native performance.",
    accessibilityLearnings: "Focused on creating child-friendly interfaces and ensuring content is accessible to different age groups.",
    impact: "Successfully created an educational platform that makes learning enjoyable for children through interactive storytelling.",
    screenshots: [
      { url: "/assets/deemat1.jpg", caption: "Deemat App Interface" }
    ]
  },
  {
    id: 3,
    title: "MIS Pay Web App",
    summary: "A Website showcasing MISpay's \"Shop Now, Pay Later\" service, featured stores, and merchant solutions.",
    imageUrl: "/assets/misPay.png",
    coreFunctionalities: [
      "Shop Now, Pay Later service",
      "Merchant integration",
      "Store directory",
      "Payment processing",
      "User dashboard"
    ],
    role: "Frontend Developer",
    technologies: ["NextJS", "Tailwind CSS", "Shadcn", "i18Next", "TypeScript"],
    category: "web",
    liveDemo: "",
    sourceCode: "",
    purpose: "Created to provide a modern, user-friendly platform for MISpay's payment solutions, connecting merchants with customers through flexible payment options.",
    expectedOutcome: "A robust web application that streamlines the shopping experience while providing merchants with powerful tools to manage their payment solutions.",
    initialDesigns: ["/assets/misPay.png"],
    spotlightFeature: {
      title: "Flexible Payment Solutions",
      description: "Innovative payment system that allows customers to split their purchases into manageable installments while providing merchants with secure payment processing."
    },
    technicalChallenges: [
      "Implementing secure payment processing",
      "Creating intuitive merchant interfaces",
      "Managing complex state",
      "Ensuring payment compliance"
    ],
    solutions: [
      "Utilized TypeScript for type-safe development",
      "Implemented responsive UI with Tailwind CSS",
      "Created reusable components with Shadcn",
      "Developed multilingual support with i18Next"
    ],
    currentStatus: {
      users: "In development phase",
      feedback: "Positive response from initial merchant testing"
    },
    lessonsLearned: [
      "Payment system integration best practices",
      "TypeScript implementation strategies",
      "Component library development",
      "Multi-language system design"
    ],
    frameworkExperience: "NextJS with TypeScript provided a robust foundation for building a secure and scalable payment platform.",
    accessibilityLearnings: "Implemented WCAG guidelines to ensure the platform is accessible to all users.",
    impact: "Creating a more accessible and flexible payment solution for both merchants and customers.",
    screenshots: [
      { url: "/assets/misPay.png", caption: "MIS Pay Platform Interface" }
    ]
  }
];
