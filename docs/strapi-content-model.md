# Strapi Setup

## Important
- This repository (`marwanbaz.dev`) is the frontend app and does **not** include a Strapi server.
- `npm run develop` must be run in your separate Strapi codebase (the repo connected to Strapi Cloud), not here.
- In Strapi Cloud, Content-Type Builder is read-only. Edit content types locally in development mode, commit, and push.

## Environment
- Create a Strapi Cloud project with Draft & Publish enabled.
- Add a read-only API token for the frontend and store it as `STRAPI_API_TOKEN`.
- Set the frontend env vars from `.env.example`.

## Collection Types

### `Post`
- `title`: Text, required
- `slug`: UID or unique text, required
- `date`: Date, required
- `summary`: Text, required
- `coverImage`: Text
  Use either a site-relative asset path like `/blog/cover.jpg`, a Strapi upload path like `/uploads/cover.jpg`, or a full URL.
- `bodyMdx`: Long text, required
- `tags`: Repeatable component `shared.tag`

### `Project`
- `title`: Text, required
- `slug`: UID or unique text, required
- `isFeatured`: Boolean
- `summary`: Text, required
- `image`: Text, required
- `role`: Text, required
- `category`: Enumeration with `web` and `mobile`
- `liveDemo`: Text
- `sourceCode`: Text
- `purpose`: Rich text or long text, required
- `expectedOutcome`: Rich text or long text, required
- `frameworkExperience`: Rich text or long text
- `accessibilityLearnings`: Rich text or long text
- `impact`: Rich text or long text, required
- `coreFunctionalities`: Repeatable component `shared.bullet`
- `technologies`: Repeatable component `shared.bullet`
- `technicalChallenges`: Repeatable component `shared.bullet`
- `solutions`: Repeatable component `shared.bullet`
- `lessonsLearned`: Repeatable component `shared.bullet`
- `initialDesigns`: Repeatable component `shared.asset`
- `spotlightFeature`: Single component `shared.spotlight-feature`
- `currentStatus`: Single component `shared.current-status`
- `screenshots`: Repeatable component `shared.screenshot`

## Components

### `shared.tag`
- `value`: Text, required

### `shared.bullet`
- `value`: Text, required

### `shared.asset`
- `url`: Text, required

### `shared.screenshot`
- `url`: Text, required
- `caption`: Text, required

### `shared.spotlight-feature`
- `title`: Text, required
- `description`: Rich text or long text, required

### `shared.current-status`
- `users`: Text, required
- `feedback`: Rich text or long text, required

## Seed
- After creating the content model, run `npm run seed:strapi`.
- The seed script imports the current local MDX blog content from `content/blog` and the current project data from `src/data/index.ts`.
- The script is idempotent by `slug`: existing entries are updated, new entries are created.

## Webhooks
- Add a Strapi webhook that sends `POST` requests to `https://your-site.example/api/revalidate`.
- Recommended events: `entry.publish`, `entry.unpublish`, and `entry.update`.
- Add a custom header named `x-revalidate-secret` with the same value as `STRAPI_WEBHOOK_SECRET`.

## Frontend Behavior
- `marwanbaz.dev/blog` and `marwanbaz.dev/work` now read from Strapi at runtime.
- `/api/revalidate` clears the homepage, blog, work, and item-level caches.
- New slugs do not require a frontend rebuild as long as the Strapi entry is published.
