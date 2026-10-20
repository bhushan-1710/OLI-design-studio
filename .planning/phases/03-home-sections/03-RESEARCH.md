# Phase 3 Research: Home Sections

## 1. Domain & Scope
Implement the full suite of sections following the Hero on the Home page (`app/page.tsx`):
- `DimensionRule` section divider (`HOME-01`)
- `SelectedWorkSection` with `ProjectCard` component (`HOME-01`, `HOME-02`)
- `ProcessSection` with horizontal scroll on desktop and vertical stack on mobile (`HOME-03`, `HOME-04`)
- `DisciplinesSection` with hover/tap sketch reveals (`HOME-05`)
- `ClosingCtaSection` with enquiry links and WhatsApp placeholder (`HOME-06`)
- Dual-pin lifecycle & geometry verification (`HOME-03`, Success Criterion 6)

---

## 2. GSAP Patterns for Phase 3

### 2.1 Sequential Pinning with Multiple Pinned Sections
When a page has multiple pinned ScrollTriggers (Hero pinned `+=300%` followed by Process pinned `+=300%`):
1. **Natural Pin Spacing:** Always allow ScrollTrigger's default `pinSpacing: true`. ScrollTrigger injects `.pin-spacer` elements that push subsequent content down by the pin duration.
2. **Offset Calculation:** ScrollTrigger dynamically calculates triggers that follow pinned elements based on their offset in the document.
3. **Geometry Refresh:** Any asynchronous layout change (such as `next/font` loading or image render) shifts the document height. We must call `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`) and on resize.

### 2.2 Responsive Horizontal Scroll with `gsap.matchMedia()`
Instead of manual resize event listeners, GSAP provides `gsap.matchMedia()` which integrates seamlessly with `gsap.context()`:
```tsx
const mm = gsap.matchMedia(containerRef);

mm.add('(min-width: 821px)', () => {
  // Desktop: pinned horizontal scrub across 4 panels
  const panels = gsap.utils.toArray<HTMLElement>('.process-panel');
  const horizontalTl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
    },
  });

  horizontalTl.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
  });

  // Vignette drawings complete during each panel's visibility window
  panels.forEach((panel, i) => {
    const drawing = panel.querySelector('.vignette-draw');
    if (drawing) {
      // Animate strokeDashoffset during panel active window
    }
  });
});

mm.add('(max-width: 820px)', () => {
  // Mobile: unpinned vertical stack
  // Each vignette drawing animates once when scrolling into viewport (top 75%)
  const panels = gsap.utils.toArray<HTMLElement>('.process-panel');
  panels.forEach((panel) => {
    gsap.fromTo(
      panel.querySelectorAll('.d'),
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: panel,
          start: 'top 75%',
          once: true,
        },
      }
    );
  });
});

return () => mm.revert();
```

### 2.3 Selected Work Card Enter & Hover Choreography
Per `motion-spec.md` §5.2:
- **Scroll Enter (`top 80%`, `once: true`):**
  1. Sketch outline overlay draws (`duration: 0.9s`).
  2. Photo / placeholder clip-path reveals bottom-up (`inset(100% 0 0 0)` &rarr; `inset(0)`, `duration: 0.8s`).
  3. Meta text (Name, Discipline, Location) fades and slides up.
- **Desktop Hover:**
  - Photo container scales to `1.03` over `0.5s` (`power2.out`).
  - Red underline draws under project name.

---

## 3. Data & Placeholder Architecture
- **Projects Data:** Seed 3 placeholder projects in `content/projects.ts` (`isPlaceholder: true`, names: `Placeholder Project 01`, `02`, `03`, location `Location TBC`, disciplines `Architecture`, `Interior`, `Landscape`).
- **Cards UI:** Rendered with monochrome geometric placeholder rectangles, a clear `PHOTO TBC` badge, and SVG drafting line overlays.
- **Process Panels:** 4 architectural drafting vignettes:
  - 01 Sketch: Concept lines, site boundary, north arrow.
  - 02 Develop: 2D dimensioned floor plan with door swings.
  - 03 Build: Structural frame & column grid.
  - 04 Handover: Completed elevation with "HANDED OVER" stamp.
- **Disciplines SVGs:** 4 concise drafting thumbnails (massing sketch, interior elevation, landscape contours, product luminaire) rendered inline.
