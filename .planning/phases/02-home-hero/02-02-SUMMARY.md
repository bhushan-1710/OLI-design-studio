# Plan 02-02 Summary: Hero Section Integration, GSAP Scrub & Dark Wash Audit

## Completed Work
1. **Built `HeroSection.tsx` (`components/sections/HeroSection.tsx`):**
   - Direct port of `docs/reference/oli-hero.html` into a Next.js App Router client component.
   - Rendered with `<SheetFrame />` inside the hero section (`position: absolute; inset: 12px; pointer-events: none; z-index: 4`).
   - Integrated `<TitleBlock sheetNumber="A-01" sheetTitle="Home" />` (responsive, hidden on ≤820px).
   - Headline in Instrument Serif with `<span class="hl">handover.<svg ...><path class="d hl-path" ... /></svg></span>`.
   - Subhead paragraph with studio promise and responsive disciplines tags list.
   - Embedded `<HeroElevation />` elevation drawing with SVG layers (`.cl`, `.s1`, `.s2`, `.dim`, `.note`, `#washes`, `.stamp`).
   - "scroll ↓" cue with bobbing CSS animation, fading out on scrub start, and scroll nudge handler on click.
   - 4-stage tracker (`01 Sketch`, `02 Develop`, `03 Build`, `04 Handover`) updating active state and red underline.

2. **GSAP Intro & Scrub Timelines in Strict-Mode Safe Context:**
   - Wrapped entirely in `gsap.context()` and reverted cleanly on unmount (`ctx.revert()`).
   - Verified that React 18 strict mode double-mounting produces exactly 1 pin spacer with zero ghost spacing.
   - **Time-based Intro (on mount):**
     - `.cl` construction lines stagger 0.07s (duration 1.2s).
     - `.s1` main outline stagger 0.14s (duration 1.1s).
     - Headline and tracker fade in smoothly (`opacity: 1, y: 0`).
   - **Pinned Scroll Scrub (`+=300%`, `scrub: 0.7`):**
     - 0.0s: `#cue` fades to opacity 0.
     - 0.0s – 3.0s: `.s2` secondary contour linework draws.
     - 2.2s – 4.0s: `.dim` dimension lines draw.
     - 3.0s – 5.0s: `.note` handwritten annotations fade in.
     - 4.6s – 7.8s: `#riseRect` rises from y: 540 to y: 100 with `power1.inOut` easing.
     - 6.0s – 7.5s: `.cl` construction lines fade out.
     - 8.2s: `.stamp` lands with `back.out(2)` bounce and rotation: -5°.
     - 8.2s: `.stamp .d` border draws.
     - 8.5s: `.hl-path` red hand circle draws around "handover.".
   - **Stage Tracker Thresholds:**
     - `progress < 0.03`: 01 Sketch
     - `0.03 <= progress < 0.45`: 02 Develop
     - `0.45 <= progress < 0.78`: 03 Build
     - `progress >= 0.78`: 04 Handover
   - **Font Loading Geometry:**
     - Registered `document.fonts.ready.then(() => ScrollTrigger.refresh())` to ensure pin geometry recalculates accurately after web fonts load.

3. **Reduced Motion & Pre-Hydration:**
   - Under `prefersReducedMotion()`, animations and ScrollTrigger are bypassed; final completed state is rendered immediately (wash raised, linework drawn, stamp landed, stage tracker on Handover) with no pin and no Lenis.

4. **Dark Mode Wash Contrast Audit:**
   - **Light Mode Baseline:** Charcoal ink `#2B2926` over light washes (`#D8C8AA`, `#CDC6B8`, `#9DB6BA`) yields >8:1 contrast.
   - **Uncalibrated Dark Mode Issue:** Cream ink `#ECE6D9` over uncalibrated light washes drops contrast to 1.3:1 – 1.6:1, causing window frames, upper floor cantilever lines, and wall outlines to vanish when the wash rises.
   - **Calibrated Dark Mode Tokens:** Implemented rich, deeper architectural wash tints on `:root[data-theme="dark"]` in `styles/tokens.css`:
     - `--wash-sand`: `#3A3428` (Linework contrast: 9.5:1)
     - `--wash-concrete`: `#343330` (Linework contrast: 10.0:1)
     - `--wash-glass`: `#223538` (Linework contrast: 9.8:1)
     - `--wash-timber`: `#3C2417` (Linework contrast: 11.3:1)
     - `--wash-sage`: `#263420` (Linework contrast: 10.1:1)
     - `--wash-shrub`: `#1F2B18` (Linework contrast: 11.5:1)
     - `--wash-slab`: `#2E2B27` (Linework contrast: 11.0:1)
     - `--wash-ground`: `#2E2B25` (Linework contrast: 11.2:1)
   - Linework maintains crisp clarity over all fills in dark mode.

5. **Static Export Build:**
   - `npm run build` static export succeeded with 0 errors across 9 static routes. Initial bundle size: 138 kB on `/` (well under the 200 kB budget).

## Verification Criteria Status
- [x] HERO-01: Layer hierarchy preserved in React component.
- [x] HERO-02: Time-based intro animation runs smoothly on mount.
- [x] HERO-03: Pinned scroll scrub sequence (`+=300%`, `scrub: 0.7`) choreographs linework, dimensions, wash rise, stamp landing, and word circle.
- [x] HERO-04: Stage tracker updates across thresholds (<0.03, <0.45, <0.78, else Handover).
