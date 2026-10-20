# Roadmap: OLI Design Studio Website

## Overview

A phased build transforming the OLI Design Studio digital presence into an interactive architectural drafting sheet. The build establishes an unshakeable design-token and motion foundation, ports the approved hero animation with precision, implements the rich home experience, delivers the filtered portfolio and sketch-to-photo project template, expands into full secondary pages with zero-friction enquiry flows, and finalizes with comprehensive performance, accessibility, and SEO auditing.

## Architecture & Integration Notes

- **Static Export Form Handling**: Next.js with `output: 'export'` generates static client bundles without serverless Node.js endpoints. The 4-field enquiry form delegates spam protection and backend delivery to **Web3Forms** via client-side `fetch` to `https://api.web3forms.com/submit`.
- **Honeypot & Security**: The anti-spam honeypot uses Web3Forms' standard field name `botcheck` (hidden with CSS and excluded from tabindex). In production, the Web3Forms access key is restricted directly to the production domain (`olidesignstudio.in`) to prevent third-party misuse. Direct WhatsApp and `mailto:` links serve as immediate fallbacks if client submission fails.
- **Theme Toggle**: The manual light/dark theme toggle lives in the Footer, initialized to follow system preference by default, persisted in `localStorage`, and applied with zero-flash inline script.

## Needs from Client (Known Blockers)

The client has not yet supplied the following assets and decisions. Development proceeds without delay using clearly typed, realistic placeholders (`[NEEDED]`), cleanly isolated in `/content/*.ts` and `/public/images`:

1. **Real Project Photography & Drawings**: High-resolution cover images, gallery photos, and clean plan/elevation CAD or vector drawings for 3–4 featured projects.
2. **Hero Elevation Drawing**: Clean CAD/PDF elevation of an authentic OLI project to replace the placeholder house elevation.
3. **WhatsApp Business Number**: Official business WhatsApp phone number for click-to-chat links.
4. **Studio Contact & Office Details**: Physical address/city, studio phone number, service area, and confirmed enquiry inbox address.
5. **Team Portraits & Philosophy Copy**: Portraits of founders/team, one-line bios, and studio philosophy in their own words.
6. **Form Provider Account**: Web3Forms access key (restricted to `olidesignstudio.in`) routed to `olidesignstudio06@gmail.com`.

---

## Phases

- [x] **Phase 1: Foundation & Design System** - Scaffold Next.js static export app, tokens, fonts, footer theme toggle, sheet layout, Lenis + ScrollTrigger motion infrastructure, and UI primitives.
- [x] **Phase 2: Home Hero** - Port approved `oli-hero.html` into a React client component preserving exact layer hierarchy, timings, stage thresholds, and mobile fallbacks.
- [ ] **Phase 3: Home Sections** - Selected work cards with draw overlay, pinned process section (stacked on mobile), disciplines list, closing CTA, and clean pin release verification.
- [ ] **Phase 4: Work Index & Projects** - Typed project data model with build-time validation and explicit `isPlaceholder` guard, filtered work gallery with URL sync, project detail template, and sketch-to-photo scrub.
- [ ] **Phase 5: Remaining Pages** - Dedicated Process page (structured placeholder), About page, Contact page with 4-field validated form + Web3Forms (`botcheck` honeypot) + WhatsApp integration, 404, and sheet wipe transitions.
- [ ] **Phase 6: Quality, Polish & Launch Readiness** - Metadata, sitemap, JSON-LD, performance budgets audit on Android 4G, WCAG AA accessibility, reduced-motion verification, and cross-browser testing.

---

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Establish the repository, static export configuration, design token system (`tokens.css`), self-hosted Google Fonts, flash-free theming with Footer toggle, drafting sheet layout with title block, motion runtime (Lenis + GSAP ScrollTrigger), and core UI primitives.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08 (8 requirements)
**Success Criteria** (what must be TRUE):
  1. Next.js app builds cleanly via `npm run build` with `output: 'export'`.
  2. The drafting sheet frame (12px inset, 1.5px solid `--ink`) and 48px grid render crisply with zero hard-coded colours or spacing.
  3. Light and dark themes switch cleanly via system preference and the Footer manual toggle without any white flash or layout shift on reload.
  4. Global navigation displays logo and links, collapsing gracefully at ≤720px while keeping the wobbly red Enquire button permanently accessible.
  5. Lenis smooth scroll and GSAP ScrollTrigger synchronize via the central ticker, and `prefers-reduced-motion` immediately disables Lenis and bypasses stroke-draw hiding.
  6. UI primitives (Button, Chip, Stamp, DimensionRule, Annotation, HandCircle) render accurately against `docs/design.md` specs.
