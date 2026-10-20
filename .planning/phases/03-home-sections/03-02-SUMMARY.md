# Plan 03-02 Summary: ProcessSection (Horizontal Scrub & Mobile Stack)

## Completed Work
1. **Built `ProcessSection.tsx` (`components/sections/ProcessSection.tsx`):**
   - Section header: "How a project moves." in Instrument Serif.
   - Stage indicators displaying current active stage index (`01 Sketch`, `02 Develop`, `03 Build`, `04 Handover`).
   - 4 horizontal panels featuring copy from `content.md`:
     - `01 Sketch`: Concept on paper with organic site sketch, boundary lines, and north arrow.
     - `02 Develop`: Measured architecture with 2D dimensioned floor plan, door swing arcs, and dimension ticks.
     - `03 Build`: Structure & execution with isometric column frame, beam grid, and cross bracing.
     - `04 Handover`: Complete reality with elevation outline, marker wash fills, and "HANDED OVER" stamp.
2. **Responsive Motion via `gsap.matchMedia()`:**
   - **Desktop (&ge;821px):** Pinned horizontal scroll (`+=300%`, `scrub: 1`, translating on X via `xPercent: -100 * (panels.length - 1)`). Vignette drawings animate during panel scroll.
   - **Mobile (&le;820px):** Unpinned vertical stack; drawings trigger single-run stroke draw on scroll enter (`top 75%`).
   - **Reduced Motion:** Fully drawn immediately with no pinning and no Lenis.
3. **Responsive Styles in `styles/base.css`:**
   - On &le;820px, `.desktop-process-indicators` hidden, `.process-panels-track` switches to column layout, and panels adjust to natural height.
4. **Static Export Build:**
   - `npm run build` static export succeeded with 0 errors across 9 static routes.

## Verification Criteria Status
- [x] HOME-03: Process section with pinned horizontal scroll on desktop (`+=300%`, `scrub: 1`, drawings complete during panel scroll).
- [x] HOME-04: Process section responsive mobile fallback (≤820px) stacking panels vertically with single-trigger drawing on enter.
