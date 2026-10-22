# Component Shortlist & Scout Evaluation — OLI Design Studio

This document records the results of the automated component scout across approved registries (**Watermelon UI**, **21st.dev**, and **MotionSites**), evaluating candidates for the OLI Design Studio portfolio against the architectural drafting-sheet aesthetic.

---

## 1. Registry Access & Compliance Audit

| Source Registry | Verification Method | Status & Findings | Robots.txt / Access Policy Compliance |
|---|---|---|---|
| **Watermelon UI** (`ui.watermelon.sh`) | Playwright Chrome + GitHub repo (`WatermelonCorp/watermelon-platform`) | **Reviewed & Captured (39 components)**. Metadata and registry install commands extracted from repo; live previews rendered and captured at 1280px and 390px. | **Compliant**: `robots.txt` allows `/`, disallows `/preview/`. Evaluated only public `/block/*`, `/animated-components/*`, and `/components/*` routes with 2s rate limiting. |
| **21st.dev** | Official MCP endpoint (`https://21st.dev/api/mcp`) with API key | **Catalog Search Error on Backend**. Connected using `process.env.API_KEY_21ST`; `get_usage` confirmed `Tier: free`, 2/2 retrievals available. Tool `search` and `get_inspiration` returned `catalog search failed` on 21st.dev backend. | **Compliant**: `robots.txt` disallows automated scraping (`Disallow: /api/`, `/r/`, `/preview/`). Per user instructions, Playwright scraping was NOT attempted; MCP was used. |
| **MotionSites** (`motionsites.ai`) | Playwright Chrome | **Public Index Reviewed; Source Code Paywalled**. Public catalog (`/sections`) reviewed. Specific prompt code and implementation details are locked behind "Go Unlimited" commercial paywall. | **Compliant**: Robots.txt allows `/`. Per user instructions, no paywalls were bypassed; evaluated public interface and disqualified paywalled source code. |

**Browser Launch Result:** Playwright successfully launched using the machine's installed Google Chrome:
`chromium.launch({ channel: 'chrome' })`.

---

## 2. Scoring Criteria (0–5 each, Max 30)

1. **Drafting-Sheet Aesthetic:** Square/nearly square corners, hairline borders, mono labels, linework. Penalises glass, glow, gradient blobs, floating shadows, rounded pill SaaS styling, dark-neon hero looks, and stock testimonials.
2. **Re-theming Feasibility:** Ease of re-theming directly to `tokens.css` (`--paper`, `--ink`, `--red`, `--grid`).
3. **Dependency Weight:** Low bundle weight, zero second scroll systems, zero scroll-linked Motion APIs (all page scroll belongs to GSAP ScrollTrigger on Lenis).
4. **Accessibility:** Visible focus indicators, keyboard tab order, and prefers-reduced-motion static final states.
5. **Licence Compatibility:** Clear, compatible open-source licence (MIT or similar) verified from repo/page.
6. **Distinctiveness:** Avoids looking like a generic startup/SaaS template.

---

## 3. Ranked Shortlists by Slot

---

### Slot (b): Selected-Work Cards / Grid

#### 1. [WINNER] `blog-1` (Watermelon UI) — Score: 27/30
- **Why it won:** Features a clean, modular 3-column hairline grid with crisp corner borders, top metadata timestamps, and directional arrows (`↗`), translating directly into architectural project cards without generic SaaS tropes.
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Modular box structure with hairline borders and technical meta captions.
  - *Re-theming (5/5):* Trivial mapping to `--paper`, `--ink`, and `--font-mono`.
  - *Dependency Weight (5/5):* Pure Tailwind CSS + semantic HTML; zero Motion or scroll dependencies.
  - *Accessibility (4/5):* Native keyboard tab navigation, visible focus rings, reduced-motion compliant.
  - *Licence (5/5):* `"MIT License Copyright (c) 2026 Watermelon Platform Contributors"` (quoted from GitHub repo).
  - *Distinctiveness (4/5):* Editorial journal aesthetic fits architectural project archives cleanly.
