# Phase 5 Context: Remaining Pages (Process, About, Contact, 404, Transitions)

## 1. Overview & Objectives

Deliver all remaining top-level pages, form integrations, error states, and route transitions conforming to the drafting sheet aesthetic:
1. **Process Page (`/process`, Sheet A-03)**:
   - Expanded breakdown of the 4 stages (01 Sketch, 02 Develop, 03 Build, 04 Handover).
   - Structured placeholders for *What we do*, *What you decide*, and *What you receive* per stage, strictly marked `[NEEDED: Studio's real process]`. Zero invented process copy.
2. **About Page (`/about`, Sheet A-04)**:
   - Philosophy paragraph is strictly `[NEEDED: Studio's own words]`. No invented philosophy text.
   - HandCircle primitive demonstrates on an approved phrase from existing `content.md` copy: "From sketch to <HandCircle>handover.</HandCircle>".
   - Team cards and studio location marked with `[NEEDED]` placeholders.
3. **Contact Page (`/contact`, Sheet A-05)**:
   - Direct real email (`olidesignstudio06@gmail.com`) as a clickable `mailto:` link.
   - WhatsApp and phone are rendered as **plain non-link text** (`[NEEDED: WhatsApp number]`, `[NEEDED: Phone number]`) — no `wa.me/` or `tel:` links without real numbers.
   - 4-field enquiry form: Name, Phone / WhatsApp, Project Type, Message.
   - Strict accessibility: visible labels, zero `placeholder=` attributes, keyboard reachable, `aria-live` state announcements.
   - Loose phone validation: allows digits, spaces, `+`, `-`, parentheses (`/^[\d\s+\-()]{7,20}$/`).
   - Client-side inline blur validation; input values strictly preserved on error.
   - Double-submit prevention (submit button and inputs disabled during flight), 10s fetch abort timeout, and network error handling.
   - Static export integration via Web3Forms with `botcheck` anti-spam honeypot.
   - Web3Forms submission validation: Success requires provider JSON `success: true` (not merely HTTP 200).
   - Form demo mode:
     - When `NEXT_PUBLIC_WEB3FORMS_KEY` is missing in development: shows a clearly labelled "Demo mode — this was NOT sent" notice banner. **Never** show the success stamp unless a real submission succeeded.
     - In production (`OLI_PRODUCTION=1`): build fails if `NEXT_PUBLIC_WEB3FORMS_KEY` is missing or empty.
   - Animated Stamp on success ("THANK YOU / WE REPLY IN 1 WORKING DAY [DRAFT]").
4. **Custom 404 Sheet (`app/not-found.tsx`)**:
   - Conforms to sheet aesthetic: "This sheet doesn't exist. Back to Home →" matching `content.md`.
5. **Sheet Page Transitions (Planned Last in 05-03)**:
   - ≤400ms architectural ink line-wipe across route navigation.
   - Acceptance criteria: Native Back/Forward browser scroll restoration works, pinned sections measure correctly after navigation (via `ScrollTrigger.refresh()`), and Lenis is not left in a stopped state.
   - **Contingency:** If these criteria cannot be reliably met without pin miscalculation or scroll glitches, drop the transition and record the decision.
   - Automatically skipped under `prefers-reduced-motion: reduce` and on filter-only query param changes (`/work?type=...`).
6. **UAT Policy**:
   - All visual, layout, animation, and interaction feel items must be recorded as **"awaiting user verification"** and NOT self-certified.

---

## 2. Settled Decisions

### 2.1 Sheet Numbering
- Home: `Sheet A-01`
- Work: `Sheet A-02`
  - Project Sub-sheets: `Sheet A-02.01`, `A-02.02`, `A-02.03`, `A-02.04` (two-digit decimal)
- Process: `Sheet A-03`
- About: `Sheet A-04`
- Contact: `Sheet A-05`
- 404: Unnumbered sheet / `Sheet 404`

### 2.2 Process Page (`PAGE-01`)
- **Route:** `app/process/page.tsx`
- **Sheet Header:** `SHEET A-03 · PROCESS`
- **Title:** `Process` (Instrument Serif)
- **Intro:** `A project is a series of decisions. Here is when each one gets made. [DRAFT]`
- **Structure:** 4 sequential panels matching hero vocabulary:
  - `01 Sketch`
  - `02 Develop`
  - `03 Build`
  - `04 Handover`
  Each panel presents:
  - *What we do*: `[NEEDED: Studio process details]`
  - *What you decide*: `[NEEDED: Client decisions]`
  - *What you receive*: `[NEEDED: Deliverables & documentation]`
- **CTA:** "Start a conversation" linking to `/contact`.

### 2.3 About Page (`PAGE-02`)
- **Route:** `app/about/page.tsx`
- **Sheet Header:** `SHEET A-04 · ABOUT`
- **Title:** `About` (Instrument Serif)
- **Philosophy:**
  - Strictly `[NEEDED: Studio's own words]`. No invented philosophy copy.
  - HandCircle demo uses existing approved copy: "From sketch to <HandCircle>handover.</HandCircle>"
- **Team Section:**
  - 2–3 team portrait placeholder cards:
    - Monochrome geometric silhouette with `[NEEDED: Team portrait]` badge.
    - Name: `[NEEDED: Team member name]`
    - Role: `[NEEDED: Role / Discipline]`
- **Locations & Studio Details:**
  - `[NEEDED: Studio location / address]`
- **CTA:** Button to `/contact`.

