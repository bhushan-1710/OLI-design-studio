# Plan 04-02 Summary: Project Detail Template & Sketch-to-Photo Scrub

## Completed Work

1. **Dynamic Route Architecture (`app/work/[slug]/page.tsx`)**:
   - Implemented `generateStaticParams()` pre-rendering all projects (`placeholder-project-01` to `placeholder-project-04`).
   - Dynamic architectural sheet numbering:
     - `placeholder-project-01`: `SHEET A-03`
     - `placeholder-project-02`: `SHEET A-04`
     - `placeholder-project-03`: `SHEET A-05`
     - `placeholder-project-04`: `SHEET A-06`
   - Sheet TitleBlock integration with project name and scale (`Scale 1:50`).
   - Breadcrumb navigation: `← ALL WORK` returning to `/work/`.
   - Large Instrument Serif headline, monospace metadata string (`Discipline · Location · Year · Scale`), and italic brief.

2. **Signature Sketch-to-Photo Scrub Component (`components/work/SketchScrub.tsx`)**:
   - Pinned GSAP ScrollTrigger container (`pin: true`, `end: '+=150%'`, `scrub: 0.7`).
   - Dual-layer composition:
     - Top layer: Architectural drafting SVG linework with construction guides, structural outlines, glazing mullions, dimension strings (`6,000 MM`, `4,200 MM`), and hand-lettered cursive drafting notes.
     - Bottom layer: Warm architectural massing volumes with washed concrete and teak materials, simulating daylight and glazing.
   - Timeline scrub dynamics:
     - 0% to 50%: Linework dims down to 0.15; construction lines dissolve.
     - 30% to 90%: Color wash and material photo dissolve in from 0 to 1 with 1.0 scale settle.
     - 90% to 100%: Linework drops to zero opacity for crystal-clear outcome view.
   - Status indicator tracking phases: `PHASE 01 // DRAFTING` → `PHASE 02 // DEVELOP & BUILD` → `PHASE 04 // HANDOVER OUTCOME`.
   - Accessible reduced-motion handling: Unpinned with manual "View Linework" / "View Handover Photo" toggle tabs.
   - Strict cleanup with `gsap.context()` and `ctx.revert()`.

3. **Process Documentation & Studies**:
   - Grid of architectural process vignettes:
     - `FIG 01 // CONCEPT SCHEMATIC PLAN` (courtyard, circulation, and boundary geometry)
     - `FIG 02 // STRUCTURAL SECTION STUDY` (parapet datum, ceiling height, volume cuts)
     - `FIG 03 // FABRICATION & ASSEMBLY DETAIL` (fluted joinery, module junction)

4. **Outcome Gallery & Circular Next-Project Navigation**:
   - Spatial photography placeholders with geometric grid frames and explicit `OUTCOME VIEW [N] · PHOTO TBC` badges.
   - Circular next-project navigation footer bar linking to the next project in sequence (wrapping from 04 back to 01).
   - "Planning something similar? Enquire" secondary button linking to `/contact?type=[discipline]`.

## Verification
- `npm run build`: Succeeded with code 0; 13/13 static pages generated; First Load JS on `/work/[slug]` is 141 kB.
- `scripts/verify-project-detail.mjs`: All 4 project routes return HTTP 200, dynamic sheet numbers verified, SketchScrub verified, process studies verified, outcome galleries verified, next-project circular navigation verified, static files in `out/work/` verified.
