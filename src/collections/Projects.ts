import type { CollectionConfig } from "payload";

import { revalidateCms } from "./hooks/revalidate.ts";
import { CMS_TAGS } from "../lib/cms/tags.ts";

const bulletValue = {
  name: "value",
  type: "text" as const,
  required: true,
};

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "isFeatured", "_status"],
  },
  versions: {
    drafts: true,
  },
  defaultSort: "title",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "URL segment for /work/<slug>. Lowercase letters, numbers and dashes only.",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      label: "Featured on homepage",
      defaultValue: false,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "text",
      required: true,
      admin: {
        description:
          "Site-relative path like /assets/app.png or a full URL. Files in public/ are served as-is.",
      },
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: ["web", "mobile"],
      defaultValue: "web",
    },
    {
      name: "liveDemo",
      type: "text",
    },
    {
      name: "sourceCode",
      type: "text",
    },
    {
      name: "purpose",
      type: "textarea",
      required: true,
    },
    {
      name: "expectedOutcome",
      type: "textarea",
      required: true,
    },
    {
      name: "frameworkExperience",
      type: "textarea",
    },
    {
      name: "accessibilityLearnings",
      type: "textarea",
    },
    {
      name: "impact",
      type: "textarea",
      required: true,
    },
    {
      name: "coreFunctionalities",
      type: "array",
      fields: [bulletValue],
    },
    {
      name: "technologies",
      type: "array",
      fields: [bulletValue],
    },
    {
      name: "technicalChallenges",
      type: "array",
      fields: [bulletValue],
    },
    {
      name: "solutions",
      type: "array",
      fields: [bulletValue],
    },
    {
      name: "lessonsLearned",
      type: "array",
      fields: [bulletValue],
    },
    {
      name: "initialDesigns",
      type: "array",
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "spotlightFeature",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "currentStatus",
      type: "group",
      fields: [
        {
          name: "users",
          type: "text",
        },
        {
          name: "feedback",
          type: "textarea",
        },
      ],
    },
    {
      name: "screenshots",
      type: "array",
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCms(doc, ["/work"], [CMS_TAGS.projects]);
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCms(doc, ["/work"], [CMS_TAGS.projects]);
        return doc;
      },
    ],
  },
};
