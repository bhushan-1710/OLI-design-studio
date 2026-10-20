# Tasks — OLI Design Studio

Build plan, in order. Tick items as they are completed and approved. Each phase ends with a review before the next starts. Specs referenced: `PRD.md`, `design.md`, `ux-spec.md`, `motion-spec.md`, `tech-spec.md`.

---

## Phase 0: Planning (done / in progress)

- [x] Audit existing site (Google Sites placeholder)
- [x] UX direction and sitemap
- [x] Visual direction and references chosen
- [x] Home hero prototype approved (`oli-hero.html`)
- [x] `design.md`
- [x] `PRD.md`, `ux-spec.md`, `motion-spec.md`, `content.md`, `tech-spec.md`, `client-asset-checklist.md`, `AGENTS.md`
- [ ] Send `client-asset-checklist.md` to OLI
- [ ] Confirm open decisions (PRD §12)

## Phase 1: Foundation

- [x] Create repo, scaffold Next.js app, set up linting
- [x] Tokens: `tokens.css` (light/dark), base styles, font loading
- [x] Theme: system detection, manual toggle, no flash
- [x] Layout: sheet frame, title block, nav, footer, skip link
- [x] Motion foundation: Lenis + ScrollTrigger setup, `draw()` helper, reduced-motion handling
- [x] UI primitives: Button (wobbly), Chip, Stamp, DimensionRule, Annotation, HandCircle
- [x] Review: shared layout at 390 / 1280 in light and dark

## Phase 2: Home Hero

- [x] Port hero prototype into a component (same timeline and thresholds)
- [x] Hero placeholder elevation drawing structured with typed layers (.cl, .s1, .s2, .dim, .note, wash, stamp); ready to swap when client assets arrive
- [x] Review: verified at 390 / 1280 in light and dark mode with calibrated dark wash contrast (5/5 UAT passed)

## Phase 3: Home Sections

- [x] DimensionRule divider with left-to-right draw
- [x] Selected Work section with stroke-draw photo reveals and hover effects
- [x] ProcessSection: responsive horizontal pinned scrub on desktop (`+=300%`), stacked panels on mobile (≤820px)
- [x] Disciplines section with SVG sketch reveals (hover on desktop, tap accordion on mobile)
- [x] Closing CTA section with headline, Enquire button, WhatsApp click-to-chat, and mailto
- [x] Dual-pin lifecycle and font-load ScrollTrigger refresh verified at 390px and 1280px (5/5 UAT passed)

## Phase 4: Work and projects

- [x] Project data model + build-time validation (`isPlaceholder` guard)
- [x] Work index with filter chips and URL state (`/work?type=...`)
- [x] Project detail template (`/work/[slug]`, Sheet A-03+)
- [x] Sketch-to-photo scrub component (`+=150%` pinned scrub)
- [x] Seed 4 obviously fake placeholder projects (`isPlaceholder: true`, "Location TBC")
- [x] Next-project navigation

## Phase 5: Remaining pages

- [x] Process page (Sheet A-03, 4 stages, structured [NEEDED] placeholders)
- [x] About page (Sheet A-04, philosophy placeholder, HandCircle demo on approved phrase, team placeholders)
- [x] Contact page: form, validation, success/error states, direct channels (Sheet A-05)
- [x] Form backend wired and tested (Web3Forms integration, demo mode banner, production key guard)
- [x] 404 page (Sheet 404, matching content.md)
- [x] Page transitions (≤400ms line wipe, reduced-motion bypass, filter query bypass, pin recalculation)

## Phase 6: Quality

- [ ] SEO: metadata, sitemap, robots, JSON-LD, OG image
- [ ] Performance pass against `tech-spec.md` budgets (real Android device)
- [ ] Accessibility pass: keyboard, screen reader spot-check, contrast in both themes
- [ ] Reduced-motion pass
- [ ] Cross-browser pass (Safari iOS, Chrome Android, desktop browsers)
- [ ] Copy pass: remove every `[DRAFT]` / `[NEEDED]` marker from `content.md` content
- [ ] Replace hero house drawing, its dimension labels (12.40 M, 6.20 M, CANTILEVER 3.0 M) and the project scrub drawing's dimension strings with real project data, or remove

## Phase 7: Launch

- [ ] Client review and sign-off
- [ ] Domain: DNS change plan, redirect from Google Sites URL tested
- [ ] Deploy to production
- [ ] Analytics events verified (form submit, WhatsApp click, email click)
- [ ] Submit sitemap to Search Console
- [ ] Handover note: how to add a project, how to change contact details

## Backlog (post-launch)

- [ ] More projects
- [ ] Testimonials
- [ ] Journal / notes
- [ ] Hindi/Marathi version
- [ ] Simple CMS for the studio
- [ ] Revisit a Three.js moment **only if** a real 3D model of a project exists

## Copy awaiting studio approval

The following proposed `[DRAFT]` strings are actively rendered on the site or referenced in template copy. Each item requires studio sign-off or replacement with approved studio wording before production launch (Phase 6 / Phase 7):

