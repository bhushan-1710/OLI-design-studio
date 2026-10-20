# Phase 4 Context: Work Index & Projects

## 1. Objective
Deliver the complete project portfolio experience:
1. **Typed Project Data Model & Build Validation** (`WORK-01`, `WORK-02`):
   - Strict TypeScript schema in `content/projects.ts` enforcing `coverImage`, `brief`, `images.length >= 3`, and `isPlaceholder: boolean`.
   - Build-time validation guard asserting that all projects meet the schema and that unflagged placeholder projects cannot ship to production.
   - Seeded with 4 distinct, obviously fake placeholder projects representing all four studio disciplines: Architecture, Interior, Landscape, Product Design ("Placeholder Project 01" to "04", all "Location TBC", `isPlaceholder: true`).
2. **Work Index Page** (`WORK-03`, `WORK-04`):
   - Located at `/work` (Sheet A-02 in the title block).
   - Filter chips (All, Architecture, Interior, Landscape, Product) with instant client-side filtering and URL query parameter sync (`/work?type=...`).
   - Responsive grid: 2 columns on desktop (≥769px), 1 column on mobile (≤768px).
   - Empty state message: "Nothing here yet. Try another discipline."
   - Clickable cards linking to `/work/[slug]` with red focus rings.
3. **Project Detail Template** (`WORK-05`, `WORK-06`):
   - Dynamic route `/work/[slug]` with `generateStaticParams()` for static HTML export.
   - SheetTitleBlock with dynamic sheet numbering (`A-03`, `A-04`, etc.) and project title.
   - Title in large Instrument Serif, metadata row in DM Mono caps (`Discipline · Location · Year · Area`), and 2-3 sentence brief.
   - Signature **Sketch-to-Photo Scrub** component (`components/work/SketchScrub.tsx`):
     - Pinned for `+=150%` with `scrub: 0.7`.
     - 0% to 50%: architectural SVG linework fades down.
     - 50% to 100%: full color rendering/photograph washes in to 100% opacity.
     - Reduced-motion fallback: unpinned, shows final render with linework toggle.
   - Process drawings and outcome gallery.
   - Next-project navigation bar ("Next project →") with circular wrap-around and "Planning something similar? Enquire" CTA.

---

## 2. Settled Decisions

### 2.1 Project Data Schema (`WORK-01`, `WORK-02`)
- **Strict fields:** `slug`, `title`, `discipline`, `location`, `year`, `area`, `brief`, `isPlaceholder`, `coverImage`, `images`, `drawingSvg`.
- **Validation:** Throws at build time if any project with "Placeholder" in title or "Location TBC" has `isPlaceholder !== true`, or if `images.length < 3`.

### 2.2 Work Index (`WORK-03`, `WORK-04`)
- **Route:** `app/work/page.tsx`
- **Sheet Frame:** `SheetFrame` + `SheetTitleBlock sheetNumber="A-02" title="WORK INDEX" scale="1:100"`
- **Filtering:** Instant DOM filtering without router reload, synchronized with `?type=` query param.
- **Layout:** 2 columns desktop, 1 column mobile.

### 2.3 Project Detail (`WORK-05`, `WORK-06`)
- **Route:** `app/work/[slug]/page.tsx`
- **Dynamic params:** Generated via `generateStaticParams()` exporting all seeded slugs.
- **Scrub interaction:** Pinned for `+=150%` (`scrub: 0.7`), GSAP context with full cleanup on unmount.
- **Next link:** Loops back to first project after the last project.
