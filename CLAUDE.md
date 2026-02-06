# CLAUDE.md

This is the guide for Claude Code when working on this project.

## Project Overview

Personal portfolio website for Mario Bulic — a **Next.js 16 + Payload CMS 3 monolith**. Payload CMS lives inside the Next.js `/app` directory alongside the frontend. The site includes a portfolio of projects, stories/blog, a multi-step contact form, and a CMS admin panel.

**Live URL:** https://mariobulic.com

## Tech Stack

- **Framework:** Next.js 16.1.x with Turbopack
- **CMS:** Payload CMS 3.75.x (installed in `/app`, NOT headless — monolith)
- **Language:** TypeScript 5.7, strict mode
- **React:** 19.x with Server Components
- **Styling:** CSS Modules (no Tailwind) + CSS custom properties
- **Database:** PostgreSQL via Supabase (`@payloadcms/db-postgres`)
- **Media:** Cloudinary via `payload-cloudinary` plugin
- **Email:** Resend via `@payloadcms/email-resend`
- **Analytics:** PostHog (`posthog-js`)
- **Forms:** React Hook Form
- **Animation:** Motion (formerly Framer Motion) — `motion/react`
- **Icons:** Phosphor Icons (`@phosphor-icons/react`)
- **Package Manager:** pnpm (>=9)
- **Node:** ^18.20.2 || >=20.9.0

## Project Structure

```
src/
├── app/
│   ├── (frontend)/           # Public website
│   │   ├── layout.tsx        # Root layout with providers, metadata, fonts
│   │   ├── page.tsx          # Homepage (hero, tech tags, projects)
│   │   ├── styles.css        # Global styles + CSS variables + @font-face
│   │   ├── error.tsx         # Error boundary
│   │   ├── loading.tsx       # Loading state (pure CSS spinner)
│   │   ├── not-found.tsx     # 404 page
│   │   ├── context/          # React Context (MobileMenu)
│   │   ├── components/       # All frontend components
│   │   │   ├── navigation/   # Navigation, MobileNav, DesktopNav, MobileButton
│   │   │   ├── form-elements/# QuoteForm (multi-step contact form)
│   │   │   ├── HeroSection, Card, Projects, TechTags, ScrollArrow,
│   │   │   │   Footer, PageTransition, RichTextRenderer, ImageWrapper,
│   │   │   │   Label, DotAccent
│   │   ├── projects/         # /projects and /projects/[slug]
│   │   ├── stories/          # /stories and /stories/[slug]
│   │   ├── contact/          # /contact (QuoteForm)
│   │   └── thank-you/        # /thank-you
│   │
│   ├── (payload)/            # Payload CMS admin & API
│   │   ├── admin/            # Admin panel at /admin
│   │   └── api/              # REST API, GraphQL, send-email endpoint
│   │
│   ├── lib/
│   │   ├── providers.tsx     # PostHog provider + page tracking
│   │   ├── utils.tsx         # Date/image utilities
│   │   └── strings.tsx       # UI string constants
│   │
│   ├── robots.ts             # SEO robots.txt generation
│   └── sitemap.ts            # Dynamic sitemap from Payload collections
│
├── collections/              # Payload CMS collection configs
│   ├── Users.ts, Media.ts, Projects.ts, Stories.ts
│
├── globals/
│   └── Homepage.ts           # Homepage global config (title, description, techStack)
│
├── payload.config.ts         # Payload CMS configuration
└── payload-types.ts          # Auto-generated types (do NOT edit manually)
```

## Commands

```bash
pnpm dev              # Start dev server (Turbopack)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # ESLint
pnpm devsafe          # Clean .next cache then start dev
pnpm generate:types   # Regenerate Payload types after collection changes
pnpm generate:importmap # Regenerate Payload admin import map
```

## Environment Variables

Required in `.env` (see `.env.example`):

