# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-10-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 establishes the entire technical and design-system foundation for OLI Design Studio: Next.js App Router repository with static export (`output: 'export'`), CSS custom property tokens (`tokens.css`), self-hosted fonts (`next/font`), zero-flash light/dark theming with Footer manual toggle, global drafting sheet frame with TitleBlock, global navigation with mobile-persistent Enquire button, global footer, motion runtime (Lenis + GSAP ScrollTrigger ticker integration + stroke-draw helper + reduced motion bypass), and hand-crafted UI primitives (Button, Chip, Stamp, DimensionRule, Annotation, HandCircle).

</domain>

<decisions>
## Implementation Decisions

### Tooling & Analytics
- **D-01:** Package manager is `npm`. Exact versions pinned in `package.json`, release versions at least two weeks old.
- **D-02:** Linting and formatting configured with ESLint + Prettier and TypeScript strict mode enabled (`strict: true`).
- **D-03:** Analytics deferred until client decision; initialize clean typed event dispatch helper (`lib/analytics.ts`) for key conversion events (`enquiry_form_submit`, `whatsapp_click`, `email_click`).

### Design System & Theming
- **D-04:** Tokens placed in `styles/tokens.css` per `docs/design.md` §3:
  - `--paper`: `#F2EEE4` (light) / `#1C1B19` (dark)
  - `--ink`: `#2B2926` (light) / `#ECE6D9` (dark)
  - `--red`: `#C8412B` (light) / `#E5694F` (dark)
  - `--grid`: `rgba(43,41,38,.06)` (light) / `rgba(236,230,217,.06)` (dark)
  - Marker-wash palette: sand `#D8C8AA`, concrete `#CDC6B8`, glass `#9DB6BA`, timber `#8A5A3C`, sage `#8FA27A`, shrub `#7C9168`, slab `#4A4743`, ground `#BDB4A1` (used at ~88% opacity).
- **D-05:** Theme toggle placed in the Footer; default follows system preference (`prefers-color-scheme: dark`), manual override persisted in `localStorage`. Zero-flash pre-paint inline script sets `data-theme` on `<html>`.

### Typography & Layout
- **D-06:** Self-hosted fonts via `next/font`:
  - Instrument Serif (`italic` for emphasis) with `Georgia, serif` fallback.
  - Just Another Hand with `cursive` fallback.
  - DM Mono (400, 500) with `ui-monospace, monospace` fallback.
- **D-07:** Drafting sheet layout:
  - Outer frame: `inset: 12px`, `1.5px solid var(--ink)`.
  - Grid: 48px, 1px lines at `--grid`.
  - Sheet TitleBlock bottom-right (`OLI Design Studio / Sheet A-01 · Home / Scale 1:100 · Rev 0`), hidden on ≤820px.
- **D-08:** Navigation:
  - Logo left ("OLI" hand font + "Design Studio" mono caps).
  - Links: Work · Process · About + Enquire button.
  - Responsive collapse: on ≤720px, links hide, Enquire button remains permanently visible. Never hidden behind a hamburger menu.
- **D-09:** Footer:
  - Disciplines line: "Architecture · Interior · Landscape · Product Design — one studio, start to finish."
  - Contact links (`olidesignstudio06@gmail.com`, Instagram, WhatsApp placeholder).
  - Theme toggle button.
  - Sheet title / copyright notice.

### Motion Infrastructure & UI Primitives
- **D-10:** Motion runtime with Lenis 1.1.x and GSAP 3.12.x ScrollTrigger:
  - Lenis initialized with `lerp: 0.1`.
  - Driven by GSAP central ticker: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add((t) => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
  - All GSAP animations wrapped in `gsap.context()` with `ctx.revert()` on component unmount.
- **D-11:** Stroke-draw primitive:
  - Every drawable path has `pathLength="1"`.
  - Scoped CSS `.js .d { stroke-dasharray: 1; stroke-dashoffset: 1; }`.
  - Reusable helper `draw(targets, { duration, stagger, ease })` in `lib/motion/draw.ts`.
- **D-12:** Accessibility & Reduced Motion:
  - `prefers-reduced-motion: reduce`: do not add `js` class to `<html>`, bypass Lenis, disable pinning, render all SVG strokes and copy in completed final state.
  - Keyboard focus state: visible 2px red outline with offset.
  - Touch targets ≥ 44 × 44 px.
- **D-13:** UI Primitives (zero UI kits):
  - **Button**: hand-drawn wobbly border radius (`border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px`), 1.5px red border, red mono caps text. On hover, fills red with paper text.
  - **Chip**: mono caps, 1.5px ink border, active chip gets 2px red underline.
  - **Stamp**: red border rectangle + hand-lettered caps rotated −5°, lands with `back.out(2)` ease.
  - **DimensionRule**: horizontal red line with end ticks and centered hand-lettered dimension value.
  - **Annotation**: hand font, red, 1–4 words, optional arrow.
  - **HandCircle**: red SVG loop drawn around key emphasis words.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design & Visuals
- `docs/design.md` §3 — Tokens (colour, typography, space, shape, breakpoints)
- `docs/design.md` §4 — Component specs (logo, nav, enquire button, sheet frame, title block, primitives)
- `docs/reference/oli-hero.html` — Approved prototype styling, CSS rules, and font loading

### Architecture & Motion
- `docs/tech-spec.md` §1–2 — Stack, project structure, versions
- `docs/tech-spec.md` §7–8 — Theming implementation, accessibility requirements
- `docs/motion-spec.md` §1–4 — Motion rules, libraries, stroke-draw primitive, easing
- `.planning/research/SUMMARY.md` — Lenis + ScrollTrigger integration, GSAP context lifecycle

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` §FOUND — Requirements FOUND-01 through FOUND-08
- `.planning/ROADMAP.md` §Phase 1 — Success criteria and plan breakdown

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/reference/oli-hero.html`: CSS tokens, reset styles, font import references, and button radius formula.

### Established Patterns
- Client components (`'use client'`) for any component containing GSAP / Lenis logic.
- CSS custom properties on `:root` and `[data-theme="dark"]`.
- `100svh` for all full-height viewport sections.

</code_context>

<specifics>
## Specific Ideas

- Ensure sheet frame uses `inset: 12px` and `pointer-events: none` with z-index above content background so it frames the screen cleanly.
- Verify light and dark mode appearance at both 390px (mobile) and 1280px (desktop) without any theme flash on page refresh.

</specifics>

<deferred>
## Deferred Ideas

- Phase 2: Hero component integration and elevation drawing.
- Phase 3: Selected work, horizontal pinned process section, disciplines list.
- Phase 4: Typed project data model and work index.
- Phase 5: Enquiry form with Web3Forms integration.

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-10-20*