- **Source URL:** `https://ui.watermelon.sh/block/blog-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/blog-1.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Generic article demo copy must be replaced with studio project data from `content/projects.ts`.
- **Screenshots:**
  - Desktop: `review/candidates/b-selected-work/blog-1/1280.png`
  - Mobile: `review/candidates/b-selected-work/blog-1/390.png`
  - Active: `review/candidates/b-selected-work/blog-1/active.png`

#### 2. `bento-01` (Watermelon UI) — Score: 23/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Bento grid proportion is strong, but ships with rounded SaaS cards, soft shadows, and cloud icons.
  - *Re-theming (4/5):* Requires resetting card border-radius to 0px and removing drop shadows.
  - *Dependency Weight (4/5):* Minimal Tailwind + Lucide icon set.
  - *Accessibility (4/5):* Accessible semantic HTML structure.
  - *Licence (5/5):* MIT License (Watermelon Platform Contributors).
  - *Distinctiveness (3/5):* Highly recognizable as modern SaaS marketing unless heavily adapted to blueprint drawings.
- **Source URL:** `https://ui.watermelon.sh/block/bento-01`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/bento-01.json`
- **Dependencies:** `clsx`, `tailwind-merge`, `lucide-react`
- **Risks:** Requires removing SaaS illustrations and replacing with CAD drawings or elevations.
- **Screenshots:** `review/candidates/b-selected-work/bento-01/1280.png`, `390.png`, `active.png`

#### 3. `revealing-cards` (Watermelon UI) — Score: 19/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (2/5):* Floating credit card stack with large drop shadows and rounded pills.
  - *Re-theming (3/5):* Requires substantial restyling to remove fintech credit card styling.
  - *Dependency Weight (4/5):* Internal `motion/react` spring physics.
  - *Accessibility (3/5):* Touch/swipe gestures need keyboard navigation parity.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* Appears like a consumer banking mobile app widget.
- **Source URL:** `https://ui.watermelon.sh/animated-components/revealing-cards`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/revealing-cards.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Layout is too heavily tied to wallet/payment interaction metaphor.
- **Screenshots:** `review/candidates/b-selected-work/revealing-cards/1280.png`, `390.png`, `active.png`

---

### Slot (c): Process / Steps / Timeline

#### 1. [WINNER] `feature-1` (Watermelon UI) — Score: 27/30
- **Why it won:** Provides a structured, linear technical matrix with technical metadata badges, numbered stages, and high-contrast linework that articulates OLI's 4 stages (Sketch, Develop, Build, Handover) with architectural precision.
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Clean rectangular columns with technical metadata badges and structured hierarchy.
  - *Re-theming (5/5):* Directly maps to `--paper`, `--ink`, and hairline 1.5px borders.
  - *Dependency Weight (5/5):* Zero scroll animation dependencies; clean semantic DOM.
  - *Accessibility (4/5):* Logical heading sequence (`h3`), keyboard accessible.
  - *Licence (5/5):* MIT License (Watermelon Platform Contributors).
  - *Distinctiveness (4/5):* Re-themed with technical drawing notes, it looks like a construction specification sheet.
- **Source URL:** `https://ui.watermelon.sh/block/feature-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/feature-1.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Copy must come strictly from `content/studio-facts.ts`.
- **Screenshots:** `review/candidates/c-process/feature-1/1280.png`, `390.png`, `active.png`

#### 2. `onboarding-checklist` (Watermelon UI) — Score: 22/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Features progress indicators and step disclosures, but includes rounded progress pills.
  - *Re-theming (3/5):* Needs border-radius reset and substitution of checkmark icons with technical inspection stamps.
  - *Dependency Weight (4/5):* `motion/react` accordion height transition.
  - *Accessibility (4/5):* Accessible accordion controls.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (3/5):* Resembles a SaaS user onboarding widget if not restyled.
- **Source URL:** `https://ui.watermelon.sh/animated-components/onboarding-checklist`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/onboarding-checklist.json`
- **Dependencies:** `motion/react`, `tailwindcss`
- **Risks:** Progress bars feel gamified rather than architectural.
- **Screenshots:** `review/candidates/c-process/onboarding-checklist/1280.png`, `390.png`, `active.png`