```
DATABASE_URI              # PostgreSQL connection string (Supabase)
PAYLOAD_SECRET            # Payload CMS secret key
NEXT_PUBLIC_URL           # Public site URL (https://mariobulic.com)
RESEND_API_KEY            # Resend email API key
CLOUDINARY_CLOUD_NAME     # Cloudinary cloud name
CLOUDINARY_API_KEY        # Cloudinary API key
CLOUDINARY_API_SECRET     # Cloudinary API secret
NEXT_PUBLIC_POSTHOG_KEY   # PostHog project key
NEXT_PUBLIC_POSTHOG_HOST  # PostHog ingest host (https://eu.i.posthog.com)
```

## Code Style & Conventions

### Formatting (Prettier)
- Single quotes, no semicolons, trailing commas, 100 char print width

### TypeScript
- Strict mode enabled. Don't use `any` — use proper types or `unknown`.
- Path alias: `@/*` maps to `./src/*`
- Path alias: `@payload-config` maps to `./src/payload.config.ts`

### Components
- Functional components only. No class components.
- Server Components by default. Add `'use client'` only when needed (hooks, interactivity).
- CSS Modules for all component styling (`.module.css` co-located with component).
- No Tailwind — use CSS custom properties from `styles.css` `:root` block.
- Use `<button>` for interactive elements, never `<div onClick>`.
- Always add `aria-label` to icon-only buttons and links.
- Add `aria-describedby` linking error messages to form inputs.
- Respect `prefers-reduced-motion` in CSS animations.

### CSS Variables (defined in styles.css)
```
--primary-accent: #ff715b      --dark-background: #121f28
--secondary-accent: #922D50    --light-background: #FFEEDB
--dark-accent: #16232c         --light-accent: #83878d
--primary-font: 'Typonine Sans'
--font-mona-sans: 'Mona Sans'
--nav-height: 100px
--tech-tag-height: 120px
--border-radius: 0
```

### CSS Animations
- Use `transform` and `opacity` for animations (GPU-accelerated). Never animate `width`, `height`, `top`, `left`, `right`, `bottom`.
- Add `will-change` on frequently animated elements.
- Always include `@media (prefers-reduced-motion: reduce)` to disable/simplify animations.

### Data Fetching
- Use Payload's local API (`getPayload` + `payload.find()`) in Server Components.
- Pages use `export const revalidate = 3600` for ISR (1 hour).
- Always handle `notFound()` for slug-based pages.

### Payload CMS
- `payload-types.ts` is auto-generated — run `pnpm generate:types` after changing collections.
- `importMap.js` is auto-generated — run `pnpm generate:importmap` if admin components change.
- Collections: Users, Media, Projects, Stories
- Globals: Homepage
- Rich text uses Lexical editor — render with `RichTextRenderer` component.
- Media stored on Cloudinary (local storage disabled).

## Important Patterns

### Payload + Next.js Monolith
This is NOT a headless CMS setup. Payload runs inside the same Next.js app:
- `(payload)/` route group = admin panel + API
- `(frontend)/` route group = public website
- Both share the same server, database, and deployment

### PageTransition
Wraps only `{children}` inside `<main>`, not Navigation or Footer. This prevents nav/footer from re-animating on page changes.

### QuoteForm
Multi-step form (7 steps) using React Hook Form. Uses `watch('firstName')` for prompt personalization and `getValues()` for submit/review to minimize re-renders.

### Email API
`/api/send-email` has in-memory rate limiting (5 requests/minute per IP) and input validation.

## Security Notes

- `.env` is in `.gitignore` — never commit secrets
- Security headers configured in `next.config.mjs` (X-Frame-Options, CSP, etc.)
- `/admin` and `/api` paths blocked in `robots.ts`
- Dockerfile runs as non-root `nextjs` user
- Do NOT create public API routes that expose collection data without authentication

## Gotchas

- `Glob` tool cannot match `[slug]` brackets in file paths — use `find` via Bash instead
- Next.js 16 auto-sets `jsx: "react-jsx"` in tsconfig — don't change it back to `preserve`
- Next.js 16 renamed `middleware.ts` to `proxy.ts` (not used in this project)
- Payload packages should all be on the same version (currently ^3.75.0)
- `sharp` needs native deps in Docker — `vips-dev` for build, `vips` for runtime