| Section / Item | File | Current [DRAFT] Copy | Studio Action |
|---|---|---|---|
| **Hero headline** | `components/sections/HeroSection.tsx` | `"From sketch to handover."` | Approve headline or supply alternative core promise. |
| **Hero stage labels** | `components/sections/HeroSection.tsx` | `"01 Sketch · 02 Develop · 03 Build · 04 Handover"` | Confirm 4-stage nomenclature matches studio process. |
| **Hero stamp text** | `components/sections/HeroElevation.tsx` | `"HANDED OVER"` | Confirm stamp wording. |
| **Hero technical annotations** | `components/sections/HeroElevation.tsx` | `"CANTILEVER 3.0 M"`, `"FULL-HEIGHT GLAZING"`, `"ENTRY"` | Confirm or replace with real project drawing annotations. |
| **Home: Selected work heading** | `components/sections/SelectedWorkSection.tsx` | `"Selected work"` | Confirm section heading. |
| **Home: Process section heading** | `components/sections/ProcessSection.tsx` | `"How a project moves."` | Confirm section headline. |
| **Home: Process stage descriptions** | `components/sections/ProcessSection.tsx` | 01: `"We start on paper: your site, your brief, first ideas drawn by hand."`<br>02: `"Ideas become plans, sections and materials you can review and change."`<br>03: `"We detail the drawings, coordinate vendors and visit site as it goes up."`<br>04: `"You receive the finished space and the documents behind it."` | Confirm stage summaries reflect studio workflow. |
| **Home: Closing CTA heading & subhead** | `components/sections/ClosingCtaSection.tsx` | Heading: `"Have a project in mind?"`<br>Subhead: `"Tell us the site, the scale and when you'd like to start."` | Confirm conversion headline and invitation copy. |
| **Footer discipline tagline** | `components/layout/Footer.tsx` | `"Architecture · Interior · Landscape · Product Design — one studio, start to finish."` | Confirm global footer discipline statement. |
| **Work page title & empty state** | `app/work/page.tsx`, `components/work/WorkGallery.tsx` | Title: `"Work"`<br>Empty state: `"Nothing here yet. Try another discipline."` | Confirm page heading and zero-filter message. |
| **Process page intro headline** | `app/process/page.tsx` | `"A project is a series of decisions. Here is when each one gets made. [DRAFT]"` | Confirm or refine page philosophy intro. |
| **Process page stage cards** | `app/process/page.tsx` | Stages 01–04 descriptions (`"We start on paper..."`, etc.) | Confirm stage descriptions. |
| **About page discipline tagline** | `app/about/page.tsx` | `"Architecture · Interior · Landscape · Product Design — one studio, start to finish. [DRAFT]"` | Confirm hero subhead on About sheet. |
| **Contact page header & prompt** | `app/contact/page.tsx` | Headline: `"Let's talk about your project. [DRAFT]"`<br>Prompt: `"Tell us the site, the scale and when you'd like to start. [DRAFT]"` | Confirm contact sheet introduction and prompt. |
| **Enquiry form success copy** | `components/contact/EnquiryForm.tsx` | `"We've received your enquiry and will reply within [NEEDED] working day(s). [DRAFT]"` | Supply turnaround SLA (e.g., "1–2 working days"). |
| **Enquiry form error copy** | `components/contact/EnquiryForm.tsx` | `"That didn't send. Your message is still here. Try again, or email us at olidesignstudio06@gmail.com."` | Confirm fallback channel once WhatsApp number is supplied. |
| **Custom 404 subhead** | `app/not-found.tsx` | `"The drawing or specification you requested could not be located on this drawing board. [DRAFT]"` | Confirm 404 message copy. |
| **Page metadata titles** | `app/*/page.tsx`, `docs/content.md` | `"Projects — OLI Design Studio"`, `"How we work — OLI Design Studio"`, `"About — OLI Design Studio"`, `"Contact — OLI Design Studio"` | Confirm browser tab / SEO page titles. |

## Change log

| Date | Change | Decided by |
|---|---|---|
| 2026-10-20 | Hero prototype approved; docs set created | Bhushan |
| 2026-10-20 | Phase 1 Foundation & Design System complete (5/5 UAT passed) | Dev |
| 2026-10-20 | Phase 2 Home Hero complete with dark wash calibration (5/5 UAT passed) | Dev |
| 2026-10-20 | Phase 3 Home Sections complete with dual-pin lifecycle (5/5 UAT passed) | Dev |
| 2026-10-20 | Phase 4 Work Index & Projects complete with sketch-to-photo scrub (6/6 UAT passed) | Dev |
| 2026-10-20 | Corrections applied: UAT records 2, 3, 4 re-opened for user visual verification; OLI_PRODUCTION=1 guard added; placeholders cleansed of invented numbers; copy aligned with content.md; /dev/primitives excluded from export; project sheet numbering scheme submitted for approval | User & Dev |
| 2026-10-20 | Phase 5 Remaining Pages complete: Process (A-03), About (A-04), Contact (A-05), EnquiryForm, Custom 404, PageTransition; script checks passed, visual items awaiting user verification | Dev |
| 2026-10-20 | Added "Copy awaiting studio approval" inventory to tasks.md | User & Dev |



