# Phase 2 Context: Home Hero

## 1. Objective
Port the approved prototype (`docs/reference/oli-hero.html`) into a production React client component (`components/sections/HeroSection.tsx`) for Next.js App Router, serving as the home page (`app/page.tsx`). Move the existing Phase 1 UI primitives demo from `app/page.tsx` to a dev-only route (`app/dev/primitives/page.tsx`).

---

## 2. Source of Truth & Precedence
- **Visuals and Motion:** `docs/reference/oli-hero.html` is the absolute reference for layout, timings, scrub easing, SVG paths, and stage thresholds.
- **Tokens & Theming:** `styles/tokens.css` and `docs/design.md` §3.
- **Engineering Rules:** `AGENTS.md` (no UI kits, strict-mode safe `gsap.context()`, `100svh`, `prefers-reduced-motion`).

---

## 3. Settled Decisions

### 3.1 Architecture & Component Structure
- **Section Component:** `components/sections/HeroSection.tsx` (client component `'use client'`).
- **Sheet Frame & TitleBlock:** Rendered directly inside `HeroSection.tsx`:
  - `SheetFrame`: `position: absolute; inset: 12px; pointer-events: none; z-index: 4;`
  - `TitleBlock`: Bottom-right, `sheetNumber="A-01"`, `sheetTitle="Home"`, hidden on &le;820px.
- **Scroll Spacer:** Minimal spacer container (`height: 70svh`, placeholder text for Selected Work) below the hero section to allow the pinned scrub (`end: +=300%`) to release and transition cleanly.
- **Primitives Demo Relocation:** Move the Phase 1 primitives showcase to `app/dev/primitives/page.tsx`. Clean `app/page.tsx` renders only `<HeroSection />` and the scroll release spacer.

### 3.2 Motion & Timeline Setup
- **Strict-Mode Safe Cleanup:** All GSAP timelines and ScrollTriggers MUST be instantiated inside `gsap.context((self) => { ... }, heroContainerRef)` within a `useLayoutEffect` / `useEffect` and cleaned up with `ctx.revert()` on unmount.
- **Lenis + ScrollTrigger Sync:** Uses the shared motion runtime initialized in Phase 1 (`lib/motion/lenis.ts`), ensuring `ScrollTrigger.update` is synchronized with the smooth scroll ticker.
- **Reduced Motion:** If `prefers-reduced-motion: reduce` matches:
  - Bypass intro and scroll timelines completely.
  - Render all strokes fully drawn (`strokeDashoffset = 0`), wash fully visible, stamp placed, and stage tracker at "Handover".
  - Hero is NOT pinned; normal document flow without Lenis.
- **Intro Timeline (Time-Based on Mount):**
  1. Construction lines (`.cl`): stagger 0.07s, duration 1.2s.
  2. Main outline (`.s1`, `.s2`): stagger 0.14s, duration 1.1s.
  3. Copy and subhead fade up (`opacity: 1`, `transform: translateY(0)`).
- **Scrub Timeline (ScrollTrigger Pin):**
  - Pin target: `.stage` hero container.
  - Pin settings: `trigger: containerRef.current`, `start: "top top"`, `end: "+=300%"`, `pin: true`, `scrub: 0.7`.
  - Scrub choreography:
    - 0.0s – 3.0s: Detailed linework draws (`.s2`).
    - 2.2s – 4.0s: Dimension rules and ticks draw (`.dim`).
    - 3.0s – 5.0s: Handwritten notes and annotations fade in (`.note`).
    - 4.6s – 7.8s: Color washes rise from the ground via animated clip rect (`#wash-clip`).
    - 6.0s – 7.5s: Construction lines fade out (`.cl` opacity &rarr; 0).
    - 8.2s: "HANDED OVER" stamp lands with `back.out(2)` bounce and opacity &rarr; 1.
    - 8.5s: Hand circle loop draws around the emphasized word "handover.".
- **Stage Tracker Progress Thresholds:**
  - `progress < 0.03`: **01 Sketch**
  - `0.03 <= progress < 0.45`: **02 Develop**
  - `0.45 <= progress < 0.78`: **03 Build**
  - `progress >= 0.78`: **04 Handover**
- **Scroll Cue:**
  - Prototype copy: `"scroll ↓"` (rendered in Just Another Hand font, color `var(--red)`).
  - Bobs with subtle infinite CSS animation (`bob 1.8s ease-in-out infinite`).
  - Fades to `opacity: 0` during the first unit of scroll scrub (`scrub.to('#cue', { opacity: 0, duration: 1 }, 0)`).
  - Does NOT jump past the pin; if clicked, nudges scroll only slightly (~100–150px) to initiate the scrub.

