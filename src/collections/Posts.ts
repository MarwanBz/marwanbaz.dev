import type { CollectionConfig } from "payload";

import { revalidateCms } from "./hooks/revalidate.ts";
import { CMS_TAGS } from "../lib/cms/tags.ts";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "_status"],
  },
  versions: {
    drafts: true,
  },
  defaultSort: "-date",
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
          "URL segment for /blog/<slug>. Lowercase letters, numbers and dashes only.",
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "yyyy-MM-dd",
        },
      },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "coverImage",
      type: "text",
      admin: {
        description:
          "Site-relative path like /blog/cover.jpg or a full URL. Files in public/ are served as-is.",
      },
    },
    {
      name: "bodyMdx",
      type: "textarea",
      required: true,
      admin: {
        description:
          "Raw MDX rendered with next-mdx-remote. Supports GFM, code blocks, <MatrixRain /> and standard images.",
      },
    },
    {
      name: "tags",
      type: "array",
      labels: {
        singular: "Tag",
        plural: "Tags",
      },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCms(doc, ["/blog"], [CMS_TAGS.posts]);
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCms(doc, ["/blog"], [CMS_TAGS.posts]);
        return doc;
      },
    ],
  },
};

