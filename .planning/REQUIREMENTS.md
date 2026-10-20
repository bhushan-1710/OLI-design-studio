# Requirements: OLI Design Studio Website

**Defined:** 2026-10-20
**Core Value:** Demonstrate the studio's end-to-end "sketch to handover" promise through meaningful scroll-driven drafting linework and authentic project material, converting mobile visitors into direct enquiries.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation & Design System (FOUND)

- [x] **FOUND-01**: Next.js App Router setup with static export (`output: 'export'`) and pinned dependencies.
- [x] **FOUND-02**: CSS design tokens in `tokens.css` with light and dark themes (system detection + manual toggle in Footer with `localStorage` and zero-flash inline script).
- [x] **FOUND-03**: Self-hosted typography via `next/font` (Instrument Serif, DM Mono, Just Another Hand).
- [x] **FOUND-04**: Sheet frame (12px inset, 1.5px solid `--ink`), 48px drafting grid, and responsive Sheet TitleBlock.
- [x] **FOUND-05**: Global Navigation with logo ("OLI" hand font + "Design Studio" mono caps), Work/Process/About links, and Enquire button.
- [x] **FOUND-06**: Global Footer with studio disciplines, contact links, Instagram, copyright, and theme toggle.
- [x] **FOUND-07**: Motion foundation with Lenis 1.1.x, GSAP 3.12.x + ScrollTrigger, `draw()` stroke helper, and `prefers-reduced-motion` bypass.
- [x] **FOUND-08**: Reusable UI primitives: Button (wobbly radius, red border/fill), Chip, Stamp, DimensionRule, Annotation, and HandCircle.

### Home Hero Section (HERO)

- [x] **HERO-01**: Port approved `oli-hero.html` into a React client component preserving exact layer hierarchy (`.cl`, `.s1`, `.s2`, `.dim`, `.note`, wash group with clip rect, `.stamp`, `.hl-path`).
- [x] **HERO-02**: Time-based intro animation (construction lines stagger → outline stagger → headline/tracker fade up).
- [x] **HERO-03**: Pinned scroll scrub sequence (`end: +=300%`, `scrub: 0.7`) progressing details (0-3s), dimensions (2.2s), annotations (3s), colour wash rise (4.6-7.8s), construction lines fade (6s), stamp landing (`back.out(2)` at 8.2s), and hand circle highlight (8.5s).
- [x] **HERO-04**: Stage tracker updating across thresholds (<0.03 Sketch, <0.45 Develop, <0.78 Build, else Handover).
- [x] **HERO-05**: Desktop-only pencil wobble filter (`feTurbulence` + `feDisplacementMap` on ≥769px, removed on mobile).
- [x] **HERO-06**: Placeholder house elevation drawing structured with typed layers, ready to swap to real project trace when client assets arrive.

### Home Sections (HOME)

- [ ] **HOME-01**: Selected work section preceded by DimensionRule divider, presenting 3-4 featured project cards.
- [ ] **HOME-02**: Project card component with image cover, meta, scroll-triggered stroke draw overlay, and desktop hover scale/underline animation.
- [ ] **HOME-03**: Process section with pinned horizontal scroll on desktop (travel = (panels - 1) × viewport width, `end: +=300%`, drawings complete during panel scroll).
- [ ] **HOME-04**: Process section responsive mobile fallback (≤820px) stacking panels vertically with single-trigger drawing on enter.
- [ ] **HOME-05**: Disciplines section (Architecture, Interior, Landscape, Product) in large serif typography; hover/focus draws discipline sketch (tap toggle on mobile).
- [ ] **HOME-06**: Closing CTA section with headline, Enquire button, WhatsApp click-to-chat, and mailto link.

### Work & Projects (WORK)

- [ ] **WORK-01**: Typed project data model (`/content/projects.ts`) enforcing `isPlaceholder: boolean` flag, `cover`, `brief`, and ≥3 images at build time, blocking unflagged placeholder data from production.
- [ ] **WORK-02**: Seed 3 obviously fake placeholder projects ("Placeholder Project 01", "02", "03", "Location TBC") with `isPlaceholder: true` and zero invented details.
- [ ] **WORK-03**: Work index page (`/work`, Sheet A-02) with responsive 2-column desktop / 1-column mobile grid.
- [ ] **WORK-04**: Instant discipline filter chips with URL query param sync (`/work?type=...`) without page reload.
- [ ] **WORK-05**: Project detail template (`/work/[slug]`, Sheet A-03+) with title, meta, 2-3 sentence brief, process drawings/photos, outcome gallery, and next-project link.
- [ ] **WORK-06**: Sketch-to-photo scroll-scrub component pinned for `+=150%` (`scrub: 0.7`), fading linework from 0-50% and revealing full color photo by 100%.

### Remaining Pages (PAGE)