### 3.3 SVG Art & Pencil Wobble
- **House Linework:** Exact SVG paths from `oli-hero.html` with explicit layers:
  - `.cl`: Construction lines (thin, subtle).
  - `.s1`: Primary outline (bold structural walls, roof).
  - `.s2`: Secondary linework (window panes, mullions, siding, stairs).
  - `.dim`: Dimension lines and tick markers.
  - `.note`: Handwritten notes with arrow callouts.
  - `#washes`: Watercolor fills grouped at `0.88` opacity, revealed via `#wash-clip` `y` and `height` interpolation.
  - `#stamp`: Red border rectangle with "HANDED OVER" text rotated -5°.
- **Pencil Wobble Filter:**
  - SVG `<filter id="pnp">` with `<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />` and `<feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />`.
  - Applied to the drawing group (`filter: url(#pnp)`).
  - Breakpoint handling via matchMedia / `@media (min-width: 769px)`: enabled on desktop (≥769px), disabled (`filter: none`) on mobile (&le;768px).

### 3.4 Responsive Behavior
- **Mobile (&le;820px):**
  - Copy layout collapses to 1 column.
  - Subhead tags list hidden.
  - Navigation links hide; Enquire button remains.
  - SVG art expands to `width: 175%; margin-left: -37.5%; height: 40svh`.
  - TitleBlock hidden.
  - Stage tracker scales down (`font-size: 9px; gap: 10px; left: 22px`).
- **Desktop (&ge;821px):**
  - Copy in 2-column grid (`1.7fr 1fr`).
  - TitleBlock visible bottom-right.
  - SVG art spans `100%` width, `57svh` height.

### 3.5 Theming & Dark Mode Wash Contrast Audit
- **Light Theme:** Paper `#F2EEE4`, Ink `#2B2926`, Red `#C8412B`.
- **Dark Theme:** Paper `#1C1B19`, Ink `#ECE6D9`, Red `#E5694F`.
- **Linework / Wash Contrast in Dark Mode (Explicit Audit Step):**
  - In dark mode, ink is light cream (`#ECE6D9`). If wash fills are light/mid tones (`sand`, `concrete`, `glass`), linework running over the wash will lose contrast or vanish.
  - Do NOT accept low contrast or washed-out linework as "tone-on-tone".
  - Include an explicit inspection step in the plan: render the hero at the wash stage (progress ~0.80) in dark mode at 390px and 1280px, compare directly to light mode, and propose calibrated dark-mode wash variants (e.g. darkened/tinted fills on `:root[data-theme="dark"]`) for client/user review and approval before final verification.

### 3.6 Robustness & Engine Integration
- **Font Loading & ScrollTrigger Refresh:** Call `document.fonts.ready.then(() => ScrollTrigger.refresh())` to recalculate pin bounds accurately after Instrument Serif and Just Another Hand load.
- **Hydration & Pre-JS State:** Full linework and content visible before hydration and with JS disabled (`stroke-dasharray: 1; stroke-dashoffset: 1` scoped strictly to `html.js`).
- **Reduced Motion:** Under `prefers-reduced-motion`, instantly render completed state (wash raised, linework drawn, stamp placed, tracker on Handover) with no pin and no Lenis.
- **Strict-Mode Double-Mount:** Verify single pin, zero leftover spacing, zero ghost ScrollTriggers on React double-mount.

---

## 4. Verification Criteria
- [ ] Intro animation draws construction lines, main contour, then fades in typography.
- [ ] Scroll triggers smooth scrub across all 4 stages (Sketch &rarr; Develop &rarr; Build &rarr; Handover).
- [ ] Scroll cue displays "scroll ↓", bobs, and fades to opacity 0 as scroll begins.
- [ ] Wash rises seamlessly from ground line to roof.
- [ ] Dark-mode wash contrast audited at 390px and 1280px; linework retains clear contrast over fills.
- [ ] Stamp lands with snappy back ease and word circle completes around "handover.".
- [ ] `ScrollTrigger.refresh()` runs on `document.fonts.ready`.
- [ ] No double-pinning or broken layout on React double-mount (strict mode).
- [ ] Verified at 390px (mobile) and 1280px (desktop) in both light and dark themes.
- [ ] `prefers-reduced-motion` displays completed state with no pin.
- [ ] Zero hydration errors, zero console warnings.
