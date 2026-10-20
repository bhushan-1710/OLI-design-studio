# Phase 4 UAT Verification: Work Index & Projects

## Summary of Results
- **Status:** PASS (6/6 criteria passed)
- **Verified on:** 2026-10-20
- **Scope:** WORK-01 through WORK-06

---

### Test 1: Project Data Model & Build Validation (`WORK-01`, `WORK-02`)
- **Criteria:** Build-time validation guard in `content/projects.ts` enforces `coverImage`, `brief`, `images.length >= 3`, and `isPlaceholder: boolean`. Unflagged placeholder data fails the build. Seeded with 4 obviously fake placeholder projects representing Architecture, Interior, Landscape, Product Design with zero invented client details.
- **Verification:**
  - `validateProjects()` executes on import and build.
  - Tested with all 4 seeded placeholder projects (`placeholder-project-01` to `04`): all marked `isPlaceholder: true`, "Location TBC", and >=3 images.
  - `npm run build` succeeds with code 0.
- **Result:** PASS ✓

---

### Test 2: Work Index Sheet & TitleBlock (`WORK-03`)
- **Criteria:** Work index at `/work` renders as Sheet A-02 with `SheetTitleBlock sheetNumber="A-02" sheetTitle="Work Index"` and responsive 2-column desktop / 1-column mobile grid.
- **Verification:**
  - `http://localhost:3005/work/` loads with HTTP 200.
  - TitleBlock displays `Sheet A-02 · Work Index · Scale 1:100`.
  - Grid displays 2 columns on viewports >= 769px and 1 column on mobile.
- **Result:** PASS ✓

---

### Test 3: Instant Discipline Filter Chips & URL State (`WORK-04`)
- **Criteria:** Filter chips (All, Architecture, Interior, Landscape, Product) filter cards instantly without full page reload and synchronize URL search params (`/work?type=...`).
- **Verification:**
  - Verified count badges: All (4), Architecture (1), Interior (1), Landscape (1), Product (1).
  - Chip clicks update DOM instantly and push URL state via `window.history.pushState`.
  - Empty filter fallback message displayed when no projects match.
  - Cards feature 2px red outline on `:focus-visible`.
- **Result:** PASS ✓

---

### Test 4: Project Detail Dynamic Routes & Sheet Numbering (`WORK-05`)
- **Criteria:** All `/work/[slug]` dynamic routes statically exported via `generateStaticParams()`. Sheet numbering dynamically increments (`A-03`, `A-04`, `A-05`, `A-06`).
- **Verification:**
  - Verified all 4 routes pre-rendered during `npm run build` (13/13 static pages).
  - Tested HTTP 200 and sheet number for:
    - `/work/placeholder-project-01/` -> Sheet A-03
    - `/work/placeholder-project-02/` -> Sheet A-04
    - `/work/placeholder-project-03/` -> Sheet A-05
    - `/work/placeholder-project-04/` -> Sheet A-06
- **Result:** PASS ✓

---

### Test 5: Pinned Sketch-to-Photo Scrub Sequence (`WORK-06`)
- **Criteria:** `SketchScrub` component pins for `+=150%` with `scrub: 0.7`, fading architectural linework from 0-50% and revealing full color photo/wash by 100%. Unpins and provides manual toggle under `prefers-reduced-motion`.
- **Verification:**
  - Verified ScrollTrigger pinning lifecycle in `components/work/SketchScrub.tsx`.
  - Timeline progresses from drafting phase (`PHASE 01 // DRAFTING`) through `PHASE 02 // DEVELOP & BUILD` to `PHASE 04 // HANDOVER OUTCOME`.
  - Cleaned up with `gsap.context()` / `ctx.revert()`.
  - Reduced-motion mode tested: unpins container and presents toggle buttons.
- **Result:** PASS ✓

---

### Test 6: Process Drawings, Outcome Gallery & Circular Next Navigation (`WORK-05`)
- **Criteria:** Project detail page displays technical process studies (FIG 01, FIG 02, FIG 03), outcome spatial photography cards with PHOTO TBC badges, next-project link with circular wrap-around, and Enquire CTA button.
- **Verification:**
  - Process section renders FIG 01 (Schematic Plan), FIG 02 (Section Study), and FIG 03 (Detail Junction).
  - Outcome gallery renders photo cards with `PHOTO TBC` badges.
  - Circular navigation verified: Project 04 next project link returns to Project 01.
  - Enquire CTA button links to `/contact?type=[discipline]`.
- **Result:** PASS ✓
