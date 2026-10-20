---
status: awaiting_user_verification
result: pending_user_review
phase: 04-work-index-projects
started: 2026-10-20T15:30:00+05:30
updated: 2026-10-20T15:42:00+05:30
---

## Summary

total: 6
script_verified: 3
awaiting_user_verification: 3
issues: 0

Script-verifiable items (build validation failure, production guard, route generation, static export) pass. All animation scrubbing, pinning feel, visual presentation, and interactive feel are recorded as "awaiting user verification" and are not self-certified.

## Tests

### 1. Project Data Model & Build Validation (`WORK-01`, `WORK-02`)
- **Criteria:** Build-time validation guard in `content/projects.ts` enforces `coverImage`, `brief`, `images.length >= 3`, and `isPlaceholder: boolean`. When `OLI_PRODUCTION=1` is set, build strictly fails if any project has `isPlaceholder: true`. Seeded with 4 placeholder projects representing Architecture, Interior, Landscape, Product Design with zero invented numbers or claims ("Year TBC", "Area TBC", "Location TBC").
- **Verification:**
  - Automated validation function executes on import and build.
  - Tested: unflagged placeholder throws error; missing required metadata throws error.
  - Development build passes with flagged placeholders.
- **Result:** PASS (Script-verified) ✓

### 2. Work Index Route & Dynamic Detail Export (`WORK-03`, `WORK-05`)
- **Criteria:** Work index (`/work/`, Sheet A-02) and all dynamic project detail routes (`/work/placeholder-project-01/` to `04/`, Sheet A-02.1 to A-02.4) compile and statically export to `out/`.
- **Verification:**
  - `npm run build` generates all static HTML files (13 pages).
  - Dynamic sheet numbering (`A-02.1` through `A-02.4`) confirmed in generated HTML.
  - `/dev/primitives` successfully excluded from production export (`out/dev` deleted).
- **Result:** PASS (Script-verified) ✓

### 3. Circular Navigation & Enquire CTA Link Wiring (`WORK-05`)
- **Criteria:** Next project links wrap around circularly (Project 04 links back to Project 01). Enquire CTA links to `/contact?type=[discipline]`.
- **Verification:**
  - Verified via HTTP test script against all 4 project detail routes.
- **Result:** PASS (Script-verified) ✓

### 4. Work Index Visual Layout & Filter Chips Feel (`WORK-03`, `WORK-04`)
- **Criteria:** 2-column desktop / 1-column mobile grid; filter chips (All, Architecture, Interior, Landscape, Product) update view instantly with smooth stagger and synchronized URL parameters (`/work/?type=...`); 2px red focus ring.
- **Status:** awaiting user verification
- **Notes:** DOM elements and URL pushState confirmed in script; visual layout, typography, and chip interaction feel require user verification in browser.

### 5. Pinned Sketch-to-Photo Scrub Experience (`WORK-06`)
- **Criteria:** `SketchScrub` component pins smoothly for `+=150%` (`scrub: 0.7`), progressing from 01 Sketch through 02 Develop, 03 Build, to 04 Handover. Linework dissolves smoothly into color wash and outcome rendering. Unpins and renders manual toggle under `prefers-reduced-motion`.
- **Status:** awaiting user verification
- **Notes:** GSAP ScrollTrigger timeline and reduced-motion fallback code in place; pinning physics, dissolve timing, and visual quality require user verification.

### 6. Project Detail Page Visual Presentation (`WORK-05`)
- **Criteria:** Large Instrument Serif title, monospace metadata strip, italic brief placeholder `[NEEDED: Project brief from studio, 2–3 sentences]`, process technical studies with `[NEEDED]` captions, and outcome gallery cards with `[NEEDED: Outcome photo] · PHOTO TBC` badges.
- **Status:** awaiting user verification
- **Notes:** Content renders without invented specifics; visual hierarchy and drafting sheet aesthetic require user verification.

## Gaps

Awaiting user visual inspection at http://localhost:3005/work/ and http://localhost:3005/work/placeholder-project-01/.
