# Components Used — OLI Design Studio

Registry of all imported components from approved external sources (`21st.dev`, `Watermelon UI`, `MotionSites`).

## Policy & Rules
- **Approved Sources:** `21st.dev`, `Watermelon UI` (`ui.watermelon.sh`), `MotionSites`.
- **Theming:** Every component is strictly re-themed to our design tokens (`tokens.css`: `--paper`, `--ink`, `--red`, `--grid`, square corners, 1.5px solid ink borders).
- **Motion:** Framer Motion (`motion`) is permitted solely for component-internal interactions (hover, presence, layout animations). All scroll-linked animation and pinning must remain in GSAP ScrollTrigger on top of Lenis.
- **Copy & Facts:** No component ships with demo copy, placeholder facts, or external stock photos. Everything renders authentic data from `content/projects.ts` and `content/studio-facts.ts`.

---

## Component Registry

| Component Name | Source | Source URL | Licence | Added Files / Location | Re-Theming & Token Mapping |
|---|---|---|---|---|---|
| **sheet** | shadcn/ui | https://ui.shadcn.com/docs/components/sheet | MIT ("Copyright (c) 2023 shadcn. Permission is hereby granted, free of charge, to any person obtaining a copy...") | `components/ui/sheet.tsx`<br>`components/layout/Nav.tsx` | Installed `@radix-ui/react-dialog@1.1.2`. Square corners (`borderRadius: 0`), 1.5px solid ink borders, mono header labels (`SHEET NAV · DIRECTORY`), `--paper` background, zero shadows/glows. Bound to `lenis.stop()` on open and `lenis.start()` on close. |
| **discrete-tabs** | 21st.dev | https://21st.dev/community/discrete-tabs | MIT ("Permission is hereby granted, free of charge, to any person obtaining a copy of this software...") | `components/ui/discrete-tabs.tsx`<br>`components/work/WorkGallery.tsx` | Square corners, 1.5px solid ink active indicator, mono uppercase typography (`font-mono`), no pill radius, no gradients. Syncs URL search param `?type=...` with browser history. Instant transition under `prefers-reduced-motion`. |
| **expand-details** | 21st.dev / Watermelon UI | https://21st.dev/community/expand-details | MIT ("Permission is hereby granted, free of charge, to any person obtaining a copy...") | `components/ui/ProjectCard.tsx` | Expands project brief and material annotations smoothly on hover and focus. Zero `<button>` elements nested inside the outer `<a>` link (semantic HTML). Static final expanded state under `prefers-reduced-motion`. 1.5px solid ink card border with square corners. |
| **carousel-slider** | 21st.dev | https://21st.dev/community/carousel-slider | MIT ("Permission is hereby granted, free of charge, to any person obtaining a copy...") | `components/ui/carousel-slider.tsx`<br>`app/work/[slug]/page.tsx` | Replaced `@hugeicons/react` with inline custom architectural SVGs. 1.5px solid ink borders, square corners, mono counter (`VIEW 01 / 04`). 3D perspective tilt disabled under `prefers-reduced-motion`. |
| **cta-3** | Watermelon UI | https://ui.watermelon.sh/components/cta-3 | MIT ("Permission is hereby granted, free of charge, to any person obtaining a copy...") | `components/sections/ClosingCtaSection.tsx` | Architectural framed grid layout with **SOLID 1.5px ink borders** (strictly zero dashed borders). Square corners (`borderRadius: 0`), mono labels, copy strictly sourced from `content/studio-facts.ts`. |
