# FastAdmission website: how it is put together

A Next.js (App Router) site for one organisation ("tenant") of the counsellor platform. It owns the design and SEO;
the **platform owns the data**. Nothing about colleges, posts, leads or students is stored here.

## Where things live
| Folder | What it holds |
|---|---|
| `app/` | Routes. Marketing pages (`page.tsx`, `courses`, `admission/[city]`, `blogs`), `colleges`, `college-predictor`, `student/*`, `privacy`, `sitemap.ts`, `robots.ts`, `error.tsx`, `not-found.tsx` |
| `app/sections/` | Home page sections only |
| `app/data/` | Static content that really is ours: `cities`, `courses`, `faqs`, local blog fallback `posts` |
| `components/` | Shared UI: `Navbar`, `Footer`, `LeadForm`, `SiteSdk`, `JsonLd`, ... |
| `components/student/` | Student register/login shell and the dashboard panels (`dash/*`) |
| `lib/` | Everything that talks to the platform or tracks visitors (below) |

## The one rule: all platform calls go through `lib/`
- `lib/site.ts`: constants (`SITE`, `PLATFORM.apiUrl`, tenant slug). The only place a slug or API address is written.
- `lib/platform.ts`: `platformFetch("/sites/{slug}/...")` for cached public reads (6 s timeout, `null` on failure); `platformGet` for blog content.
- `lib/siteConfig.ts`: owner-controlled home text and section switches ("Website control" in the admin).
- `lib/colleges.ts`: college list and detail pages (admin decides which colleges show, and their order).
- `lib/content.ts`: blog posts, page SEO, analytics ids.
- `lib/student.ts` (+ `studentUi.ts`): student register, login, dashboard data and uploads. Token is kept in `localStorage`.
- `lib/leads.ts`, `lib/attribution.ts`, `lib/tracker.ts`, `lib/analytics.ts`: lead forms, first-touch source, visits, conversion events.

Pages never call `fetch` for platform data themselves. A page that cannot reach the platform shows a friendly empty state or falls back to local content.

## Caching and failure
- Public reads use ISR (`revalidate` 60 s, 300 s for colleges). Changes made in the admin appear within a minute or two with no redeploy.
- `platformFetch` never throws. The site keeps working when the API is down; lead forms fall back to WhatsApp.

## Tracking
One script, `components/SiteSdk.tsx`, loads the platform's `site-sdk.js`: visits, source, WhatsApp/call taps, forms marked `data-fa-lead`,
and the popup (shaped in the admin: Lead popups). Do **not** add a second tracker or popup script; it would double-count.

## Private pages
`/student/*` (except `/student/register`) is `noindex`. `robots.ts` also disallows `/admin`, `/api`, `/student/login`.

## Adding another business website
1. Copy this repo. Change `lib/site.ts` (`SITE`, `PLATFORM.tenantSlug`) and the home/section content.
2. In the platform: create the organisation, map the new domain as `public_site` (Allowed domains), switch the modules on.
3. Colleges, blog, popup, predictor and student portal then work with no code change.

## Checks before a release
`npx tsc --noEmit` and `npx next build` must pass. There is no test suite yet: the next sensible step is Playwright smoke tests for
`/`, `/colleges`, `/college-predictor`, `/student/register`, `/student/login`.
