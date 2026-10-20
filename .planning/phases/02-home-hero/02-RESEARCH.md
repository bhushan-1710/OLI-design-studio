# Phase 2 Research: Home Hero

## 1. Domain & Scope
Port the approved standalone prototype [`docs/reference/oli-hero.html`](file:///C:/Users/User/OneDrive/Desktop/Clients/OLI%20Design%20Studio/docs/reference/oli-hero.html) into Next.js App Router client components (`components/sections/HeroSection.tsx` and `components/sections/HeroElevation.tsx`), satisfying requirements **HERO-01** through **HERO-06**.

---

## 2. GSAP & ScrollTrigger in Next.js App Router Client Components

### 2.1 React 18 Strict Mode & Double-Mount Prevention
In React 18 strict mode (default in `next dev`), components mount, immediately unmount, and mount again to detect effect cleanup leaks. If ScrollTrigger pins are created without clean reversion:
- Double pin spacer elements (`.pin-spacer`) are created in the DOM.
- Extra blank space (e.g. 300% or 600% viewport height) is injected permanently into the document flow.
- Markers and scroll positions get corrupted.

**Standard Solution:**
Wrap all GSAP animations and ScrollTrigger instances inside `gsap.context()`:
```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // ScrollTrigger.create or tl.to(...) with scrollTrigger
  }, containerRef);

  return () => ctx.revert(); // Completely reverts DOM changes, kills triggers & tweens
}, []);
```
Because Next.js App Router performs SSR, `useLayoutEffect` produces a server warning if not guarded. In Phase 1 we established client component patterns where either `useEffect` is used or an isomorphic layout effect check (`typeof window !== 'undefined' ? useLayoutEffect : useEffect`) is applied.

### 2.2 Lenis + ScrollTrigger Synchronization
In Phase 1, `lib/motion/lenis.ts` established:
1. `lenis.on('scroll', ScrollTrigger.update)`: Syncs Lenis scroll coordinates to ScrollTrigger.
2. `gsap.ticker.add((time) => lenis.raf(time * 1000))`: Uses GSAP's central ticker for Lenis RAF updates.
3. `gsap.ticker.lagSmoothing(0)`: Eliminates frame-skipping jumps.

### 2.3 Font Loading Geometry Recalculation
Instrument Serif and Just Another Hand alter headline metrics and container heights upon completing download. To prevent pin geometry miscalculations:
```tsx
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
}
```

---

## 3. Dark Mode Wash & Linework Contrast Analysis

### 3.1 The Contrast Problem
In `oli-hero.html`, linework is drawn with `stroke: var(--ink)` and washes are rendered with raw hex colors:
- Light Theme:
  - `--paper`: `#F2EEE4` (Luminance ~0.85)
  - `--ink`: `#2B2926` (Luminance ~0.02)
  - Washes: `#D8C8AA` (sand), `#CDC6B8` (concrete), `#9DB6BA` (glass)
  - Linework contrast on wash: ~5:1 to 8:1 (Dark ink on light fill = **Crisp, highly readable**).
- Dark Theme:
  - `--paper`: `#1C1B19` (Luminance ~0.012)
  - `--ink`: `#ECE6D9` (Luminance ~0.77)
  - Washes at ~88% opacity: `#D8C8AA`, `#CDC6B8`, `#9DB6BA` (Luminance ~0.35 to ~0.55)
  - Linework contrast on wash: Light cream linework (`#ECE6D9`) directly over light fills (`#CDC6B8`) drops to **~1.4:1**, making window frames, mullions, and roof contours practically invisible when the wash rises!

### 3.2 Calibrated Dark-Mode Wash Strategy
To keep linework crisp in dark mode without altering the marker-wash aesthetic in light mode:
1. Expose marker-wash tokens in `styles/tokens.css` with dark theme overrides (e.g. deeper, tinted architectural shades on `:root[data-theme="dark"]`):
   - `--wash-sand`: `#D8C8AA` (light) &rarr; `#3A3428` (dark)
   - `--wash-concrete`: `#CDC6B8` (light) &rarr; `#36332E` (dark)
   - `--wash-glass`: `#9DB6BA` (light) &rarr; `#24373B` (dark)
   - `--wash-timber`: `#8A5A3C` (light) &rarr; `#3D271A` (dark)
   - `--wash-sage`: `#8FA27A` (light) &rarr; `#283422` (dark)
   - `--wash-shrub`: `#7C9168` (light) &rarr; `#222E1A` (dark)
   - `--wash-slab`: `#4A4743` (light) &rarr; `#282623` (dark)
   - `--wash-ground`: `#BDB4A1` (light) &rarr; `#332F28` (dark)
2. On dark paper (`#1C1B19`), deeper wash fills provide a rich, tinted watercolor background while allowing cream linework (`#ECE6D9`) to shine with > 4.5:1 contrast!
3. This is incorporated as an explicit audit step in Plan 02-02 to review side-by-side and confirm with the user before committing.

---

## 4. SVG Layer Breakdown & Wobble Filter

### 4.1 Layers in `HeroElevation.tsx`
- `.cl`: Construction lines (`pathLength="1"`, `stroke-width: 0.9`, `opacity: 0.35`).
- `.s1`: Primary outline (`pathLength="1"`, `stroke-width: 2.8`).
- `.s2`: Secondary contour & detail (`pathLength="1"`, `stroke-width: 1.7`).
- `.dim`: Dimension lines and end ticks (`pathLength="1"`, `stroke-width: 1.4`, `stroke: var(--red)`).
- `.note`: Handwritten notes with arrows (`fill: var(--red)`, `font-family: var(--font-hand)`).
- `#washes`: Polygon and path fills grouped inside `<g id="washes" opacity="0.88" clip-path="url(#wash-clip-path)">`.
- `#wash-clip`: SVG `<clipPath id="wash-clip-path"><rect id="wash-clip" ... /></clipPath>` animated vertically from ground to roof.
- `#stamp`: `<g id="stamp" class="stamp">` with `<rect>` and `<text>` rotated -5°.

### 4.2 Desktop Wobble Filter
- `<filter id="pnp">` defined in `<defs>`.
- In CSS:
  ```css
  @media (min-width: 769px) {
    .hero-art-drawing {
      filter: url(#pnp);
    }
  }
  @media (max-width: 768px) {
    .hero-art-drawing {
      filter: none;
    }
  }
  ```
- Stripping the filter on &le;768px prevents mobile GPU stutter and battery drain.
