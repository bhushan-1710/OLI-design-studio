# OLI Design Studio — design.md

Source of truth for the website rebuild of olidesignstudio.in. The approved hero prototype (`oli-hero.html`) is the visual and motion reference: when this document and the prototype disagree on the hero, the prototype wins.

---

## 1. Brief

**Studio:** OLI Design Studio — Architecture · Interior · Landscape · Product Design.
**Existing site:** Google Sites placeholder ("Website under construction"), tagline, Instagram link, email. Nothing else to preserve.
**Tagline (client's own words, keep verbatim):** "We take care of your projects from designing to handover."
**Goal:** Turn an Instagram visitor, on a phone, into an enquiry.
**Audience:** Homeowners and small business owners deciding whether to trust one studio with a whole project.
**Core idea:** The studio's edge is *end-to-end*. The site proves it by letting the visitor watch a sketch become a building as they scroll.

## 2. Concept: the drawing sheet

The site is a drafting sheet, not a "hand-drawn font on cream paper".

- Pages are **sheets** with a frame, a faint 48px drafting grid, and a **title block** (studio, sheet number, scale, revision).
- Linework is the visual language: construction lines, dimension lines, level marks, hatching, red-pencil markup.
- Colour comes from **marker wash** over linework, and later from real photography.
- Hand-drawn is expressed through *drawing behaviour* (lines that draw themselves, wobble, markup), never through doodles, emoji, or comic fonts.

### Do
- Draw things on scroll that an architect would actually draw (elevations, plans, sections, dimensions).
- Keep UI chrome mono and quiet so the drawings and photos lead.
- Use red pencil only for markup, emphasis, and the single call to action.

### Don't
- No cream-background + teal-accent "sketch template" look, no dashed card borders, no drop-shadow "tactile" cards.
- No handwriting font for body copy or anything longer than a few words.
- No stock illustrations, no AI-generated imagery, no gradient blobs.
- No full-page WebGL. Motion is SVG + CSS + GSAP. Three.js only if a real 3D model of a real project exists (see §9).

## 3. Design tokens

### Colour

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#F2EEE4` | `#1C1B19` |
| `--ink` | `#2B2926` | `#ECE6D9` |
| `--red` (red pencil) | `#C8412B` | `#E5694F` |
| `--grid` | `rgba(43,41,38,.06)` | `rgba(236,230,217,.06)` |

Rules: ink for all structure and text, red for markup + the primary CTA only. Body text is always `--ink` on `--paper`. Define tokens on `:root`, override in `@media (prefers-color-scheme: dark)` guarded with `:root:not([data-theme="light"])`, and again on `:root[data-theme="dark"]`.

**Marker-wash palette** (illustration fills only, same in both themes, used at ~88% opacity):
sand `#D8C8AA` · concrete `#CDC6B8` · glass `#9DB6BA` · timber `#8A5A3C` · sage `#8FA27A` · shrub `#7C9168` · slab `#4A4743` · ground `#BDB4A1`.

### Typography

| Role | Font | Specs |
|---|---|---|
| Display / headings | Instrument Serif (Google Fonts), italic for single emphasised words | `clamp(46px, 7.2vw, 110px)`, line-height `.92`, tracking `-0.025em` |
| Annotation / logo | Just Another Hand | logo 46px; SVG annotations 27–30 units, tracking `.06em`. Max a few words per use. |
| UI / labels / meta | DM Mono 400/500 | 9–14px, uppercase, tracking `.14–.24em` |
| Long-form body | Instrument Serif | 18–20px, line-height 1.55, max 60ch |

Fallbacks: Georgia (serif), `ui-monospace` (mono), `cursive` (hand). Use real fallbacks; the hand font is decorative only, so layout must not depend on its metrics.

### Space and shape
- Base unit 8px. Section padding `clamp(22px, 3vw, 38px)` inside the sheet.
- Sheet frame: `inset: 12px`, `1.5px solid var(--ink)`.
- Grid: 48px, 1px lines at `--grid`.
- Corners are square everywhere **except** hand-drawn buttons: `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px`.
- Breakpoints: `820px` (layout collapses to one column), `720px` (nav links hide, CTA stays).

## 4. Components

1. **Logo:** "OLI" in Just Another Hand + "Design Studio" in DM Mono 9px caps beneath.
2. **Nav:** logo left; Work · Process · About + **Enquire** button right. On ≤720px only Enquire remains. Never hidden behind a hamburger in v1.
3. **Enquire button:** 1.5px red border, wobbly radius, red mono caps text. Hover: fills red, text becomes paper. It is the only filled-on-hover element on the site.
4. **Sheet frame + title block:** frame on every full-height section; title block bottom-right (`OLI Design Studio / Sheet A-01 · Home / Scale 1:100 · Rev 0`). Sheet number increments per page (A-01 Home, A-02 Work, A-03 Process…). Hidden ≤820px.
5. **Stage tracker:** `01 Sketch · 02 Develop · 03 Build · 04 Handover`, mono caps, active item full opacity with a 2px red underline, inactive at 38%.
6. **Hand circle highlight:** red SVG loop drawn around one key word per page, animated with stroke-draw.
7. **Stamp:** red rectangle + hand-lettered caps, rotated about −5°, lands with `back.out(2)` ease. Use once per page maximum (e.g. "HANDED OVER", "IN PROGRESS", "COMPLETED").
8. **Dimension rule (section divider):** horizontal red line with end ticks and a hand-lettered value, replacing `<hr>`.
9. **Annotation label:** hand font, red, 1–4 words, optionally with a curved arrow. Max 3 per drawing.
10. **Project card:** project name (serif), discipline + location (mono), photo. Hover/scroll: sketch outline of the project draws over the photo, then fades to reveal it.
11. **Filter chips (Work):** mono caps, 1.5px ink border, active chip gets red underline (same language as the stage tracker).
12. **Enquiry form:** four fields max (name, phone/WhatsApp, project type, message). Underlined inputs, no boxed fields. Success state shows a stamp.

## 5. Motion

**Stack:** Lenis (smooth scroll, `lerp: .1`) + GSAP 3.12.x + ScrollTrigger. SVG for all drawing. Pin exact library versions.

**Core technique, stroke draw:** set `pathLength="1"` on every drawn element; CSS `stroke-dasharray: 1; stroke-dashoffset: 1`; animate `strokeDashoffset` to `0`. Scope the CSS to `html.js` so content is visible if JS fails.

**Pencil wobble:** SVG `feTurbulence` (baseFrequency `.03`, 2 octaves) + `feDisplacementMap` (scale `2.4`) on the drawing group. **Desktop only (≥769px)**; remove the filter on mobile.

**Hero timeline (approved):**
- Intro (time-based, on load): construction lines (stagger .07, 1.2s) → main outline (stagger .14, 1.1s) → headline and meta fade up.
- Scroll (pinned, `end: +=300%`, `scrub: .7`): details draw (0–3) → dimensions (2.2) → annotations (3) → colour wash rises from the ground via an animated clip rect (4.6–7.8) → construction lines fade (6) → stamp (8.2) → word circle (8.5).
- Stage tracker thresholds on progress: <.03 Sketch, <.45 Develop, <.78 Build, else Handover.

**Rules for all other pages**
- Every scroll animation must *mean* something: drawing = design progress, wash = construction, stamp = completion. No decorative parallax.
- Content must be readable without waiting for animation. Animate from the final state's layout, never hide copy behind scroll.
- Easing: `power2.out` for entrances, `none` for scrubbed timelines, `power1.inOut` for the wash, `back.out(2)` for stamps only.
- `prefers-reduced-motion`: no `html.js` class, no Lenis, no pinning; everything renders in its final state.
- Pinned sections never exceed 300% of viewport height.

## 6. Pages

### Home (Sheet A-01)
1. **Hero** — approved (see prototype). Replace the placeholder house with a traced elevation of a real OLI project.
2. **Selected work** — 3–4 projects as cards; section opens with a dimension-rule divider.
3. **Process** — pinned horizontal scroll through the four stages (Sketch, Develop, Build, Handover); each stage is a drawing that completes as it enters. One sentence per stage, no jargon.
4. **Disciplines** — Architecture / Interior / Landscape / Product as four lines of large serif text; hovering one draws a small section/plan sketch beside it.
5. **Closing CTA** — headline + Enquire button + WhatsApp + email. Stamp "LET'S START" is optional.

### Work (A-02)
Filter chips by discipline; grid of project cards (2 columns desktop, 1 mobile). No infinite scroll.

### Project detail (A-03+)
Order: title + discipline/location/year → brief (2–3 sentences) → sketch-to-photo sequence (scroll-scrubbed) → process images → outcome gallery → next project link. Each project needs real sketches or plan drawings; if the studio has none, trace over the plan or elevation.

### Process (A-0x)
The home process section expanded: one pinned scene per stage with what the client gets and what the client decides at that stage.

### About
Studio philosophy (short), team with real portraits, location(s). Hand circle highlight on one phrase.

### Contact
Form (§4.12) + WhatsApp + email (`olidesignstudio06@gmail.com`) + Instagram. Mobile: sticky Enquire button stays reachable on every page.

## 7. Content and voice

- Plain, specific, confident. Write like an architect talking to a client, not a marketing deck.
- Banned words: elevate, seamless, curated, bespoke, innovative, passion.
- Keep the client's tagline verbatim. Everything else is placeholder until the studio supplies real copy.
- Numbers beat adjectives: "12.40 m span", "14 months, site to handover".

## 8. Imagery

- Real project photography is required; the design depends on it. Colour comes from photos, not UI.
- Treatment: no filters or tints. Optional sketch overlay (red or ink linework) aligned to the photo.
- The hero's flat colour wash is a stand-in for the photo reveal and should be replaced by it once photos exist.
- Source order: studio's own files → Instagram originals (request them, don't screenshot) → none. No stock.