#### 3. `pop-stepper` (Watermelon UI) — Score: 19/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (2/5):* Small circular numeric stepper button (+ / -).
  - *Re-theming (3/5):* Minimal styling, but the widget metaphor does not fit an architectural lifecycle narrative.
  - *Dependency Weight (4/5):* `motion/react`.
  - *Accessibility (3/5):* Requires custom ARIA spinbutton markup.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* Generic ecommerce quantity counter.
- **Source URL:** `https://ui.watermelon.sh/animated-components/pop-stepper`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/pop-stepper.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Unsuitable for narrative timeline presentation.
- **Screenshots:** `review/candidates/c-process/pop-stepper/1280.png`, `390.png`, `active.png`

---

### Slot (d): Closing CTA

#### 1. [WINNER] `cta-3` (Watermelon UI) — Score: 29/30
- **Why it won:** Outstanding alignment with the drafting-sheet aesthetic: sharp 90-degree corners, boxed hairline grid tiles, dashed button borders, and zero gradient blobs or floating pill shadows.
- **Criteria breakdown:**
  - *Drafting Aesthetic (5/5):* Boxed hairline grid tiles, 90-degree corners, dashed technical action borders.
  - *Re-theming (5/5):* Direct 1-to-1 mapping to `--paper`, `--ink`, and `--red`.
  - *Dependency Weight (5/5):* Pure CSS/Tailwind, zero runtime animation overhead.
  - *Accessibility (5/5):* Native semantic buttons and links with high-contrast outlines.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Architectural title-block feel; completely distinct from generic SaaS CTAs.
- **Source URL:** `https://ui.watermelon.sh/block/cta-3`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/cta-3.json`
- **Dependencies:** `clsx`, `tailwind-merge`, `lucide-react`
- **Risks:** Action buttons must link directly to `/contact/` and confirmed channels only.
- **Screenshots:** `review/candidates/d-closing-cta/cta-3/1280.png`, `390.png`, `active.png`

#### 2. `cta-4` (Watermelon UI) — Score: 24/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Minimalist centered banner, but relies on rounded pill buttons and soft card borders.
  - *Re-theming (4/5):* Easy background color adjustment.
  - *Dependency Weight (5/5):* Zero runtime JS.
  - *Accessibility (4/5):* Standard keyboard accessibility.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (3/5):* Standard newsletter / marketing conversion banner.
- **Source URL:** `https://ui.watermelon.sh/block/cta-4`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/cta-4.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Feels conventional without custom drafting borders.
- **Screenshots:** `review/candidates/d-closing-cta/cta-4/1280.png`, `390.png`, `active.png`

#### 3. `cta-1` (Watermelon UI) — Score: 19/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (1/5):* Features a large green radial gradient blob and rounded pill buttons ("Supercharge your team").
  - *Re-theming (3/5):* Requires completely stripping the background gradient glow to meet design tokens.
  - *Dependency Weight (5/5):* Lightweight.
  - *Accessibility (4/5):* Standard buttons.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (1/5):* Hallmark generic SaaS website hero/CTA banner.
- **Source URL:** `https://ui.watermelon.sh/block/cta-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/cta-1.json`
- **Dependencies:** `clsx`, `tailwind-merge`, `react-icons`
- **Risks:** Direct violation of Criterion 1 unless gradient blob is eliminated.
- **Screenshots:** `review/candidates/d-closing-cta/cta-1/1280.png`, `390.png`, `active.png`

---

### Slot (e): Work Grid with Filters

#### 1. [WINNER] `discrete-tabs` (Watermelon UI) — Score: 27/30
- **Why it won:** Provides keyboard-accessible, morphing segmented tab navigation with instant URL updates (`?type=...`) and layout-shift-free filtering, easily squared to match drafting sheet tab dividers.
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Segmented horizontal tab bar, easily squared into drafting title tabs with mono uppercase typography (`ALL [4]`, `ARCHITECTURE [1]`).
  - *Re-theming (5/5):* Clean border and background token assignment.
  - *Dependency Weight (4/5):* Component-internal `motion/react` layout transition; no external scroll interference.
  - *Accessibility (5/5):* Full keyboard accessibility (Arrow Left/Right, Tab, Enter), proper ARIA `tab` / `tablist` roles.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Crisp mechanical feel when styled with hairline linework.
