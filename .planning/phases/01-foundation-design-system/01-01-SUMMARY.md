# Plan 01-01 Summary: Project Scaffold, Design Tokens, Fonts, Theme & Button

**Phase:** 01-foundation-design-system
**Plan:** 01
**Completed:** 2026-10-20
**Status:** Complete ✓

## What Was Built

1. **Repository & Build Architecture:**
   - Scaffolded Next.js App Router project with TypeScript strict mode enabled (`"strict": true`).
   - Pinned exact dependency versions (Next.js 14.2.15, React 18.3.1, GSAP 3.12.5, Lenis 1.1.18).
   - Configured `next.config.mjs` with `output: 'export'`, `trailingSlash: true`, and unoptimized image handling for static deployment.
   - Configured ESLint (`.eslintrc.json`) and Prettier (`.prettierrc`).
   - Added standard `.gitignore` preventing `node_modules/`, `.next/`, and `out/` from being committed.

2. **Design Tokens (`styles/tokens.css`) & Base CSS (`styles/base.css`):**
   - Established core tokens per `docs/design.md` §3: `--paper` (`#F2EEE4` light / `#1C1B19` dark), `--ink` (`#2B2926` light / `#ECE6D9` dark), `--red` (`#C8412B` light / `#E5694F` dark), `--grid` (`rgba(43,41,38,.06)` light / `rgba(236,230,217,.06)` dark).
   - Marker-wash palette (`--wash-sand`, `--wash-concrete`, `--wash-glass`, `--wash-timber`, `--wash-sage`, `--wash-shrub`, `--wash-slab`, `--wash-ground`) defined.
   - 48px linear-gradient grid background, keyboard focus rings (`outline: 2px solid var(--red); outline-offset: 3px;`), minimum accessible touch targets (≥44x44px), and `.js .d` stroke-draw primitives.

3. **Typography & Zero-Flash Theming:**
   - Self-hosted Google Fonts via `next/font`: Instrument Serif (normal & italic), DM Mono (400 & 500), and Just Another Hand (400) with robust system fallbacks.
   - Pre-paint inline script injected into `<head>` with `try/catch` wrapping for private browsing safety, setting `data-theme` and conditional `.js` class before initial render.

4. **Canonical Button Primitive (`components/ui/Button.tsx`):**
   - Single canonical wobbly button primitive implementing `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;`.
   - Primary variant (red border/text, fills red on hover with paper text) and secondary variant.
   - Supports both anchor links (`href`) and standard button interactions with accessible red focus rings.

## Verification Evidence
- `npm run build` completed with exit code 0; static export generated in `out/`.
- Total shared initial bundle size: 87.2 kB (well below 200 kB budget).
- Pre-paint inline script present in `out/index.html`.
- Zero console errors, zero hydration warnings.

## Requirements Addressed
- **FOUND-01**: Next.js App Router setup with static export and pinned dependencies.
- **FOUND-02**: CSS design tokens in `tokens.css` with light and dark theme variables.
- **FOUND-03**: Typography via `next/font` for Instrument Serif, DM Mono, and Just Another Hand.
