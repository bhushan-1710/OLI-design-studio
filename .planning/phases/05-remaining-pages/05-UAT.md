# Phase 5 User Acceptance Testing (UAT)

## Status Overview
- **Script-Verifiable Items:** PASSED (routes exist, build compiles, validation catches errors, honeypot present, 0 placeholder attributes, production guards throw).
- **Visual & Interaction Items:** **Awaiting User Verification** (per hard rule against self-certifying visual appearance, animation, pinning, and layout).

---

## 1. Script-Verifiable Checks (PASSED)

| ID | Item | Expected Behavior | Automated Test Result | Status |
|---|---|---|---|---|
| UAT-5.01 | Static Export & Build | `npm run build` generates 13/13 static HTML pages without errors | Verified via `npm run build` | **PASS** |
| UAT-5.02 | Process Route | `/process/` returns HTTP 200, Sheet A-03, 4 stages, structured `[NEEDED]` tags | Verified via `scripts/verify-phase-5.mjs` | **PASS** |
| UAT-5.03 | About Route | `/about/` returns HTTP 200, Sheet A-04, philosophy `[NEEDED]`, HandCircle primitive, 3 team placeholders | Verified via `scripts/verify-phase-5.mjs` | **PASS** |
| UAT-5.04 | Contact Route & Direct Channels | `/contact/` returns HTTP 200, Sheet A-05, clickable `mailto:olidesignstudio06@gmail.com`, plain non-link text for unconfirmed WhatsApp & phone | Verified via `scripts/verify-phase-5.mjs` | **PASS** |
| UAT-5.05 | Enquiry Form Fields & Attributes | Exactly 4 visible fields, visible `<label>` for every field, ZERO `placeholder=` attributes | Verified via `scripts/verify-phase-5.mjs` | **PASS** |
| UAT-5.06 | Botcheck Honeypot | Hidden `name="botcheck"` field present in DOM | Verified via `scripts/verify-phase-5.mjs` | **PASS** |
| UAT-5.07 | Phone Regex Validation | Loose regex `/^[\d\s+\-()]{7,20}$/` accepts Indian & international numbers, rejects malformed | Verified via unit script | **PASS** |
| UAT-5.08 | Production Build Guard (Web3Forms) | When `OLI_PRODUCTION=1`, build fails if `NEXT_PUBLIC_WEB3FORMS_KEY` is missing or empty | Verified via `next.config.mjs` guard test | **PASS** |
| UAT-5.09 | Custom 404 Route | Non-existent route returns HTTP 404 with Sheet 404 and "This sheet doesn't exist. Back to Home →" | Verified via `scripts/verify-phase-5.mjs` | **PASS** |
| UAT-5.10 | Placeholder Scanner | `scripts/scan-placeholders.mjs` flags all `[NEEDED]`, `[DRAFT]`, `TBC`, and `placeholder` occurrences | Verified post-build | **PASS** |

---

## 2. Visual & Interaction Items (AWAITING USER VERIFICATION)

The following items require visual and physical interaction review by the user in the browser (`http://localhost:3005`):

- [ ] **Process Page Layout (`/process/`)**:
  - Sheet A-03 TitleBlock and architectural header appearance.
  - 4-stage sequential card breakdown (01 Sketch, 02 Develop, 03 Build, 04 Handover).
  - 3-column layout (*What we do*, *What you decide*, *What you receive*) responsiveness on mobile vs desktop.
  - Closing CTA button leading to `/contact`.

- [ ] **About Page Layout & Primitives (`/about/`)**:
  - Sheet A-04 TitleBlock and header.
  - HandCircle red SVG loop drawn around `"handover."` in the philosophy block.
  - 3 team cards with silhouette placeholders and dashed badge styling.
  - Studio location section and CTA button.

- [ ] **Contact Page & Form Interactions (`/contact/`)**:
  - 2-column desktop / 1-column mobile split between direct channels and the enquiry form.
  - Underlined architectural drafting form fields and visible focus ring appearance.
  - Inline error validation messages displayed below fields on blur and submit.
  - Form demo mode banner displayed when submitting without an active Web3Forms key: `"Demo mode — this was NOT sent. NEXT_PUBLIC_WEB3FORMS_KEY is not configured."`
  - Form inputs strictly preserved in state during demo/error states.
  - Animated `Stamp` ("RECEIVED") landing with `back.out(2)` upon real submission success (when key is active).

- [ ] **Page Transitions & Navigation Feel**:
  - 360ms red drafting ink line wipe across the top/center during page changes.
  - Transition correctly skipped when clicking discipline filter chips on `/work?type=...`.
  - Transition skipped under `prefers-reduced-motion`.
  - Browser Back and Forward buttons correctly restore prior scroll position without jumps.
  - Pinned sections (Home hero, Process, Project Detail SketchScrub) measure correctly after navigating back and forth.

- [ ] **Custom 404 Sheet (`/non-existent-sheet`)**:
  - Architectural sheet presentation, TitleBlock 404, and "Back to Home →" navigation button.