- **Source URL:** `https://ui.watermelon.sh/animated-components/discrete-tabs`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/discrete-tabs.json`
- **Dependencies:** `motion/react`
- **Risks:** Active pill indicator must be squared to `0px` radius.
- **Screenshots:** `review/candidates/e-work-grid-filters/discrete-tabs/1280.png`, `390.png`, `active.png`

#### 2. `filter-disclosure` (Watermelon UI) — Score: 24/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Circular floating action buttons and popover drawer.
  - *Re-theming (4/5):* Requires squaring the trigger button and removing pill shadows.
  - *Dependency Weight (4/5):* `motion/react` expansion.
  - *Accessibility (4/5):* ARIA expanded state supported.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Novel interactive pattern, but slightly more complex than needed for 4 static disciplines.
- **Source URL:** `https://ui.watermelon.sh/animated-components/filter-disclosure`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/filter-disclosure.json`
- **Dependencies:** `motion/react`, `react-icons`
- **Risks:** Hides filters behind a click, increasing cognitive load for quick portfolio browsing.
- **Screenshots:** `review/candidates/e-work-grid-filters/filter-disclosure/1280.png`, `390.png`, `active.png`

#### 3. `collection-grid-disclosure` (Watermelon UI) — Score: 23/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Traditional vertical sidebar filter accordion.
  - *Re-theming (4/5):* Straightforward token mapping.
  - *Dependency Weight (4/5):* Radix Collapsible + Motion.
  - *Accessibility (4/5):* Standard keyboard controls.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (3/5):* Looks like an ecommerce catalog filter sidebar.
- **Source URL:** `https://ui.watermelon.sh/animated-components/collection-grid-disclosure`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/collection-grid-disclosure.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Sidebar takes up horizontal real estate on 1280px viewports that should belong to architectural images.
- **Screenshots:** `review/candidates/e-work-grid-filters/collection-grid-disclosure/1280.png`, `390.png`, `active.png`

---

### Slot (f): Project Card Hover

#### 1. [WINNER] `expand-details` (Watermelon UI) — Score: 26/30
- **Why it won:** Smoothly expands on hover or focus to reveal technical architectural specifications (discipline, location, scale, structural system) formatted like an architect’s drawing title block.
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Structured parameter-value pairs with clean horizontal dividers and technical data rows.
  - *Re-theming (5/5):* Directly maps to `--font-mono`, `--ink`, and `--paper`.
  - *Dependency Weight (4/5):* Component-internal spring height animation via `motion/react`.
  - *Accessibility (4/5):* Focusable toggle button with visible outline and keyboard trigger support.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Feels like unrolling an architectural specification tag on a drawing sheet.
- **Source URL:** `https://ui.watermelon.sh/animated-components/expand-details`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/expand-details.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Must gracefully collapse or stay expanded under `prefers-reduced-motion`.
- **Screenshots:** `review/candidates/f-card-hover/expand-details/1280.png`, `390.png`, `active.png`

#### 2. `expandable-event-card` (Watermelon UI) — Score: 23/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Good expanding card mechanic, but styled around dates, calendar icons, and avatar bubbles.
  - *Re-theming (4/5):* Requires stripping calendar iconography and replacing with technical project metrics.
  - *Dependency Weight (4/5):* Motion layout animations.
  - *Accessibility (4/5):* Keyboard accessible.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (3/5):* Reads as a calendar scheduling widget.
- **Source URL:** `https://ui.watermelon.sh/animated-components/expandable-event-card`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/expandable-event-card.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Event metadata semantics require rewrite for project portfolios.
- **Screenshots:** `review/candidates/f-card-hover/expandable-event-card/1280.png`, `390.png`, `active.png`

#### 3. `card-cue` (Watermelon UI) — Score: 19/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (2/5):* Credit card input form with rounded inputs and "Add Card" pill button.
  - *Re-theming (3/5):* High effort required to strip payment form semantics.
  - *Dependency Weight (4/5):* Motion/react.
  - *Accessibility (3/5):* Focus traps tied to input fields.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* Obvious checkout/credit card UI.
