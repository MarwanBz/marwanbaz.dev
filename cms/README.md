# Strapi CMS

This directory contains the Strapi app for the site. The Next.js frontend stays at the repo root and reads published content from this CMS over the Strapi REST API.

## Local development

From the repo root:

```bash
npm run cms:dev
```

Or from this directory:

```bash
npm run develop
```

The local admin panel runs at `http://localhost:1337/admin`.

## Content model

The CMS schema is committed in code:

- `src/api/post`
- `src/api/project`
- `src/components/shared`

Shared components are used for tags, bullets, screenshots, spotlight features, and project status so the frontend receives structured content instead of JSON blobs.

## Strapi Cloud

When connecting this repo in Strapi Cloud:

- repository: `MarwanBz/marwanbaz.dev`
- branch during setup: `codex/try-b-strapi-cms`
- project subdirectory location: `cms`

After the CMS is validated and merged, switch the Strapi Cloud tracked branch back to `main`.

## Seeding

The seed script lives at the repo root because it imports the site's existing local content:

```bash
npm run seed:strapi
```

Run it only after the Strapi Cloud app is deployed and the frontend `STRAPI_URL` / `STRAPI_API_TOKEN` variables are set.
