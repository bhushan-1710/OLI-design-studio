# AGENTS.md — OLI Design Studio

Instructions for AI coding agents working in this repository. Read this file first, every session.

## 1. Read order

1. `AGENTS.md` (this file)
2. `PRD.md`: what and why
3. `design.md`: visual system and tokens
4. `ux-spec.md`: structure and behaviour
5. `motion-spec.md`: animation rules and specs
6. `tech-spec.md`: stack, structure, budgets
7. `content.md`: copy and what is still unconfirmed
8. `tasks.md`: current phase; work only on the active phase unless told otherwise
9. `oli-hero.html`: approved hero prototype; the reference for hero visuals and motion

If two documents conflict: `oli-hero.html` wins for the hero, `design.md` wins for visuals, `ux-spec.md` wins for behaviour, `PRD.md` wins for scope. Flag conflicts in your reply rather than silently choosing.

## 2. The project in one paragraph

A website for OLI Design Studio (Architecture, Interior, Landscape, Product). The concept is a **drawing sheet**: linework that draws itself on scroll, a sketch becoming a building. The studio's promise, "We take care of your projects from designing to handover", is demonstrated by the scroll, not just stated.

## 3. Hard rules

**Do**
- Use tokens from `tokens.css`; never hard-code colours, fonts or spacing in components.
- Draw with the stroke-draw primitive (`pathLength="1"` + `strokeDashoffset`) as in the hero prototype.
- Keep every animation meaningful: drawing = designing, wash = building, stamp = finished.
- Build mobile-first at 390 px; verify at 768, 1280, 1920.
- Wrap GSAP code in `gsap.context()` and revert on unmount.
- Honour `prefers-reduced-motion`: final state, no pin, no Lenis.
- Keep content in `/content` data files; components render data.
- Use `100svh`, never `100vh`, for full-height sections.

**Don't**
- Approved sources: 21st.dev, Watermelon UI, MotionSites. Every imported component is re-themed to our tokens (tokens.css) and recorded in docs/components-used.md with source URL, licence, and the files it added.
- Don't use handwriting fonts for anything longer than a few words.
- Don't use Caveat, Architects Daughter, dashed-border "sketch" cards, drop-shadow cards, gradient blobs, emoji icons, or stock imagery.
- Don't add WebGL/Three.js in v1.
- Don't invent studio facts: names, project details, awards, addresses, testimonials, statistics. Use clearly marked placeholders.
- Don't use filler copy ("elevate", "seamless", "curated", "bespoke", "innovative", "passion").
- Don't ship `[DRAFT]` / `[NEEDED]` copy from `content.md` as final.
- Don't animate layout properties; only `transform`, `opacity`, `stroke-dashoffset`, `clip-path`.
- Don't add dependencies without saying why. Pin exact versions, at least two weeks old.

## 4. Quality bar (definition of done for any task)

- [ ] Matches `design.md` tokens and component rules
- [ ] Works at 390 px and 1280 px, light and dark theme
- [ ] Keyboard-accessible; visible red focus state; semantic HTML; one `h1` per page
- [ ] Reduced-motion tested
- [ ] No console errors or hydration warnings
- [ ] Meets budgets in `tech-spec.md` (check Lighthouse mobile for any new page)
- [ ] `tasks.md` updated

## 5. Working style

- Make the smallest change that completes the task; don't refactor unrelated code.
- Before building a section, restate in two or three lines what you understood from the docs, then build.
- When a decision isn't covered by the docs, pick the simplest option consistent with `design.md`, state the assumption in your reply, and add it to `PRD.md` §12 (Open questions) if it affects other pages.
- When something can't be done well with the available assets (e.g. no real project photos yet), say so and use a clearly labelled placeholder instead of faking it.
- Be direct about problems. If a requested change conflicts with the docs or hurts performance or accessibility, say so before implementing.

## 6. Commands

Fill in once the repo is scaffolded.

```
install:     npm install
dev:         npm run dev
build:       npm run build
build:prod:  npm run build:prod (enforces zero placeholders and fails on [NEEDED]/TBC/placeholder)
lint:        npm run lint
```

## 7. Asset notes

- Source images arrive via `client-asset-checklist.md`. Never commit unoptimised originals; export to `/public/images` at the sizes in `tech-spec.md`.
- The hero house in `oli-hero.html` is a placeholder drawing. Replace it with a traced real project, keeping the layer structure (`.cl`, `.s1`, `.s2`, `.dim`, `.note`, wash group, stamp).
