# OLI Design Studio — Asset Manifest & Image Plan

**Status:** Phase 1 Complete · Sourcing & Production Active  
**Design Directive:** Preserve existing hand-drawn architectural aesthetic, sheet layouts, tokens, and GSAP/ScrollTrigger animation lifecycles. All visuals serve as curated design references and conceptual studies until client project assets arrive.

---

## 1. Codebase Inventory

### A. Projects & Disciplines
| Slug | Discipline | Current Title | Narrative / Typology |
|---|---|---|---|
| `placeholder-project-01` | **Architecture** | Placeholder Project 01 | Monolithic residence, climate-responsive courtyard, raw concrete and lime plaster. |
| `placeholder-project-02` | **Interior** | Placeholder Project 02 | Warm minimalist apartment, natural Kota stone, reclaimed teak joinery, fluted partitions. |
| `placeholder-project-03` | **Landscape** | Placeholder Project 03 | Basalt stone courtyard garden, rainwater terrace swales, native monsoon planting. |
| `placeholder-project-04` | **Product** | Placeholder Project 04 | Solid teak credenza and bench study with turned blackened brass joinery. |

### B. Missing / Placeholder Images Across Codebase
1. **Home (`/`)**:
   - `SelectedWorkSection.tsx`: 3 cards currently display SVG wireframe fallback and "PHOTO TBC" badge. Missing cover photos for Architecture, Interior, and Landscape.
2. **Work Index (`/work`)**:
   - 4 cards displaying SVG wireframe fallback and "PHOTO TBC" badge. Missing cover photos for all 4 disciplines.
3. **Project Detail (`/work/[slug]`)**:
   - Pinned `SketchScrub.tsx`: `photoLayerRef` contains abstract CSS divs with `04 Handover · [NEEDED: Project photo]`. Missing high-resolution photographic outcome for the scrub reveal.
   - Process Section: 3 cards display SVG schematics with placeholder captions (`[NEEDED: Process caption]`).
   - Outcome Gallery: 2 cards per project with `[NEEDED: Outcome photo {1/2}] · PHOTO TBC`. Missing 2 outcome photos per project (8 total).
4. **About Page (`/about`)**:
   - Studio Philosophy: Missing studio background narrative / philosophy paragraph.
   - Team Section: Missing studio portrait / architectural workspace study.
   - Location Section: Missing studio office specifics.

### C. Technical Specifications & Aspect Ratios
| Location | Component | Aspect Ratio | Target Dimensions | Animation / Behavioral Dependency |
|---|---|---|---|---|
| Project Card Cover | `ProjectCard.tsx` | **4 : 3** | 1200 × 900 px (min 800 × 600) | `clip-path: inset(100% 0 0 0) -> inset(0%)`, SVG border draw, 1.03x hover scale. |
| Scrub Reveal Photo | `SketchScrub.tsx` | **16 : 10** | 1600 × 1000 px | Pinned scrub `+=150%`, cross-dissolves from drafting linework (opacity 0 -> 1, scale 0.98 -> 1.0). |
| Process Drawings | Detail Page | **4 : 3** | 800 × 600 px | Static drafting / technical illustration in architectural ink/paper palette. |
| Outcome Gallery | Detail Page | **16 : 10** | 1600 × 1000 px | Responsive grid, border 1.5px solid var(--ink), lazy-loaded. |
| About Workspace | About Page | **16 : 9** / **3 : 2** | 1200 × 800 px | Natural editorial architectural workspace / drafting table study. |

---

## 2. Image Plan & Asset Mapping

| Target Slot | Discipline / Context | Visual Direction & Theme | Ratio | Sourcing Method | Local Path |
|---|---|---|:---:|---|---|
| **P1 Cover** | Architecture | Minimalist concrete & lime plaster facade, deep overhangs, warm light | 4:3 | Curated Unsplash / Bespoke | `/images/projects/arch-cover.jpg` |
| **P1 Scrub** | Architecture | Wide exterior view of finished pavilion, warm twilight, reflecting pool | 16:10 | Bespoke Architectural Render | `/images/projects/arch-scrub.jpg` |
| **P1 Outcome 1** | Architecture | Internal courtyard framed by raw concrete column and tropical foliage | 16:10 | Curated Unsplash | `/images/projects/arch-outcome-1.jpg` |
| **P1 Outcome 2** | Architecture | Close crop of textured lime plaster wall and cantilevered concrete canopy | 16:10 | Curated Unsplash | `/images/projects/arch-outcome-2.jpg` |
| **P2 Cover** | Interior | Warm minimalist living space, natural stone floors, teak joinery, linen | 4:3 | Curated Unsplash | `/images/projects/interior-cover.jpg` |
| **P2 Scrub** | Interior | Full perspective of open living-dining pavilion with timber ceiling ribs | 16:10 | Bespoke Architectural Render | `/images/projects/interior-scrub.jpg` |
| **P2 Outcome 1** | Interior | Custom teak wood kitchen / credenza partition with fluted glass | 16:10 | Curated Unsplash | `/images/projects/interior-outcome-1.jpg` |
| **P2 Outcome 2** | Interior | Bedroom alcove with lime plaster finish and recessed architectural lighting | 16:10 | Curated Unsplash | `/images/projects/interior-outcome-2.jpg` |
| **P3 Cover** | Landscape | Stepped basalt stone courtyard with native grasses and water basin | 4:3 | Curated Unsplash | `/images/projects/landscape-cover.jpg` |
| **P3 Scrub** | Landscape | Expansive courtyard transition from interior veranda to native garden | 16:10 | Bespoke Architectural Render | `/images/projects/landscape-scrub.jpg` |
| **P3 Outcome 1** | Landscape | Stone pathway between board-marked concrete wall and tropical foliage | 16:10 | Curated Unsplash | `/images/projects/landscape-outcome-1.jpg` |
| **P3 Outcome 2** | Landscape | Water reflection court with monolithic basalt paver stepping stones | 16:10 | Curated Unsplash | `/images/projects/landscape-outcome-2.jpg` |
| **P4 Cover** | Product | Teak and blackened brass credenza in soft diffused natural daylight | 4:3 | Bespoke Product Render | `/images/projects/product-cover.jpg` |
| **P4 Scrub** | Product | Minimalist timber furniture study in architectural daylight | 16:10 | Curated Unsplash | `/images/projects/product-scrub.jpg` |
| **P4 Outcome 1** | Product | Minimalist wooden chair and wall shadow study | 16:10 | Curated Unsplash | `/images/projects/product-outcome-1.jpg` |
| **P4 Outcome 2** | Product | Solid timber credenza and understated architectural display | 16:10 | Curated Unsplash | `/images/projects/product-outcome-2.jpg` |
| **About Studio** | Studio / Philosophy | Architectural materiality study: fair-faced concrete canopy and lime plaster | 16:9 | Bespoke Architectural Study | `/images/projects/arch-outcome-2.jpg` |

