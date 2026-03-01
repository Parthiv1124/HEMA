# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build
npm run lint      # ESLint
```

No test suite is configured. `npm run start` serves the production build.

## Architecture

**Next.js 16 App Router** with TypeScript strict mode. All pages live under `src/app/` as `page.tsx` files. The root layout (`src/app/layout.tsx`) wraps every page with `<Navbar>`, `<Footer>`, and `<ScrollProgress>`.

### Directory map

```
src/
  app/           # Route segments — one folder per page
  components/
    layout/      # Navbar, Footer, ScrollProgress
    sections/    # Full-width homepage sections (HeroHome, StatsSection, etc.)
    markets/     # SVG world map + market data
    ui/          # Primitive UI components (Button, Card, Badge, Tag, Container, Section, Heading, Separator)
  data/          # Static data arrays — products.ts, certifications.ts, partners.ts, navigation.ts
  hooks/         # useScrollPosition
  lib/
    animations.ts   # Framer Motion Variants (fadeInUp, staggerContainer, etc.)
    constants.ts    # SITE_NAME, CONTACT, CERTIFICATIONS
    products.ts     # Query helpers over data/products.ts
    utils.ts        # cn() (clsx + tailwind-merge)
  types/         # product.ts, common.ts, react-simple-maps.d.ts
```

### Data layer

All product and site data is **static** — no database or external API calls (except the contact form stub at `src/app/api/contact/route.ts`, which logs to console and needs a real email integration for production).

Products are defined in `src/data/products.ts` as a `Product[]` array. Use the helpers in `src/lib/products.ts` to query them (`getAllProducts`, `getProductBySlug`, `searchProducts`, `getCategories`, etc.).

Product detail pages at `/products/[slug]` use `generateStaticParams()` to pre-render all product pages at build time.

### Styling — Tailwind CSS v4

Design tokens are defined via the `@theme` directive in `src/app/globals.css` (not `tailwind.config`). Key tokens:

- `brand-500` = `#008cc9` (primary teal-blue)
- `navy-900` = `#2c2761` (dark purple-blue, used in hero/dark sections)
- `gold-500` = `#FBBF24` (accent)
- CSS gradients are in `:root` as custom properties (`--gradient-hero`, `--gradient-dark`, etc.) and exposed as `@utility` classes (`gradient-hero`, `gradient-cta`, etc.)
- Font: Montserrat via `next/font/google`, exposed as `--font-montserrat` → `font-sans`

Use `cn()` from `src/lib/utils.ts` for conditional class merging.

### Animations — Framer Motion

- Reusable `Variants` objects are in `src/lib/animations.ts` (`fadeInUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `slideInRight`, `scaleIn`).
- All animated components must be `'use client'`.
- Respect `prefers-reduced-motion` — see the `useReducedMotion` pattern in `HeroHome.tsx`.
- Scroll-triggered reveals: use `whileInView` with `viewport={{ once: true }}`.

### UI components

`src/components/ui/` follows a shadcn-style pattern (typed variants, `forwardRef`, `cn()`). Prefer extending these over writing ad-hoc Tailwind classes inline. Key components:

- `Button` — variants: `primary | secondary | outline | ghost | gold`; sizes: `sm | md | lg`
- `Container` — centered max-width wrapper
- `Section` — semantic `<section>` with consistent vertical padding
- `Badge` — colored pill; `Tag` — lighter label chip

### Pages status

The following pages exist but may be placeholder/stub level:
`/about`, `/capabilities`, `/careers`, `/contact`, `/global-reach`, `/infrastructure`, `/leadership`, `/manufacturing`, `/quality`, `/research`

The homepage (`src/app/page.tsx`) and `/products` + `/products/[slug]` are fully built.