- **Source URL:** `https://ui.watermelon.sh/animated-components/card-cue`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/card-cue.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Wrong mental model for a design studio portfolio.
- **Screenshots:** `review/candidates/f-card-hover/card-cue/1280.png`, `390.png`, `active.png`

---

### Slot (g): Project Detail Gallery

#### 1. [WINNER] `carousel-slider` (Watermelon UI) — Score: 24/30
- **Why it won:** Enables tactile, swipe-and-drag navigation across architectural project photographs and detail drawings, easily paired with technical folio captions and keyboard Arrow keys.
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Floating image stack needs squaring to 0px border-radius and crisp 1.5px borders.
  - *Re-theming (4/5):* Dot indicators easily replaced with mono sheet numbering (`01 / 04`).
  - *Dependency Weight (4/5):* Gesture dragging handled internally by `motion/react`; no page scroll interception.
  - *Accessibility (4/5):* Keyboard Arrow navigation supported; reduced-motion provides instant static slide change.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Tactile physical inspection feel, like examining site photographs on an architect's desk.
- **Source URL:** `https://ui.watermelon.sh/animated-components/carousel-slider`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/carousel-slider.json`
- **Dependencies:** `motion/react`, `@hugeicons/react`
- **Risks:** Must disable 3D perspective rotation on reduced motion.
- **Screenshots:** `review/candidates/g-project-gallery/carousel-slider/1280.png`, `390.png`, `active.png`

#### 2. `carousel-navigator` (Watermelon UI) — Score: 23/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Horizontal image carousel with bottom pill navigator.
  - *Re-theming (4/5):* Good color token integration.
  - *Dependency Weight (4/5):* Internal motion layout.
  - *Accessibility (4/5):* Standard keyboard controls.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (3/5):* Standard consumer product slider.
- **Source URL:** `https://ui.watermelon.sh/animated-components/carousel-navigator`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/carousel-navigator.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Navigator buttons feel generic without drafting borders.
- **Screenshots:** `review/candidates/g-project-gallery/carousel-navigator/1280.png`, `390.png`, `active.png`

#### 3. `minimal-carousel` (Watermelon UI) — Score: 16/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (1/5):* Crypto wallet card grid with bright gradient cards (ETH coins).
  - *Re-theming (2/5):* Very heavy redesign required.
  - *Dependency Weight (4/5):* Motion/react.
  - *Accessibility (3/5):* Keyboard controls present.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (1/5):* Generic Web3/crypto component.
- **Source URL:** `https://ui.watermelon.sh/animated-components/minimal-carousel`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/minimal-carousel.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** High styling friction; does not fit architectural portfolios.
- **Screenshots:** `review/candidates/g-project-gallery/minimal-carousel/1280.png`, `390.png`, `active.png`

---

### Slot (h): Mobile Navigation Drawer

#### 1. [WINNER] `sheet` (Watermelon UI / shadcn radix primitive) — Score: 29/30
- **Why it won:** The gold standard for accessible modal drawers. Built on Radix Dialog with automatic focus trapping, Escape-to-close, focus restoration, and effortless integration with Lenis (`lenis.stop()` / `lenis.start()`).
- **Criteria breakdown:**
  - *Drafting Aesthetic (5/5):* Clean architectural slide-in panel; accepts 0px border-radius, hairline borders, and title block header.
  - *Re-theming (5/5):* Directly maps to `--paper`, `--ink`, and `--red`.
  - *Dependency Weight (5/5):* Radix primitive + minimal CSS; zero second scroll system.
  - *Accessibility (5/5):* Complete WAI-ARIA dialog implementation: focus trap, Escape key dismiss, focus restoration.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Styled as an architectural index sheet rather than a generic app menu.
- **Source URL:** `https://ui.watermelon.sh/components/sheet`
- **Install Command:** `npx shadcn@latest add sheet`
- **Dependencies:** `@radix-ui/react-dialog`
- **Risks:** Must call `lenis.stop()` on open and `lenis.start()` on close.
- **Screenshots:** `review/candidates/h-mobile-nav/sheet/1280.png`, `390.png`, `active.png`

