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

- [ ] Create repo, scaffold Next.js app, set up linting
- [ ] Tokens: `tokens.css` (light/dark), base styles, font loading
- [ ] Theme: system detection, manual toggle, no flash
- [ ] Layout: sheet frame, title block, nav, footer, skip link
- [ ] Motion foundation: Lenis + ScrollTrigger setup, `draw()` helper, reduced-motion handling
- [ ] UI primitives: Button (wobbly), Chip, Stamp, DimensionRule, Annotation, HandCircle
- [ ] Review: shared layout at 390 / 1280 in light and dark

## Phase 2: Home

- [ ] Port hero prototype into a component (same timeline and thresholds)
- [ ] Hero drawing swapped to a real project **(blocked on client assets)**; placeholder house until then
- [ ] Selected work section + project card component
- [ ] Process section (pinned horizontal on desktop, stacked on mobile)
- [ ] Disciplines section
- [ ] Closing CTA
- [ ] Review: scroll feel on a real phone; tune pin lengths

## Phase 3: Work and projects

- [ ] Project data model + build-time validation
- [ ] Work index with filter chips and URL state
- [ ] Project detail template
- [ ] Sketch-to-photo scrub component
- [ ] Populate 3–4 projects **(blocked on client assets)**
- [ ] Next-project navigation

## Phase 4: Remaining pages

- [ ] Process page
- [ ] About page
- [ ] Contact page: form, validation, success/error states, WhatsApp/email links
- [ ] Form backend wired and tested end to end
- [ ] 404 page
- [ ] Page transitions

## Phase 5: Quality

- [ ] SEO: metadata, sitemap, robots, JSON-LD, OG image
- [ ] Performance pass against `tech-spec.md` budgets (real Android device)
- [ ] Accessibility pass: keyboard, screen reader spot-check, contrast in both themes
- [ ] Reduced-motion pass
- [ ] Cross-browser pass (Safari iOS, Chrome Android, desktop browsers)
- [ ] Copy pass: remove every `[DRAFT]` / `[NEEDED]` marker from `content.md` content

## Phase 6: Launch

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
