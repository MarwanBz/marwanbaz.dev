import "server-only";

import readingTime from "reading-time";

import { marwanData } from "@/data";
import type { Project as LocalProject } from "@/data";

import type { CmsPost, CmsProject, CmsReadingTime } from "./types";

function toCmsReadingTime(bodyMdx: string): CmsReadingTime {
  const raw = readingTime(bodyMdx);
  return {
    text: raw.text,
    minutes: Math.max(1, Math.ceil(raw.minutes)),
    words: raw.words,
  };
}

const LOCAL_POSTS: Array<Omit<CmsPost, "id" | "readingTime" | "url">> = [
  {
    slug: "hello-world",
    title: "Hello World My First Blog Post",
    date: "2026-03-05",
    summary:
      "Hey there and welcome to my space, my blog :)! I am Marwan, a web dev and techie who loves to work with computers and software.",
    tags: ["intro", "tech-journey"],
    coverImage: null,
    bodyMdx: [
      "# Hello World 👋",
      "",
      "I am talking to you from the year 2026 where LLMs and agents are running everything on the planet, and AI slop everywhere from our code as software engineers to our virtual life on the internet so that resulted in virtual fake human interactions everywhere and it's just like what social media did!",
      "",
      "so what to expect from this blog? ",
      "a human being learning by doing, building, and making tons of mistakes along the way.    ",
      "",
      "Hey there and welcome to my space, my blog :)!",
      "I am Marwan, a web dev and techie who loves to work with computers and software.",
      "",
      "",
      "A little history about me:",
      'It all started back in maybe 2006 or 2005 when I first came across the "matrix" <MatrixRain /> (computers).',
      "",
      "And I was watching my uncle playing some games Beach Head game which really stuck in my memory from that time after more than 20 years :D!",
      "",
      "![Beach Head 2002 Game](/blog/beach-head.jpg)",
      "",
      "Across the years I forgot about the matrix and got busy trying to be a good child, doing things like being good at school, trying to be polite, etc.",
      "",
      'After that, I got into the matrix again in high school and tried to "figure out my passion as they say"',
      "",
      "Around 2015 to 2018 I was into mobile phone firmware. Playing with Samsung OS, downloading it, installing it, and also custom Android versions and all that fun stuff!",
      "",
      "After graduating from high school, I decided to study IT.",
      "After completing university, I worked on a lot of things from networking (MikroTik etc.) to software repairing and also IT support.",
      " Here we are today, proud of where I got myself and I'm still working in tech as a software engineer. With all the changes that are happening right now in tech, and how we are being replaced by agents :), I still don't know the future. But I think I still see myself in tech for the upcoming years Inshallah, and the journey has just started and there is more yet to come and to build! ",
      "",
      "Happy not coding, but keep building and learning :)",
    ].join("\n"),
    publishedAt: null,
    updatedAt: null,
  },
];

function toCmsProject(project: LocalProject): CmsProject {
  const currentStatus = project.currentStatus;
  const hasCurrentStatus = Boolean(currentStatus?.users || currentStatus?.feedback);

  return {
    id: String(project.id),
    slug: project.slug,
    title: project.title,
    isFeatured: Boolean(project.isFeatured),
    summary: project.summary,
    imageUrl: project.imageUrl,
    coreFunctionalities: project.coreFunctionalities ?? [],
    role: project.role,
    technologies: project.technologies ?? [],
    category: project.category === "mobile" ? "mobile" : "web",
    liveDemo: project.liveDemo || null,
    sourceCode: project.sourceCode || null,
    purpose: project.purpose,
    expectedOutcome: project.expectedOutcome,
    initialDesigns: project.initialDesigns ?? [],
    spotlightFeature: {
      title: project.spotlightFeature.title,
      description: project.spotlightFeature.description,
    },
    technicalChallenges: project.technicalChallenges ?? [],
    solutions: project.solutions ?? [],
    currentStatus: hasCurrentStatus
      ? { users: currentStatus.users, feedback: currentStatus.feedback }
      : null,
    lessonsLearned: project.lessonsLearned ?? [],
    frameworkExperience: project.frameworkExperience || null,
    accessibilityLearnings: project.accessibilityLearnings || null,
    impact: project.impact,
    screenshots: project.screenshots ?? [],
    publishedAt: null,
    updatedAt: null,
  };
}

export function getFallbackPosts(): CmsPost[] {
  return [...LOCAL_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      ...post,
      id: post.slug,
      readingTime: toCmsReadingTime(post.bodyMdx),
      url: `/blog/${post.slug}`,
    }));
}

export function getFallbackPostBySlug(slug: string): CmsPost | null {
  return getFallbackPosts().find((post) => post.slug === slug) ?? null;
}

export function getFallbackProjectBySlug(slug: string): CmsProject | null {
  const project = marwanData.projects.find((item) => item.slug === slug);
  return project ? toCmsProject(project) : null;
}

export function getFallbackProjects(): CmsProject[] {
  return [...marwanData.projects]
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(toCmsProject);
}

export function getFallbackFeaturedProjects(limit = 6): CmsProject[] {
  return getFallbackProjects()
    .filter((project) => project.isFeatured)
    .slice(0, limit);
}