#### 2. `macos-sidebar` (Watermelon UI) — Score: 22/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* Collapsible sidebar styled after desktop operating systems.
  - *Re-theming (4/5):* Tokens map cleanly.
  - *Dependency Weight (4/5):* Motion/react collapse logic.
  - *Accessibility (4/5):* Accessible toggle.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* Mimics Apple desktop software rather than architectural linework.
- **Source URL:** `https://ui.watermelon.sh/animated-components/macos-sidebar`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/macos-sidebar.json`
- **Dependencies:** `motion/react`, `lucide-react`
- **Risks:** Too heavy for a simple mobile drawer.
- **Screenshots:** `review/candidates/h-mobile-nav/macos-sidebar/1280.png`, `390.png`, `active.png`

#### 3. `navigation-1` (Watermelon UI) — Score: 20/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (2/5):* Generic marketing header with "Sign in" and "Get started" green buttons; preview disables mobile drawer view.
  - *Re-theming (3/5):* Requires extensive stripping of SaaS elements.
  - *Dependency Weight (5/5):* Pure Tailwind CSS.
  - *Accessibility (3/5):* Mobile drawer not self-contained.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* Standard SaaS marketing navigation bar.
- **Source URL:** `https://ui.watermelon.sh/block/navigation-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/navigation-1.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Mobile drawer implementation is incomplete in the raw component.
- **Screenshots:** `review/candidates/h-mobile-nav/navigation-1/1280.png`, `390.png`, `active.png`

---

### Slot (i): Footer

#### 1. [WINNER] `footer-1` (Watermelon UI) — Score: 28/30
- **Why it won:** Provides a clear, multi-column editorial directory with clean horizontal dividing lines and structured link columns, translating naturally into studio practice details and confirmed contact channels.
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Clean multi-column directory with horizontal hairline dividing rules.
  - *Re-theming (5/5):* Direct mapping to `--paper`, `--ink`, and `--font-mono`.
  - *Dependency Weight (5/5):* Pure semantic HTML + Tailwind; zero runtime JS or motion overhead.
  - *Accessibility (5/5):* Accessible list hierarchy, proper heading levels, and visible focus rings.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Technical studio practice directory when paired with OLI's 4 disciplines and office details.
- **Source URL:** `https://ui.watermelon.sh/block/footer-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/footer-1.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Newsletter input should be removed unless studio confirms email newsletter capability.
- **Screenshots:** `review/candidates/i-footer/footer-1/1280.png`, `390.png`, `active.png`

#### 2. `footer-3` (Watermelon UI) — Score: 26/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Minimalist bottom bar with inline links and legal copyright.
  - *Re-theming (5/5):* Very clean token mapping.
  - *Dependency Weight (5/5):* Pure CSS.
  - *Accessibility (4/5):* Good semantic markup.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (3/5):* Slightly too sparse to anchor full studio practice details.
- **Source URL:** `https://ui.watermelon.sh/block/footer-3`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/footer-3.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Lacks space for studio hours and regional practice statements.
- **Screenshots:** `review/candidates/i-footer/footer-3/1280.png`, `390.png`, `active.png`

#### 3. `footer-2` (Watermelon UI) — Score: 18/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (1/5):* Large green rounded block, cartoon ghost illustrations, and social media pill icons.
  - *Re-theming (2/5):* Requires extensive surgery to remove illustrations and rounded containers.
  - *Dependency Weight (5/5):* Lightweight.
  - *Accessibility (4/5):* Standard links.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (1/5):* Typical playful SaaS product footer.
- **Source URL:** `https://ui.watermelon.sh/block/footer-2`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/footer-2.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Directly contradicts architectural drawing aesthetic.
- **Screenshots:** `review/candidates/i-footer/footer-2/1280.png`, `390.png`, `active.png`

---

### Slot (j): Form Fields

