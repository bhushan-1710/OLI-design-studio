# Motion Spec — OLI Design Studio

Implementation-level animation spec. Principles and tokens live in `design.md`. The hero timeline is already built and approved in `oli-hero.html`; copy its structure rather than redesigning it.

---

## 1. Rules

1. Motion expresses design progress: **drawing = designing, colour wash = building, stamp = finished.** Nothing animates for decoration only.
2. Content is readable at all times. Never hide copy behind a scroll position.
3. SVG + CSS + GSAP only. No WebGL in v1.
4. Reduced-motion users get the final state, no pinning, no smooth-scroll library.
5. Pinned sections stay at or under `+=300%` of viewport height.

## 2. Libraries and setup

- Lenis (`lerp: .1`) feeding ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
- GSAP 3.12.x with ScrollTrigger. In React/Next, wrap animations in `gsap.context()` and call `ctx.revert()` on unmount.
- After web fonts load, call `ScrollTrigger.refresh()`. Use `100svh`, never `100vh`.

## 3. Stroke-draw primitive

Every drawable path gets `pathLength="1"`. CSS (scoped to `html.js`):

```css
.js .d { stroke-dasharray: 1; stroke-dashoffset: 1; }
```

Animate `strokeDashoffset` to `0`. Use `stroke-linecap: butt` to avoid dots at path starts. Reusable helper: `draw(targets, { duration, stagger, ease })`.

Pencil wobble: an SVG filter (`feTurbulence` baseFrequency `.03`, 2 octaves, plus `feDisplacementMap` scale `2.4`) on the drawing group. **Apply on viewports ≥ 769px only.**

## 4. Easing and timing

| Use | Ease | Duration |
|---|---|---|
| Entrance (text, lines) | `power2.out` | 0.9–1.2 s |
| Scrubbed timelines | `none` | scroll-bound |
| Colour wash rise | `power1.inOut` | scroll-bound |
| Stamp | `back.out(2)` | 0.8 s (once per page max) |
| Hover | `power2.out` | 0.3 s |
| Page transition | `power2.inOut` | ≤ 0.4 s |

## 5. Section specs

### 5.1 Home hero (approved)
See `oli-hero.html`. Intro on load, then pinned scroll (`end: +=300%`, `scrub: .7`). Stage tracker thresholds: <.03 Sketch, <.45 Develop, <.78 Build, else Handover. Replace the placeholder house with a traced real project, keeping the same layer structure: construction lines (`.cl`), outline (`.s1`), details (`.s2`), dimensions (`.dim`), notes (`.note`), wash group with clip rect, stamp.

### 5.2 Selected work cards
- Trigger: card enters at `top 80%`, once.
- Sequence: sketch outline of the project draws (0.9 s) → photo clip-path reveals from bottom (`inset(100% 0 0 0)` → `inset(0)`, 0.8 s) → meta text fades up.
- Hover (desktop): photo scales to 1.03 over 0.5 s; red underline draws under the name.
- Mobile: same on enter; no hover.

### 5.3 Process (pinned horizontal)
- Desktop: container pinned; four panels translate on X with `scrub: 1`, total travel = (panels − 1) × viewport width. `end: +=300%`.
- Each panel's drawing completes as the panel becomes active (draw window = panel's middle 60%).
- Tracker updates with active panel index.
- **Mobile (≤ 820px):** no pinning. Panels stack vertically; each drawing draws once on enter.

### 5.4 Disciplines list
- Four large text lines. Desktop hover (or focus): a small plan/section drawing for that discipline draws beside the line (0.6 s) and the arrow rotates 45°.
- Mobile: tap opens/closes the drawing inline.

### 5.5 Project detail: sketch to photo
- Pinned for `+=150%`, `scrub: .7`.
- 0–50%: red or ink linework of the project draws over the photo (which is slightly desaturated).
- 50–100%: linework fades to 20% opacity, photo returns to full colour.
- If the project has no usable drawing, skip the overlay and use a simple clip-path reveal.

### 5.6 Page transitions
- Out: a horizontal ink line sweeps across the viewport (0.3 s). In: content fades up (0.4 s). Skip when reduced motion is set or when navigating between filter states.

### 5.7 Dimension-rule dividers
Draw left to right when 85% in view, once. Hand-lettered value fades in after the line completes.

### 5.8 Form success
Stamp lands over the form area (`back.out(2)`), copy confirms the next step.

## 6. Performance rules

- Animate only `transform`, `opacity`, `stroke-dashoffset`, `clip-path`. Never animate layout properties.
- Limit filtered (wobble) elements to one drawing group per viewport.
- Keep each SVG under ~60 KB; split large drawings into layered groups.
- Do not run more than one scrubbed ScrollTrigger pin at a time on a page.
- Kill/revert all tweens on route change.

## 7. Reduced-motion and fallback behaviour

- `html.js` is only set when `prefers-reduced-motion` is not `reduce`; without it, all paths are visible and all text shown.
- If GSAP fails to load, remove `html.js` so drawings remain visible.
- Pinned scenes degrade to normal flow content in these cases.

## 8. QA checklist

- [ ] No layout shift when fonts load
- [ ] Pinned sections release cleanly on resize and orientation change
- [ ] iOS Safari address-bar collapse doesn't break pin height
- [ ] 60 fps scrolling on a mid-range Android (check hero and process)
- [ ] All animations absent and content complete with reduced motion on
- [ ] Keyboard users can reach every control during/after pinned sections
