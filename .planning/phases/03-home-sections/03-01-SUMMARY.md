# Plan 03-01 Summary: DimensionRule Divider & Selected Work Section

## Completed Work
1. **Typed Projects Model & Placeholder Seed Data (`content/projects.ts`):**
   - Defined `Project` interface with `isPlaceholder: boolean` guard.
   - Seeded 3 obvious placeholder projects ("Placeholder Project 01", "02", "03", all marked "Location TBC", with zero invented details).
   - Exported query helpers `getFeaturedProjects()` and `getProjectBySlug()`.
2. **Built `ProjectCard.tsx` (`components/ui/ProjectCard.tsx`):**
   - Monochrome geometric placeholder preview with drafting grid watermark and visible "PHOTO TBC" badge.
   - SVG sketch outline overlay (`pathLength="1"`, `stroke: var(--red)`).
   - Scroll-triggered enter animation (`top 80%`, `once: true`): outline draws in 0.9s, card reveals bottom-up via `clip-path: inset(...)` in 0.8s, meta text fades and slides up.
   - Desktop hover: card scales subtly to 1.03 over 0.5s; red underline draws under project title.
   - `prefers-reduced-motion` bypass: immediate full visibility without scroll triggers or hover scaling.
3. **Built `SelectedWorkSection.tsx` (`components/sections/SelectedWorkSection.tsx`):**
   - Preceded by `DimensionRule value="4.2 M"` (left-to-right draw on scroll).
   - Section header with "Selected work" in Instrument Serif and "All work →" linking to `/work`.
   - Responsive cards grid: multi-column on desktop, single-column stacked on mobile.
4. **Static Export Build:**
   - `npm run build` static export succeeded with 0 errors across 9 static routes.

## Verification Criteria Status
- [x] HOME-01: Selected work section preceded by DimensionRule divider, presenting 3-4 featured project cards.
- [x] HOME-02: Project card component with image cover, meta, scroll-triggered stroke draw overlay, and desktop hover scale/underline animation.
