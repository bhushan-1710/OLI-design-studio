# Plan 01-03 Summary: Motion Runtime & UI Primitives

**Phase:** 01-foundation-design-system
**Plan:** 03
**Completed:** 2026-10-20
**Status:** Complete ✓

## What Was Built

1. **Motion Infrastructure (`lib/motion/`):**
   - `lib/motion/reduced-motion.ts`: `prefersReducedMotion()` utility and `useReducedMotion()` reactive hook.
   - `lib/motion/lenis.ts`: Lenis 1.1.18 + GSAP 3.12.5 ScrollTrigger synchronization via GSAP central ticker with `lagSmoothing(0)`, completely bypassed under `prefers-reduced-motion`.
   - `lib/motion/draw.ts`: `draw()` stroke helper that animates `strokeDashoffset` from 1 to 0 (or immediately jumps to 0 if reduced motion).

2. **Typed Analytics Dispatcher (`lib/analytics.ts`):**
   - Clean event tracking function `trackEvent(event, payload)` dispatching custom DOM events for future analytics hooks (`enquiry_form_submit`, `whatsapp_click`, `email_click`, `filter_click`, `theme_toggle`).

3. **Hand-Crafted Drafting UI Primitives (`components/ui/`):**
   - `components/ui/Chip.tsx`: Filter chip with 1.5px ink border, DM Mono caps, 2px red underline active state at 100% opacity, 38% inactive opacity.
   - `components/ui/Stamp.tsx`: Red border rectangle + hand-lettered text, rotated −5°, landing with `back.out(2)` bounce ease (wrapped in `gsap.context()`).
   - `components/ui/DimensionRule.tsx`: Reusable section divider replacing `<hr>`, horizontal red SVG line with vertical end ticks and hand-lettered dimension value, scroll-triggered stroke draw left-to-right (wrapped in `gsap.context()`).
   - `components/ui/Annotation.tsx`: Just Another Hand font, red color, with optional directional SVG arrow (`left`, `right`, `up`, `down`).
   - `components/ui/HandCircle.tsx`: Red SVG loop encircling key emphasis text (`.hl-path`), animated via stroke-draw.

4. **Showcase Integration (`app/page.tsx`):**
   - Assembled all primitives and layout components into `app/page.tsx`.
   - Tested responsive behavior, theme switching, and smooth scroll initialization.

## Verification Evidence
- `npm run build` completed with exit code 0; static export generated cleanly in `out/`.
- Total First Load JS for `/`: 144 kB (well within 200 kB budget in `tech-spec.md`).
- All GSAP code wrapped in `gsap.context()` with `ctx.revert()` on unmount.
- Zero console errors, zero hydration warnings.

## Requirements Addressed
- **FOUND-07**: Motion foundation with Lenis, GSAP ScrollTrigger, `draw()` helper, and reduced-motion bypass.
- **FOUND-08**: Reusable UI primitives: Button, Chip, Stamp, DimensionRule, Annotation, HandCircle.
