# OLI Design Studio Website

## What This Is

A custom, high-craft website for OLI Design Studio—an Indian multidisciplinary design studio offering Architecture, Interior, Landscape, and Product Design. The site embodies the concept of an architectural **drafting sheet**, where linework draws itself on scroll and a hand sketch transforms into a built structure. It brings to life the studio's foundational promise: *"We take care of your projects from designing to handover."*

Targeted primarily at homeowners and small business owners arriving on mobile phones from Instagram, the site prioritizes conversion into qualified enquiries via WhatsApp first, enquiry form second, and email third.

## Core Value

Demonstrate the studio's end-to-end "sketch to handover" promise through meaningful scroll-driven drafting linework and authentic project material, converting mobile visitors into direct enquiries.

## Business Context

- **Customer**: Indian homeowners planning new construction/renovation and small business owners planning commercial spaces (retail, hospitality, office).
- **Revenue model**: High-touch professional design and execution services across Architecture, Interior, Landscape, and Product Design.
- **Success metric**: Qualified enquiries per month (WhatsApp clicks + form submissions) and median scroll depth reaching the process section on mobile.
- **Strategy notes**: Replaces an outdated Google Sites placeholder; positions OLI as a unified, single-team partner from initial sketch to physical keys.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **FOUND-01**: Next.js App Router setup with static export (`output: 'export'`) and pinned dependencies.
- [ ] **FOUND-02**: CSS design tokens in `tokens.css` with light and dark themes (system detection + manual toggle in Footer with `localStorage` and zero-flash inline script).
- [ ] **FOUND-03**: Self-hosted typography via `next/font` (Instrument Serif, DM Mono, Just Another Hand).
- [ ] **FOUND-04**: Sheet frame (12px inset, 1.5px solid `--ink`), 48px drafting grid, and responsive Sheet TitleBlock.
- [ ] **FOUND-05**: Global Navigation with logo ("OLI" hand font + "Design Studio" mono caps), Work/Process/About links, and Enquire button.
- [ ] **FOUND-06**: Global Footer with studio disciplines, contact links, Instagram, copyright, and theme toggle.
- [ ] **FOUND-07**: Motion foundation with Lenis 1.1.x, GSAP 3.12.x + ScrollTrigger, `draw()` stroke helper, and `prefers-reduced-motion` bypass.
- [ ] **FOUND-08**: Reusable UI primitives: Button (wobbly radius, red border/fill), Chip, Stamp, DimensionRule, Annotation, and HandCircle.
- [ ] **HERO-01**: Port approved `oli-hero.html` into a React client component preserving exact layer hierarchy (`.cl`, `.s1`, `.s2`, `.dim`, `.note`, wash group with clip rect, `.stamp`, `.hl-path`).
- [ ] **HERO-02**: Time-based intro animation (construction lines stagger → outline stagger → headline/tracker fade up).
- [ ] **HERO-03**: Pinned scroll scrub sequence (`end: +=300%`, `scrub: 0.7`) progressing details (0-3s), dimensions (2.2s), annotations (3s), colour wash rise (4.6-7.8s), construction lines fade (6s), stamp landing (`back.out(2)` at 8.2s), and hand circle highlight (8.5s).
- [ ] **HERO-04**: Stage tracker updating across thresholds (<0.03 Sketch, <0.45 Develop, <0.78 Build, else Handover).
- [ ] **HERO-05**: Desktop-only pencil wobble filter (`feTurbulence` + `feDisplacementMap` on ≥769px, removed on mobile).
- [ ] **HERO-06**: Placeholder house elevation drawing structured with typed layers, ready to swap to real project trace when client assets arrive.
- [ ] **HOME-01**: Selected work section preceded by DimensionRule divider, presenting 3-4 featured project cards.
- [ ] **HOME-02**: Project card component with image cover, meta, scroll-triggered stroke draw overlay, and desktop hover scale/underline animation.
- [ ] **HOME-03**: Process section with pinned horizontal scroll on desktop (travel = (panels - 1) × viewport width, `end: +=300%`, drawings complete during panel scroll).
- [ ] **HOME-04**: Process section responsive mobile fallback (≤820px) stacking panels vertically with single-trigger drawing on enter.
- [ ] **HOME-05**: Disciplines section (Architecture, Interior, Landscape, Product) in large serif typography; hover/focus draws discipline sketch (tap toggle on mobile).
- [ ] **HOME-06**: Closing CTA section with headline, Enquire button, WhatsApp click-to-chat, and mailto link.
- [ ] **WORK-01**: Typed project data model (`/content/projects.ts`) enforcing `isPlaceholder: boolean` flag, `cover`, `brief`, and ≥3 images at build time, blocking unflagged placeholder data from production.
- [ ] **WORK-02**: Seed 3 obviously fake placeholder projects ("Placeholder Project 01", "02", "03", "Location TBC") with `isPlaceholder: true` and zero invented details.
- [ ] **WORK-03**: Work index page (`/work`, Sheet A-02) with responsive 2-column desktop / 1-column mobile grid.
- [ ] **WORK-04**: Instant discipline filter chips with URL query param sync (`/work?type=...`) without page reload.
- [ ] **WORK-05**: Project detail template (`/work/[slug]`, Sheet A-03+) with title, meta, 2-3 sentence brief, process drawings/photos, outcome gallery, and next-project link.
- [ ] **WORK-06**: Sketch-to-photo scroll-scrub component pinned for `+=150%` (`scrub: 0.7`), fading linework from 0-50% and revealing full color photo by 100%.
- [ ] **PAGE-01**: Dedicated Process page (`/process`) with structured placeholder layout (What we do, What you decide, What you receive per stage) marked clearly until real studio process is confirmed.
- [ ] **PAGE-02**: About page (`/about`) with studio philosophy, team portraits/bios, and hand-circle highlight word.
- [ ] **PAGE-03**: Contact page (`/contact`) with headline, direct WhatsApp / mailto / Instagram links.
- [ ] **PAGE-04**: Enquiry form with exactly 4 fields (Name, Phone/WhatsApp, Project Type, Message), honeypot anti-spam (`botcheck`), inline client-side validation, error handling, and success state displaying animated Stamp.
- [ ] **PAGE-05**: Static export form integration wired to Web3Forms client-side submission with domain-restricted key.
- [ ] **PAGE-06**: Custom 404 page ("This sheet doesn't exist. Back to Home →").
- [ ] **PAGE-07**: Route change page transitions (≤400ms ink line wipe and fade; skipped under reduced motion and filter clicks).
- [ ] **QUAL-01**: Full SEO metadata per page (title ≤60 chars, description ≤155 chars, canonical, Open Graph, Twitter cards, 1200x630 OG image from hero drawing).
- [ ] **QUAL-02**: Build-time `sitemap.xml`, `robots.txt`, and JSON-LD `ProfessionalService` structured data.
- [ ] **QUAL-03**: Performance budget compliance (Home JS ≤ 200 KB gzipped, Hero SVG ≤ 60 KB, LCP ≤ 2.5s, CLS ≤ 0.05, INP ≤ 200ms on 4G mobile).
- [ ] **QUAL-04**: WCAG 2.2 AA accessibility audit (semantic HTML, single h1, red 2px focus ring with offset, skip link, 44x44px touch targets, SVG roles/labels).
- [ ] **QUAL-05**: Comprehensive `prefers-reduced-motion` compliance across all pages and components.
- [ ] **QUAL-06**: Cross-browser verification (Chrome Android, iOS Safari, desktop Chrome, Firefox, Safari, Edge) across 390px, 768px, 1280px, 1920px viewports.