#### 1. [WINNER] `form-primitive` (Watermelon UI / shadcn form) — Score: 29/30
- **Why it won:** Provides the unopinionated accessible foundation for inputs, selects, and textareas, allowing exact drafting-sheet styling (1.5px ink border, square corners, red required markers, and technical monospace labels).
- **Criteria breakdown:**
  - *Drafting Aesthetic (5/5):* Unopinionated primitive; seamlessly takes square borders, mono labels, and drafting borders.
  - *Re-theming (5/5):* 100% token compliant with `--paper`, `--ink`, `--red`, and `--font-mono`.
  - *Dependency Weight (5/5):* Zero animation bloat; standard React form handling.
  - *Accessibility (5/5):* Full ARIA integration (`aria-invalid`, `aria-describedby`, `<label htmlFor>`), native validation.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Styled as a technical drawing enquiry submission block.
- **Source URL:** `https://ui.watermelon.sh/components/form`
- **Install Command:** `npx shadcn@latest add form input textarea`
- **Dependencies:** `@radix-ui/react-label`, `react-hook-form`
- **Risks:** Must preserve honeypot and error preservation logic already tested in `EnquiryForm.tsx`.
- **Screenshots:** `review/candidates/j-form-fields/form-primitive/1280.png`, `390.png`, `active.png`

#### 2. `contact-1` (Watermelon UI) — Score: 23/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (3/5):* 4-card department directory (Sales, Enterprise, Support) with rounded corners and pill buttons.
  - *Re-theming (4/5):* Easy border and color re-theming.
  - *Dependency Weight (5/5):* Pure CSS.
  - *Accessibility (4/5):* Accessible cards.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* High-volume enterprise corporate contact layout.
- **Source URL:** `https://ui.watermelon.sh/block/contact-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/contact-1.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** OLI has a single unified team, not separate "Sales" and "Support" divisions.
- **Screenshots:** `review/candidates/j-form-fields/contact-1/1280.png`, `390.png`, `active.png`

#### 3. `contact-2` (Watermelon UI) — Score: 21/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (2/5):* Ships with generic headline ("Let's build something amazing"), Jane Doe demo text, and rounded inputs with inner icons.
  - *Re-theming (3/5):* Requires replacing all demo placeholders and resetting input radii.
  - *Dependency Weight (5/5):* Lightweight.
  - *Accessibility (4/5):* Standard inputs.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* Standard website contact form template.
- **Source URL:** `https://ui.watermelon.sh/block/contact-2`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/contact-2.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Contains demo placeholder strings flagged by our scanner.
- **Screenshots:** `review/candidates/j-form-fields/contact-2/1280.png`, `390.png`, `active.png`

---

### Slot (k): Process & About Layout Blocks

#### 1. [WINNER] `feature-4` (Watermelon UI) — Score: 27/30
- **Why it won:** Provides alternating media and specification blocks with numbered index markers (`01–04`), making it the ideal framework to present OLI's 4 disciplines and core studio commitments.
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Alternating editorial layout with technical numeral callouts and structured captions.
  - *Re-theming (5/5):* Directly maps to `--ink`, `--paper`, hairline dividers, and mono headings.
  - *Dependency Weight (5/5):* Pure Tailwind CSS, clean semantic DOM.
  - *Accessibility (4/5):* High-contrast typography and clear heading order.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Reads like an architectural monograph layout.
- **Source URL:** `https://ui.watermelon.sh/block/feature-4`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/feature-4.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** Must use verified discipline scope from `studio-facts.ts`.
- **Screenshots:** `review/candidates/k-process-about-blocks/feature-4/1280.png`, `390.png`, `active.png`

#### 2. `faq-1` (Watermelon UI) — Score: 27/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (4/5):* Clean hairline accordion list for client briefing questions and commissioning notes.
  - *Re-theming (5/5):* Direct mapping to `--ink`, `--paper`, and `--grid`.
  - *Dependency Weight (4/5):* Radix Accordion with internal height animation.
  - *Accessibility (5/5):* WAI-ARIA compliant accordion with complete keyboard controls.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (4/5):* Blueprint specification schedule feel.