**Plans**: 3 plans

Plans:
- [x] 01-01: Repo scaffold, Next.js static export config, `tokens.css`, fonts, Footer theme toggle, base styles, and Button primitive.
- [x] 01-02: Global layout architecture (reusable SheetFrame, TitleBlock, Nav with mobile collapse, Footer with theme toggle, and placeholder routes).
- [x] 01-03: Motion runtime setup (Lenis + ScrollTrigger ticker synchronization, `draw()` primitive helper, reduced-motion guard) and UI primitives (Chip, Stamp, DimensionRule, Annotation, HandCircle).

### Phase 2: Home Hero
**Goal**: Port the approved hero prototype (`docs/reference/oli-hero.html`) into an isolated React client component, maintaining exact SVG layer structure, stage thresholds, scrub physics, and mobile adaptations.
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06 (6 requirements)
**Success Criteria** (what must be TRUE):
  1. Hero section occupies exactly `100svh` and renders the placeholder house elevation drawing with `.cl`, `.s1`, `.s2`, `.dim`, `.note`, wash group, and stamp layers.
  2. On page load, time-based intro animates construction lines (1.2s stagger 0.07) followed by outline (1.1s stagger 0.14) and copy fade-in.
  3. Pinned scroll scrub (`end: +=300%`, `scrub: 0.7`) advances details, dimensions, marker wash rising from ground, and stamp landing (`back.out(2)`).
  4. Stage tracker (01 Sketch, 02 Develop, 03 Build, 04 Handover) toggles active state accurately across progress thresholds (<0.03, <0.45, <0.78, else Handover).
  5. Pencil wobble filter (`feTurbulence`) activates only on viewports ≥769px and is stripped on mobile devices for smooth 60fps scrolling.
**Plans**: 2 plans

Plans:
- [x] 02-01: Hero elevation SVG component with layered linework, marker wash clip path, annotations, and wobble filter.
- [x] 02-02: Hero component integration, intro timeline, ScrollTrigger pinned timeline (`+=300%`), and stage tracker state machine.

### Phase 3: Home Sections
**Goal**: Build the remaining sections of the Home page: Selected Work with stroke-draw photo reveals, pinned horizontal Process scroll (collapsing to vertical stack on mobile), interactive Disciplines list, Closing CTA, and bulletproof pin release lifecycle.
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06 (6 requirements)
**Success Criteria** (what must be TRUE):
  1. DimensionRule divider cleanly separates Hero from Selected Work with left-to-right draw animation.
  2. Selected work cards trigger sketch-line draw followed by bottom-up photo clip reveal on scroll enter, with subtle photo zoom on desktop hover.
  3. Process section executes smooth horizontal scroll across 4 panels on desktop (`+=300%` pin) with drawing progression per panel, and collapses cleanly into stacked panels on mobile (≤820px).
  4. Disciplines section displays large serif typography; hover/focus reveals discipline sketch inline (tap toggle on mobile).
  5. Closing CTA renders headline, Enquire button, WhatsApp click-to-chat, and mailto link.
  6. Hero pin and process pin both release cleanly; page height is correct after fonts load and on window resize; verified at 390px and 1280px.
**Plans**: 3 plans

Plans:
- [ ] 03-01: DimensionRule component and SelectedWork section with project card enter/hover animations.
- [ ] 03-02: ProcessSection component with responsive desktop horizontal pin vs mobile vertical stack.
- [ ] 03-03: Disciplines list with SVG sketch reveals, ClosingCTA section, and ScrollTrigger refresh/resize pin lifecycle audit.