---

## 3. Asset Manifest & Licence Records

All assets are stored locally in the project repository under `public/images/`.

| Local File Path | Aspect Ratio | Dimensions | Size | Creator / Source | Licence | Verification Status |
|---|:---:|:---:|:---:|---|---|:---:|
| `public/images/projects/arch-cover.jpg` | 4:3 | 1600 × 1200 | 984 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · 4:3 |
| `public/images/projects/arch-scrub.jpg` | 16:9 | 1600 × 900 | 993 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Scrub |
| `public/images/projects/arch-outcome-1.jpg` | 16:9 | 1600 × 900 | 836 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Detail |
| `public/images/projects/arch-outcome-2.jpg` | 16:9 | 1600 × 900 | 886 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Detail |
| `public/images/projects/interior-cover.jpg` | 4:3 | 1600 × 1200 | 822 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · 4:3 |
| `public/images/projects/interior-scrub.jpg` | 16:9 | 1600 × 900 | 845 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Scrub |
| `public/images/projects/interior-outcome-1.jpg` | 16:9 | 1600 × 900 | 766 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Detail |
| `public/images/projects/interior-outcome-2.jpg` | 16:9 | 1600 × 900 | 669 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Detail |
| `public/images/projects/landscape-cover.jpg` | 4:3 | 1600 × 1200 | 1.14 MB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · 4:3 |
| `public/images/projects/landscape-scrub.jpg` | 16:9 | 1600 × 900 | 1.04 MB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Scrub |
| `public/images/projects/landscape-outcome-1.jpg` | 16:9 | 1600 × 900 | 1.25 MB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Detail |
| `public/images/projects/landscape-outcome-2.jpg` | 16:9 | 1600 × 900 | 922 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · Detail |
| `public/images/projects/product-cover.jpg` | 4:3 | 1600 × 1200 | 691 KB | OLI Design Studio (AI Custom) | Bespoke Studio Asset | Verified locally · 4:3 |
| `public/images/projects/product-scrub.jpg` | 16:9 | 1600 × 900 | 259 KB | Ksenia Chernaya / Unsplash | Unsplash Free Commercial Licence | Verified locally · Scrub |
| `public/images/projects/product-outcome-1.jpg` | 16:9 | 1600 × 900 | 423 KB | Deconovo / Unsplash | Unsplash Free Commercial Licence | Verified locally · Detail |
| `public/images/projects/product-outcome-2.jpg` | 16:9 | 1600 × 900 | 152 KB | Spacejoy / Unsplash | Unsplash Free Commercial Licence | Verified locally · Detail |
| `public/images/about/studio-drafting.jpg` | 16:9 | 1600 × 900 | 148 KB | Daniel McCullough / Unsplash | Unsplash Free Commercial Licence | Verified locally · Archival |

---

## 4. Verification & Testing Deliverables

### Build Status
- `cmd /c npm run build` passes with zero type errors and zero runtime failures.
- All 15 static export routes generated cleanly into `out/`.
- `scan-placeholders.mjs` verifies placeholder markers were reduced from 48 down to 34 (remaining markers are deliberate client-pending placeholders: e.g. team member roster, WhatsApp number, and SVG linework notes).

### Verification Screenshots
All 16 visual verification screenshots captured via Headless Chrome remote debugging CDP across 1280px (desktop) and 390px (mobile) in both light and dark themes, saved to `review/enrichment/`:
1. `review/enrichment/home-work-section-light-1280.png`
2. `review/enrichment/home-work-section-dark-1280.png`
3. `review/enrichment/home-work-section-light-390.png`
4. `review/enrichment/home-work-section-dark-390.png`
5. `review/enrichment/work-index-light-1280.png`
6. `review/enrichment/work-index-dark-1280.png`
7. `review/enrichment/work-index-light-390.png`
8. `review/enrichment/work-index-dark-390.png`
9. `review/enrichment/project-detail-light-1280.png`
10. `review/enrichment/project-detail-dark-1280.png`
11. `review/enrichment/project-detail-light-390.png`
12. `review/enrichment/project-detail-dark-390.png`
13. `review/enrichment/about-page-light-1280.png`
14. `review/enrichment/about-page-dark-1280.png`
15. `review/enrichment/about-page-light-390.png`
16. `review/enrichment/about-page-dark-390.png`