- **Source URL:** `https://ui.watermelon.sh/block/faq-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/faq-1.json`
- **Dependencies:** `@radix-ui/react-accordion`, `clsx`, `tailwind-merge`
- **Risks:** FAQ questions must address real client concerns (timeline, site visits, permits).
- **Screenshots:** `review/candidates/k-process-about-blocks/faq-1/1280.png`, `390.png`, `active.png`

#### 3. `team-1` (Watermelon UI) — Score: 21/30
- **Criteria breakdown:**
  - *Drafting Aesthetic (2/5):* Generic marketing header ("Meet the minds behind the magic") with stock headshots and rounded cards.
  - *Re-theming (3/5):* Must replace all stock photos with architectural discipline blueprints.
  - *Dependency Weight (5/5):* Pure CSS.
  - *Accessibility (4/5):* Accessible markup.
  - *Licence (5/5):* MIT License.
  - *Distinctiveness (2/5):* Common agency template pattern.
- **Source URL:** `https://ui.watermelon.sh/block/team-1`
- **Install Command:** `npx shadcn@latest add https://registry.watermelon.sh/r/team-1.json`
- **Dependencies:** `clsx`, `tailwind-merge`
- **Risks:** High risk of inventing fake team facts; must render role definitions from `studio-facts.ts` or remain marked `[NEEDED]`.
- **Screenshots:** `review/candidates/k-process-about-blocks/team-1/1280.png`, `390.png`, `active.png`

---

## 4. Generic Template Transformation Audit

The following table documents the generic template patterns identified in raw component previews and the exact rules applied to align them with the architectural drafting-sheet aesthetic:

| Raw Component Pattern | Seen In | Problem Under OLI Concept | Re-theming Transformation Rule |
|---|---|---|---|
| **Radial Gradient Glows** | `cta-1`, `contact-2` | Modern SaaS glow effect contradicts paper and ink drafting sheets. | Delete all gradient blobs; replace with flat `--paper` background and 1.5px solid `--ink` hairline borders. |
| **Rounded Pill Buttons** | `cta-1`, `navigation-1`, `footer-2` | 9999px border-radius communicates consumer mobile apps, not technical architecture. | Enforce `--radius-wobbly` or `0px` sharp corners with mono uppercase labels (`12px`, tracking `0.14em`). |
| **Floating Drop Shadows** | `bento-01`, `revealing-cards` | Floating cards break the 2D planar drawing sheet concept. | Remove `box-shadow`; replace with 1px/1.5px solid `--ink` or dashed `--grid` borders. |
| **Stock Headshots & Avatars** | `bento-01`, `team-1` | Fake team members / stock photos directly violate AGENTS.md §3. | Replace with discipline linework diagrams or explicitly marked `[NEEDED]` photo frames. |
| **Demo Copy ("Jane Doe", "Acme")** | `contact-2`, `bento-01` | Generic demo strings erode trust and trigger placeholder scanner. | Purge all demo copy; wire strictly into `content/studio-facts.ts` or `content/projects.ts`. |
| **Fintech / Crypto Elements** | `revealing-cards`, `minimal-carousel` | Crypto badges, wallet balances, and credit card icons do not belong to architecture. | Disqualify crypto widgets or replace with architectural parameter tables (area, scale, climate zoning). |

---

## 5. Prerequisites Status Report

1. **Studio Claims Cleaned & Unified:**
   - `content/studio-facts.ts` is now the single source of truth for all studio facts, contact details, disciplines, and practice statements.
   - `Footer.tsx`, `ClosingCtaSection.tsx`, `Nav.tsx`, and `EnquiryForm.tsx` now consume facts directly from `content/studio-facts.ts`.
   - Unconfirmed WhatsApp links have been removed from the mobile drawer, sticky action bar, and footer; sticky mobile action bar is now **Enquire only**.
   - `npm run build` static export succeeded with **15/15 pages**, and `scripts/scan-placeholders.mjs` verifies zero unapproved demo strings.

2. **Exact Version Pinning:**
   - All dependencies and devDependencies in `package.json` have been pinned to exact versions with **zero `^` or `~` carets**.
   - `playwright@1.63.0` installed exact (released Sept 4, 2026; over 6 weeks old, meeting the two-week age requirement).
