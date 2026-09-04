# Payload CMS (embedded)

Payload 3 runs inside this Next.js app — no separate CMS process or hosting.

## Admin

- Panel links: `https://marwanbaz.dev/admin` (production) or `http://localhost:3000/admin` locally.
- First visit: create the first admin account (this claims `/admin`; do it once).
- Content managed there: blog posts (`posts`) and projects (`projects`).

## Local Workflow

```bash
npm install
vercel env pull .env.vercel.local --environment=development  # gets DATABASE_URL + PAYLOAD_SECRET
npm run dev          # frontend + admin at http://localhost:3000
```

Payload dev mode pushes schema changes automatically to the local/dev database.

## Content Model

### Posts (`/api/posts`, collection `posts`)
- `title` text, required
- `slug` text, unique, required — URL segment for `/blog/<slug>`
- `date` date, required
- `summary` textarea, required
- `coverImage` text — site-relative path like `/blog/cover.jpg` or a full URL
- `bodyMdx` textarea, required — raw MDX rendered with next-mdx-remote
- `tags` array of `{ value }`
- Draft versions enabled

### Projects (`/api/projects`, collection `projects`)
- `title`, `slug` (unique), `isFeatured` (checkbox), `summary`, `image` (text, required)
- `role`, `category` (web | mobile), `liveDemo`, `sourceCode`
- `purpose`, `expectedOutcome`, `frameworkExperience`, `accessibilityLearnings`, `impact`
- Arrays of `{ value }`: `coreFunctionalities`, `technologies`, `technicalChallenges`, `solutions`, `lessonsLearned`
- Arrays: `initialDesigns [{url}]`, `screenshots [{url, caption}]`
- Groups: `spotlightFeature {title, description}`, `currentStatus {users, feedback}`
- Draft versions enabled

## Seed

Content sources of truth for seeding: `src/data/index.ts` (projects) and `content/blog/*.mdx` (posts).

```bash
npm run seed:payload
```

Idempotent by slug (creates or updates). Runs against whatever database the loaded
env points at — local dev DB, or production via `vercel env run`. Needs
`DATABASE_URL` (or `POSTGRES_URL`/`DATABASE_URI`) and `PAYLOAD_SECRET`.

## Revalidation

Collection hooks (`src/collections/hooks/revalidate.ts`) purge the Next.js cache
(`revalidatePath`/`revalidateTag`) on every content change. No webhooks, no
secret headers — the CMS and the frontend are the same process.

## Disaster insurance

`src/lib/cms/fallback-content.ts` serves the same local sources if the database
is ever unreachable, so `/work` and `/blog` never render error screens.

## Environment

- `DATABASE_URL` — Neon/Vercel Postgres, auto-injected by the integration
- `PAYLOAD_SECRET` — set on Production, Preview, Development in Vercel
- `NEXT_PUBLIC_SITE_URL` — canonical site URL

Note: set the Vercel project's Node version to 24.x (Dashboard → Settings →
General → Node.js Version) so git-triggered builds pass; `vercel deploy
--prebuilt` works regardless.