### Out of Scope

- **CMS / Blog / Journal / Articles (v1)** — Defer to post-launch; typed data files (`/content/*.ts`) provide full build-time safety and independence without runtime overhead.
- **Client portal / Login / Payments** — Irrelevant to the studio's bespoke high-touch consulting workflow.
- **3D / Three.js / WebGL in v1** — Only reconsidered if a real 3D model of a project is provided by the client; SVG + GSAP provides superior performance and matches the drafting sheet aesthetic.
- **UI Component Libraries (shadcn, MUI, Tailwind, Magic UI)** — Explicitly banned; standard component kits fight the drafting sheet aesthetic.
- **Multi-language (Hindi/Marathi) at launch** — Defer to v2 based on client market validation.

## Context

- The studio currently has only a placeholder site at `olidesignstudio.in` on Google Sites with no portfolio or process presence.
- The approved hero prototype `docs/reference/oli-hero.html` establishes the visual benchmark, SVG layer structure, stage thresholds, and animation choreography.
- All copy marked `[DRAFT]` or `[NEEDED]` in `docs/content.md` is strictly treated as placeholder until confirmed by the studio.
- Strict precedence hierarchy: `oli-hero.html` (hero) > `design.md` (visuals) > `ux-spec.md` (behaviour) > `PRD.md` (scope).

## Constraints

- **Tech stack**: Next.js App Router (static export), Plain CSS with custom properties (`tokens.css`), GSAP 3.12.x + ScrollTrigger, Lenis 1.1.x, inline SVG. Pinned versions at least two weeks old.
- **Viewport**: Mobile-first at 390px; verify at 768px, 1280px, 1920px. Height must use `100svh`, never `100vh`.
- **Motion**: Animate only `transform`, `opacity`, `stroke-dashoffset`, `clip-path`. No layout thrashing. All GSAP code wrapped in `gsap.context()` with `ctx.revert()` on unmount.
- **Accessibility**: Full WCAG 2.2 AA compliance; `prefers-reduced-motion` must render final state with no Lenis and no pinning.
- **Copy & Assets**: Zero invented studio facts or stock photos. All missing client assets use typed placeholders.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router with static export | Blazing fast mobile delivery, cheap/free static hosting, robust SEO metadata | — Pending |
| Plain CSS with design tokens (`tokens.css`) | Full control over drawing sheet borders, grid, and SVG styling without UI framework bloat | — Pending |
| GSAP 3.12.x + Lenis 1.1.x | Identical motion stack as the client-approved prototype `oli-hero.html` | — Pending |
| Static export form handling via Web3Forms / client-side POST | Avoids server requirements while maintaining honeypot security and direct inbox forwarding | — Pending |
| 4-field enquiry form (Name, Phone/WhatsApp, Type, Message) | Minimizes friction on mobile for high conversion; WhatsApp click-to-chat prioritized | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

---
*Last updated: 2026-10-20 after initialization*