- [ ] **PAGE-01**: Dedicated Process page (`/process`) with structured placeholder layout (What we do, What you decide, What you receive per stage) marked clearly until real studio process is confirmed.
- [ ] **PAGE-02**: About page (`/about`) with studio philosophy, team portraits/bios, and hand-circle highlight word.
- [ ] **PAGE-03**: Contact page (`/contact`) with headline, direct WhatsApp / mailto / Instagram links.
- [ ] **PAGE-04**: Enquiry form with exactly 4 fields (Name, Phone/WhatsApp, Project Type, Message), honeypot anti-spam (`botcheck`), inline client-side validation, error handling, and success state displaying animated Stamp.
- [ ] **PAGE-05**: Static export form integration wired to Web3Forms client-side submission with domain-restricted key.
- [ ] **PAGE-06**: Custom 404 page ("This sheet doesn't exist. Back to Home →").
- [ ] **PAGE-07**: Route change page transitions (≤400ms ink line wipe and fade; skipped under reduced motion and filter clicks).

### Quality, SEO & Performance (QUAL)

- [ ] **QUAL-01**: Full SEO metadata per page (title ≤60 chars, description ≤155 chars, canonical, Open Graph, Twitter cards, 1200x630 OG image from hero drawing).
- [ ] **QUAL-02**: Build-time `sitemap.xml`, `robots.txt`, and JSON-LD `ProfessionalService` structured data.
- [ ] **QUAL-03**: Performance budget compliance (Home JS ≤ 200 KB gzipped, Hero SVG ≤ 60 KB, LCP ≤ 2.5s, CLS ≤ 0.05, INP ≤ 200ms on 4G mobile).
- [ ] **QUAL-04**: WCAG 2.2 AA accessibility audit (semantic HTML, single h1, red 2px focus ring with offset, skip link, 44x44px touch targets, SVG roles/labels).
- [ ] **QUAL-05**: Comprehensive `prefers-reduced-motion` compliance across all pages and components.
- [ ] **QUAL-06**: Cross-browser verification (Chrome Android, iOS Safari, desktop Chrome, Firefox, Safari, Edge) across 390px, 768px, 1280px, 1920px viewports.

## v2 Requirements

Deferred to post-launch release. Tracked but not in current roadmap.

### Enhanced Features & Content (V2)

- **V2-01**: Simple client-manageable headless CMS for self-serve project publishing.
- **V2-02**: Interactive 3D / Three.js model inspection if client provides architectural 3D models.
- **V2-03**: Multilingual support (Hindi and Marathi versions).
- **V2-04**: Client testimonials and press/awards recognition section.
- **V2-05**: Downloadable PDF studio brochure / lookbook.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| UI component kits (shadcn/ui, MUI, Tailwind, Magic UI) | Generic component presets fight the custom drafting sheet aesthetic and design tokens. |
| Blog / Journal / Articles at launch | Not required for v1 MVP; projects and process are the primary conversion drivers. |
| Client portal / Authentication / Online Payments | High-touch architectural consulting does not use self-serve billing or logins. |
| Three.js / WebGL in v1 | No 3D assets exist; SVG + GSAP provides lighter, sharper, and authentic linework. |
| Invented studio details / Stock photos | Damages studio credibility; typed placeholders used until real assets are supplied. |

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| FOUND-08 | Phase 1 | Complete |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| HERO-05 | Phase 2 | Pending |
| HERO-06 | Phase 2 | Pending |
| HOME-01 | Phase 3 | Pending |
| HOME-02 | Phase 3 | Pending |
| HOME-03 | Phase 3 | Pending |
| HOME-04 | Phase 3 | Pending |
| HOME-05 | Phase 3 | Pending |
| HOME-06 | Phase 3 | Pending |
| WORK-01 | Phase 4 | Pending |
| WORK-02 | Phase 4 | Pending |
| WORK-03 | Phase 4 | Pending |
| WORK-04 | Phase 4 | Pending |
| WORK-05 | Phase 4 | Pending |
| WORK-06 | Phase 4 | Pending |
| PAGE-01 | Phase 5 | Pending |
| PAGE-02 | Phase 5 | Pending |
| PAGE-03 | Phase 5 | Pending |
| PAGE-04 | Phase 5 | Pending |
| PAGE-05 | Phase 5 | Pending |
| PAGE-06 | Phase 5 | Pending |
| PAGE-07 | Phase 5 | Pending |
| QUAL-01 | Phase 6 | Pending |
| QUAL-02 | Phase 6 | Pending |
| QUAL-03 | Phase 6 | Pending |
| QUAL-04 | Phase 6 | Pending |
| QUAL-05 | Phase 6 | Pending |
| QUAL-06 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 39
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-20*
*Last updated: 2026-10-20 after initial definition and count reconciliation*