### Phase 4: Work Index & Projects
**Goal**: Establish the typed project content architecture with build-time validation and explicit `isPlaceholder` protection, build the filterable Work gallery with shareable URL state, and deliver the project detail template with the signature sketch-to-photo scrub.
**Depends on**: Phase 3
**Requirements**: WORK-01, WORK-02, WORK-03, WORK-04, WORK-05, WORK-06 (6 requirements)
**Success Criteria** (what must be TRUE):
  1. Project data model enforces `cover`, `brief`, ≥3 images, and an explicit `isPlaceholder: boolean` flag at build time, failing the build if unflagged placeholder data attempts to ship.
  2. Seeded with 3 obviously fake placeholder projects ("Placeholder Project 01", "Placeholder Project 02", "Placeholder Project 03", all marked "Location TBC", `isPlaceholder: true`, with zero invented details).
  3. Work index page (`/work`, Sheet A-02) renders responsive 2-column desktop / 1-column mobile grid.
  4. Discipline filter chips update the gallery instantly without page reloads, synchronizing query parameters in the URL (`/work?type=interior`).
  5. Project detail pages (`/work/[slug]`, Sheet A-03+) render brief, process photography, outcome gallery, and next-project link.
  6. Sketch-to-photo scrub section pins for `+=150%` and smoothly fades linework into full-color photography.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Typed project data schema (`/content/projects.ts`) with `isPlaceholder` validation, 3 obviously fake placeholder projects, and Work index with URL-state filter chips.
- [ ] 04-02: Project detail dynamic route (`/work/[slug]`), sketch-to-photo scrub component, process gallery, and next-project navigation.

### Phase 5: Remaining Pages
**Goal**: Build the dedicated Process (with structured placeholder content awaiting client confirmation), About, and Contact pages, integrate the 4-field enquiry form with client-side validation and Web3Forms (`botcheck` honeypot) static export submission, custom 404 sheet, and route transition effects.
**Depends on**: Phase 4
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07 (7 requirements)
**Success Criteria** (what must be TRUE):
  1. Dedicated Process page (`/process`) presents a structured placeholder breakdown of What we do, What you decide, and What you receive per stage, explicitly marked as pending studio confirmation.
  2. About page (`/about`) renders studio philosophy with hand-circle highlight word, team grid with placeholder flags, and location info.
  3. Contact page (`/contact`) renders direct WhatsApp, call, and email links alongside the 4-field enquiry form.
  4. Enquiry form validates on blur and submit, blocks bots via `botcheck` honeypot, posts asynchronously to Web3Forms, preserves user inputs on failure, and presents the animated Stamp on success.
  5. 404 page conforms to drafting sheet aesthetic ("This sheet doesn't exist. Back to Home →").
  6. Page transitions execute quick ≤400ms ink line wipe, automatically skipped when reduced motion is preferred.
**Plans**: 3 plans

Plans:
- [ ] 05-01: Dedicated Process page (`/process`) with structured placeholder layout and About page (`/about`).
- [ ] 05-02: Contact page (`/contact`) with 4-field form, validation, `botcheck` honeypot, Web3Forms client-side integration, and success stamp.
- [ ] 05-03: 404 page and lightweight sheet-wipe page transition component.

### Phase 6: Quality, Polish & Launch Readiness
**Goal**: Execute comprehensive auditing across SEO, mobile performance budgets, accessibility (WCAG 2.2 AA), reduced-motion verification, and cross-browser responsiveness.
**Depends on**: Phase 5
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06 (6 requirements)
**Success Criteria** (what must be TRUE):
  1. Full metadata, Open Graph cards, 1200x630 OG image, build-time `sitemap.xml`, `robots.txt`, and `ProfessionalService` JSON-LD are generated.
  2. Performance budgets in `docs/tech-spec.md` are verified: Home JS bundle ≤ 200 KB gzipped, Hero SVG ≤ 60 KB, LCP ≤ 2.5s on mobile.
  3. Accessibility score ≥ 95 on Lighthouse mobile with visible red focus states, valid heading hierarchy (one h1), skip link, and labelled SVGs.
  4. With `prefers-reduced-motion: reduce` enabled, all pages render complete content in its final state with zero pinning, zero Lenis, and zero missing copy.
  5. Visual layout and touch targets (≥44x44px) verified at 390px, 768px, 1280px, and 1920px viewports.
**Plans**: 2 plans

Plans:
- [ ] 06-01: SEO metadata, structured data generation (`sitemap.xml`, `robots.txt`, JSON-LD), and Open Graph assets.
- [ ] 06-02: Comprehensive performance budget verification, WCAG AA accessibility audit, reduced-motion verification, and cross-browser review.
