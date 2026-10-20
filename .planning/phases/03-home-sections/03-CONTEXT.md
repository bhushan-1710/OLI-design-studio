# Phase 3 Context: Home Sections

## 1. Objective
Build all sections on the Home page (`app/page.tsx`) following the Hero:
1. **DimensionRule Divider** (e.g. `4.2 M`) with scroll-triggered stroke draw.
2. **Selected Work Section** (`components/sections/SelectedWorkSection.tsx`): Section heading, "All work →" link, and 3 project cards (`components/ui/ProjectCard.tsx`) featuring monochrome geometric placeholder rectangles with explicit "PHOTO TBC" labels and scroll-triggered sketch outline overlays.
3. **Process Section** (`components/sections/ProcessSection.tsx`): Pinned horizontal scroll on desktop (`travel = (panels - 1) × viewport width`, `end: +=300%`, `scrub: 1`) progressing through 4 architectural drafting vignettes (01 loose concept lines, 02 dimensioned plan, 03 structural grid/frame, 04 completed elevation with stamp). Responsive unpinned vertical stack fallback on mobile (≤820px) drawing on enter.
4. **Disciplines Section** (`components/sections/DisciplinesSection.tsx`): Large serif typography (Architecture, Interior, Landscape, Product); desktop hover/focus draws discipline sketch and rotates arrow 45°; mobile tap toggles sketch inline.
5. **Closing CTA Section** (`components/sections/ClosingCtaSection.tsx`): Heading ("Have a project in mind?"), subhead, wobbly Enquire button linking to `/contact`, WhatsApp link to `https://wa.me/` marked clearly as placeholder, and real email link (`olidesignstudio06@gmail.com`).
6. **Dual Pin Release & Geometry Verification**: Ensure both Hero pin and Process pin release cleanly, with correct document height after fonts load and on viewport resize, verified at 390px and 1280px in both light and dark themes.

---

## 2. Settled Decisions

### 2.1 Selected Work Cards (`HOME-01`, `HOME-02`)
- **Card Content:** 3 cards using obviously fake seed data (`Placeholder Project 01`, `02`, `03`, `Location TBC`, disciplines: Architecture, Interior, Landscape).
- **Placeholder Visuals:** Monochrome geometric placeholder rectangles with a visible "PHOTO TBC" badge and drafting linework sketch outline overlay.
- **Scroll & Hover Motion:**
  - Enter (`top 80%`): sketch outline draws (0.9s) &rarr; card clip-path reveals (`inset(100% 0 0 0)` &rarr; `inset(0)`, 0.8s) &rarr; meta text fades up.
  - Desktop hover: card scales subtly to 1.03 over 0.5s; red underline draws under project name.
  - Mobile: enter animation runs; hover disabled.

### 2.2 Process Section (`HOME-03`, `HOME-04`)
- **Copy (from `content.md`):**
  - Heading: "How a project moves." [DRAFT]
  - 01 Sketch: "We start on paper: your site, your brief, first ideas drawn by hand."
  - 02 Develop: "Ideas become plans, sections and materials you can review and change."
  - 03 Build: "We detail the drawings, coordinate vendors and visit site as it goes up."
  - 04 Handover: "You receive the finished space and the documents behind it."
- **Drawings:** 4 architectural drafting vignettes:
  - 01 Sketch: Loose concept curves, site boundary, and north arrow.
  - 02 Develop: Dimensioned floor plan with room labels and door swings.
  - 03 Build: Structural frame, column grid, and material cross-hatch.
  - 04 Handover: Completed elevation with "APPROVED / HANDED OVER" red stamp.
- **Desktop Motion (&ge;821px):**
  - Container pinned with ScrollTrigger (`start: "top top"`, `end: "+=300%"`, `scrub: 1`, `pin: true`).
  - Panels translate on X: `xPercent: -100 * (panels.length - 1)`.
  - Drawings animate during the middle 60% of each panel's visibility window.
  - Tracker highlights current panel index.
- **Mobile Fallback (&le;820px):**
  - No pinning; panels stack vertically in normal document flow.
  - Each panel's drawing draws once when entering viewport (`top 75%`).

### 2.3 Disciplines Section (`HOME-05`)
- **Items:** Architecture · Interior · Landscape · Product Design in large Instrument Serif italic/roman.
- **Arrow:** Red SVG arrow beside each item (`↗`).
- **Drawings:** Small dedicated drafting SVGs (e.g. massing elevation, chair section, garden contour, luminaire detail) hidden by default.
- **Interactions:**
  - Desktop: Hover or keyboard focus draws the SVG linework (0.6s) and rotates arrow to 90° (&rarr;).
  - Mobile: Tap toggles the drawing open/closed inline with smooth accordion expansion.

### 2.4 Closing CTA Section (`HOME-06`)
- **Heading:** "Have a project in mind?" (Instrument Serif).
- **Sub:** "Tell us the site, the scale and when you'd like to start."
- **Actions:**
  - Primary button: Wobbly red "Send an enquiry" linking to `/contact`.
  - Secondary button / link: "WhatsApp us" (`https://wa.me/` clearly flagged with placeholder title/comment `[NEEDED: Studio WhatsApp number]`).
  - Direct email: `olidesignstudio06@gmail.com`.

### 2.5 Dual Pin Safety & Page Geometry
- Both HeroSection and ProcessSection use `gsap.context()` with clean `ctx.revert()` on unmount.
- When both pinned sections exist on the same page, ensure:
  1. Only one pinned scene is active at a given scroll position.
  2. Pin spacers (`.pin-spacer`) do not conflict or cause compounding blank space.
  3. `ScrollTrigger.refresh()` runs on `document.fonts.ready` and window resize.
  4. Tested at 390px (where Process is unpinned) and 1280px (both pinned sequentially).

---

## 3. Verification Criteria
- [ ] DimensionRule divider draws left-to-right on scroll enter.
- [ ] 3 Selected Work cards render with "PHOTO TBC" placeholders and trigger sketch-draw + clip reveals.
- [ ] Process section pins on desktop (&ge;821px) and scrubs horizontally across 4 panels with vignette drawings.
- [ ] Process section collapses to vertical unpinned stack on mobile (&le;820px).
- [ ] Disciplines list reveals linework on hover (desktop) and tap (mobile).
- [ ] Closing CTA displays headline, wobbly Enquire button, and WhatsApp placeholder.
- [ ] Both Hero pin and Process pin release cleanly; zero layout jumps or ghost spacing.
- [ ] Static export `npm run build` passes with 0 errors.
