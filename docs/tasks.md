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

- [ ] Process page
- [ ] About page
- [ ] Contact page: form, validation, success/error states, WhatsApp/email links
- [ ] Form backend wired and tested end to end
- [ ] 404 page
- [ ] Page transitions

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

## Change log

| Date | Change | Decided by |
|---|---|---|
| 2026-10-20 | Hero prototype approved; docs set created | Bhushan |
| 2026-10-20 | Phase 1 Foundation & Design System complete (5/5 UAT passed) | Dev |
| 2026-10-20 | Phase 2 Home Hero complete with dark wash calibration (5/5 UAT passed) | Dev |
| 2026-10-20 | Phase 3 Home Sections complete with dual-pin lifecycle (5/5 UAT passed) | Dev |
| 2026-10-20 | Phase 4 Work Index & Projects complete with sketch-to-photo scrub (6/6 UAT passed) | Dev |
| 2026-10-20 | Corrections applied: UAT records 2, 3, 4 re-opened for user visual verification; OLI_PRODUCTION=1 guard added; placeholders cleansed of invented numbers; copy aligned with content.md; /dev/primitives excluded from export; project sheet numbering scheme submitted for approval | User & Dev |

