const CMS_TAGS = {
  home: "cms-home",
  sitemap: "cms-sitemap",
  posts: "cms-posts",
  projects: "cms-projects",
  post: (slug: string) => `cms-post-${slug}`,
  project: (slug: string) => `cms-project-${slug}`,
} as const;

export { CMS_TAGS };