### 2.4 Contact Page & Enquiry Form (`PAGE-03`, `PAGE-04`, `PAGE-05`)
- **Route:** `app/contact/page.tsx`
- **Sheet Header:** `SHEET A-05 · CONTACT`
- **Heading:** `Let's talk about your project. [DRAFT]`
- **Direct Channels:**
  - Email: `olidesignstudio06@gmail.com` (real, clickable `mailto:` link)
  - WhatsApp: Plain text `[NEEDED: WhatsApp number]` (no `wa.me/` link without real number)
  - Phone: Plain text `[NEEDED: Phone number]` (no `tel:` link without real number)
  - Instagram: `[NEEDED: Instagram handle]`
- **Form Architecture:**
  - Exactly 4 visible fields:
    1. **Name** (`input[type="text"]`, required)
    2. **Phone / WhatsApp** (`input[type="tel"]`, required, loose format: `/^[\d\s+\-()]{7,20}$/`)
    3. **Project type** (`select` with options: *Architecture*, *Interior*, *Landscape*, *Product*, *Not sure yet*, required; pre-selects from `?type=` query param if passed)
    4. **Message** (`textarea`, required)
  - Anti-spam: Hidden `botcheck` input (invisible, `tabIndex={-1}`, `autoComplete="off"`).
  - Visible `<label>` tags for all fields; **no `placeholder=` attributes** on inputs.
  - Architectural underline styling: border-bottom only, red focus-visible state.
  - Validation: Inline validation on `blur` and on `submit`.
  - Resilience:
    - Double-submit prevention (disables submit button and fields while submitting).
    - 10-second fetch abort timeout.
    - Handles network failure gracefully: input values are **strictly preserved** in state on error.
  - Verification of Success:
    - Requires provider JSON payload to have `success: true`.
    - If `success: true`, renders animated `Stamp` primitive: `"THANK YOU · RECEIVED [DRAFT]"` with copy: `"We reply within [NEEDED] working day(s). [DRAFT]"`.
  - Demo Mode:
    - If `NEXT_PUBLIC_WEB3FORMS_KEY` is missing in development: shows a clearly labelled `"Demo mode — this was NOT sent"` notice banner with inputs preserved. Never triggers the success Stamp without a real submission.
    - In production (`build:prod` / `OLI_PRODUCTION=1`): build fails immediately if `NEXT_PUBLIC_WEB3FORMS_KEY` is missing or empty.

### 2.5 Web3Forms Security Analysis
- **Domain Restriction:** Researched against Web3Forms specifications: "Restrict to Domain" is a paid Pro feature and is **not available** on the Free tier.
- **Protection on Free Tier:**
  1. **Recipient Lock:** The access key is hard-tied to `olidesignstudio06@gmail.com` in Web3Forms database; an attacker extracting the key cannot redirect emails or read inbox data.
  2. **Honeypot:** Hidden `botcheck` field silences automated web scrapers.
  3. **Rate Limiting:** Web3Forms server enforces IP and key submission rate limits.
  4. **Upgrade Path:** If spam becomes an issue, the studio can upgrade to Web3Forms Pro ($8/mo) for domain whitelisting, or enable hCaptcha/Turnstile.

### 2.6 Placeholder Scanner Policy
- `scripts/scan-placeholders.mjs` scans `out/**/*.html` for:
  - `[NEEDED`
  - `[DRAFT`
  - `TBC`
  - `placeholder`
- In normal builds: prints detailed warnings and line snippets, exiting 0.
- In production (`OLI_PRODUCTION=1`): fails the build with exit code 1.

### 2.7 404 Sheet (`PAGE-06`)
- **Route:** `app/not-found.tsx`
- **Copy:** Exactly per `content.md`:
  - Sheet tag: `SHEET 404 · NOT FOUND`
  - Title: `This sheet doesn't exist.`
  - Action link: `Back to Home →` linking to `/`

### 2.8 Page Transitions (`PAGE-07`, Planned Last)
- Implemented in Plan 05-03 after all pages are built and verified.
- **Hard Acceptance Criteria:**
  1. Browser Back and Forward buttons correctly restore previous scroll positions.
  2. Pinned sections (Home Hero and Process horizontal scroll) measure and pin accurately after navigation.
  3. Lenis smooth scroll instance is never left paused or desynchronized from ScrollTrigger.
- **Contingency:** If Next.js App Router static navigation cannot cleanly meet all three criteria without scroll jumping or layout thrashing, drop the page transition and record that decision.

---

## 3. Plan Decomposition for Phase 5

1. **Plan 05-01: Process Page (`/process`, Sheet A-03) & About Page (`/about`, Sheet A-04)**
   - Build `/process` with 4-stage structured placeholders (`[NEEDED]`).
   - Build `/about` with `[NEEDED: Studio's own words]`, HandCircle approved copy demo, and team/location placeholders.
2. **Plan 05-02: Contact Page (`/contact`, Sheet A-05) & 4-Field Form with Web3Forms & Animated Stamp**
   - Build `/contact` with direct channels (real email `mailto:`, non-link placeholder text for WhatsApp/phone).
   - Build accessible 4-field form with visible labels, no placeholder attributes, loose phone validation, blur validation, input preservation, `botcheck`, double-submit prevention, abort timeout, Web3Forms integration (`success: true` check), demo mode notice, and animated Stamp on success.
3. **Plan 05-03: Custom 404 Sheet (`not-found.tsx`) & Page Transition Spike/Implementation**
   - Build custom 404 sheet.
   - Implement page transition adhering to the 3 scroll/pin safety criteria, or drop it cleanly if criteria cannot be met.
