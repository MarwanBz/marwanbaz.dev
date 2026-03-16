export interface CmsReadingTime {
  text: string;
  minutes: number;
  words: number;
}

export interface CmsPost {
  id: string;
  documentId?: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  coverImage?: string | null;
  bodyMdx: string;
  readingTime: CmsReadingTime;
  url: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
}

export interface CmsSpotlightFeature {
  title: string;
  description: string;
}

export interface CmsCurrentStatus {
  users: string;
  feedback: string;
}

export interface CmsScreenshot {
  url: string;
  caption: string;
}

export interface CmsProject {
  id: string;
  documentId?: string;
  slug: string;
  title: string;
  isFeatured?: boolean;
  summary: string;
  imageUrl: string;
  coreFunctionalities: string[];
  role: string;
  technologies: string[];
  category: "web" | "mobile";
  liveDemo?: string | null;
  sourceCode?: string | null;
  purpose: string;
  expectedOutcome: string;
  initialDesigns: string[];
  spotlightFeature: CmsSpotlightFeature;
  technicalChallenges: string[];
  solutions: string[];
  currentStatus?: CmsCurrentStatus | null;
  lessonsLearned: string[];
  frameworkExperience?: string | null;
  accessibilityLearnings?: string | null;
  impact: string;
  screenshots: CmsScreenshot[];
  publishedAt?: string | null;
  updatedAt?: string | null;
}
