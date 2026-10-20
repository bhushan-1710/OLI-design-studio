# Plan 02-01 Summary: Hero Elevation SVG & Primitives Relocation

## Completed Work
1. **Relocated UI Primitives Demo:**
   - Moved the Phase 1 UI primitives showcase from `app/page.tsx` to `app/dev/primitives/page.tsx` (`DEV-01 · Primitives`).
   - Cleaned `app/page.tsx` to prepare for mounting `<HeroSection />`.
2. **Built `HeroElevation.tsx` (`components/sections/HeroElevation.tsx`):**
   - Exact SVG linework and coordinates ported from `docs/reference/oli-hero.html` (`viewBox="0 0 1200 640"`).
   - Structured drawing layers:
     - `.cl`: Construction lines with `pathLength="1"`, `stroke-width: 0.9`, `opacity: 0.35`.
     - `.s1`: Primary outline contours (`pathLength="1"`, `stroke-width: 2.8`).
     - `.s2`: Secondary detail linework, window mullions, ground hatch (`pathLength="1"`, `stroke-width: 1.7`).
     - `.dim`: Dimension lines and end ticks (`pathLength="1"`, `stroke-width: 1.4`).
     - `.note`: Handwritten notes with arrow callouts in Just Another Hand font.
     - `#washes`: Watercolor fills grouped with `#rise` clip path at `0.88` opacity.
     - `.stamp`: Red bordered "HANDED OVER" stamp with `rect` and `text`.
3. **Pencil Wobble Filter & Mobile Sizing in `styles/base.css`:**
   - `<filter id="pencil">` with `<feTurbulence>` and `<feDisplacementMap>`.
   - Desktop-only wobble filter: enabled via `@media (min-width: 769px)` on `.hero-art-drawing`, stripped on `≤768px`.
   - Mobile SVG responsiveness: `width: 175%`, `margin-left: -37.5%`, `height: 40svh` on `≤820px`.
4. **Build Verification:**
   - `npm run build` static export succeeded with 0 errors across 9 static routes including `/dev/primitives`.

## Verification Criteria Status
- [x] HERO-01: Layer hierarchy preserved in React component (`.cl`, `.s1`, `.s2`, `.dim`, `.note`, wash group, `.stamp`).
- [x] HERO-05: Desktop-only pencil wobble filter (`feTurbulence` on ≥769px, removed on mobile).
- [x] HERO-06: Placeholder house elevation drawing structured with typed layers, ready to swap to real project trace.
