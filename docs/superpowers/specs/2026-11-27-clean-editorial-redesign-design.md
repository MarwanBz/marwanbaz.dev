# marwanbaz.dev — Clean Editorial Redesign (2026-11-27)

Status: Preview deployed for review — `redesign/clean-editorial` branch.
Direction approved by Marwan: "warm editorial" (leerob.com-inspired) after a
moodboard review against rauno.me, paco.me, leerob.com, brianlovin.com.

## Goal

Cut the visual noise. The old home page stacked an intro loader, rotating text
loops, background beams, a blog marquee, and eight card components — six
things competing for attention. The redesign is typography-first: content as
quiet lists, one column, one accent, zero intro animation.

## Non-goals

- No hosting change. Vercel stays (Cloudflare is DNS-only for the domain);
  Payload CMS, collections, admin, and data fetching are untouched.
- No content rewrites (bio copy lightly edited to fit the new layout).

## Decisions

| Topic | Decision |
| --- | --- |
| Direction | Warm editorial — quiet lists + short intro + thumbnails (not the ultra-minimal "quiet index" and not a card grid) |
| Typography | Geist Sans + Geist Mono via `next/font/google`, replacing the Arial fallback |
| Palette | Existing zinc tokens, light + dark via next-themes; single blue accent for interactive text |
| Motion | framer-motion page transitions and loaders removed. Only a CSS IntersectionObserver scroll-reveal remains, gated by `prefers-reduced-motion` |
| Cal.com booking | Kept — footer "Book a call" opens the existing ChatModal |
| Collaboration form | Kept — About page "Let's collaborate" opens the existing CollaborationModal |
| CV / socials | Footer quiet links (GitHub, LinkedIn, Email, CV) |

## Page structure (all `max-w-2xl`, single column)

- **Home**: photo + name + 2-line bio → featured work rows (thumb, title,
  summary, 3 techs) → writing rows (title + date) → footer links.
- **Work**: title + intro, All/Web/Mobile filter pills, same row list.
- **Writing**: title + intro, hairline post rows with dates.
- **About**: larger photo + editorial bio → experience timeline (role ·
  company, period) → stack line → collaborate/view-work buttons.
- **Header**: "Marwan Baz" wordmark, Work/Writing/About, theme toggle.
- **Footer**: copyright + GitHub/LinkedIn/Email/CV/Book a call.

## Verification

- `tsc --noEmit` clean; `next build` passes (home: 110 kB first-load JS).
- agent-browser screenshots: home light/dark/mobile(390px), work, blog, about —
  all render as designed; no console errors beyond a local-only Analytics note.
- Vercel preview (Standard Protection — login required):
  https://marwanbaz-ob6t6bagb-marwanbzs-projects.vercel.app

## Remaining work (after preview approval)

1. Redesign `/work/[slug]` and `/blog/[slug]` detail pages in the same style.
2. Delete unused components (initial-loader, matrix-rain, cursor-splash,
   text-loop, blog-marque, hero-background, card components, old navbar/hero,
   filter-bar, social-links, design-gallery…) and drop `framer-motion`,
   `react-spring`, and now-unused Radix deps from package.json.
3. Update site metadata descriptions to match new copy.
4. Ops (outside repo): apex domain `marwanbaz.dev` has an expired Vercel edge
   certificate — re-verify the domain in the Vercel dashboard to reissue.