## 9. Open decisions

1. **Real projects:** which 3–4 projects feature on the home page, and do plans/sketches exist for them?
2. **3D moment:** only if a real 3D model or render of a project exists; otherwise stay fully SVG.
3. **Contact routing:** WhatsApp number, form destination (email or CRM).
4. **Studio location/service area** for the footer and local SEO.
5. **Domain:** keep olidesignstudio.in; confirm hosting and redirect from the Google Sites URL.

## 10. Build and quality

- **Stack:** Next.js (static export) or Astro, plain CSS with the tokens above, GSAP + ScrollTrigger + Lenis. No UI-kit components that fight the sheet aesthetic.
- **Performance:** hero interactive and drawing within 2.5s on a mid-range Android on 4G; total JS under 200 KB gzipped; fonts `display=swap` with fallbacks; images responsive with AVIF/WebP.
- **Accessibility:** WCAG AA contrast (check red on paper in both themes), visible focus states in red, SVG drawings have `role="img"` + descriptive label, all content reachable by keyboard, no information carried only by animation.
- **SEO:** real text in HTML for headline, tagline, disciplines and project names; one `h1` per page; Open Graph image from the hero drawing.
- **Mobile first:** design and test at 390px wide before desktop. Check the pinned sections with the browser address bar collapsing (use `svh`).

## 11. Build order

1. Tokens, fonts, sheet frame, nav, footer (shared layout).
2. Hero (port the prototype, swap in the real project drawing).
3. Selected work + project card component.
4. Process section (pinned horizontal).
5. Work page, project detail template.
6. About, Contact + form.
7. Performance, accessibility and reduced-motion pass.
