import path from "node:path";

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { buildConfig } from "payload";

import { Posts } from "./src/collections/Posts.ts";
import { Projects } from "./src/collections/Projects.ts";
import { Users } from "./src/collections/Users.ts";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URI;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.join(process.cwd(), "src", "app", "(payload)"),
    },
  },
  collections: [Posts, Projects, Users],
  db: vercelPostgresAdapter({
    pool: {
      connectionString,
    },
  }),
  graphQL: {
    disable: true,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  telemetry: false,
});
