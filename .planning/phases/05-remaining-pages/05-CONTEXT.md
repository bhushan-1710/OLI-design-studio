# Phase 5 Context: Remaining Pages (Process, About, Contact, 404, Transitions)

## 1. Overview & Objectives

Deliver all remaining top-level pages, form integrations, error states, and route transitions conforming to the drafting sheet aesthetic:
1. **Process Page (`/process`, Sheet A-03)**:
   - Expanded breakdown of the 4 stages (01 Sketch, 02 Develop, 03 Build, 04 Handover).
   - Structured placeholders for *What we do*, *What you decide*, and *What you receive* per stage, strictly marked `[NEEDED: Studio's real process]`. No invented copy.
2. **About Page (`/about`, Sheet A-04)**:
   - Studio philosophy draft statement marked `[DRAFT]` with a hand-drawn circle highlighting the word "handover".
   - Team cards and studio location marked with `[NEEDED]` placeholders.
3. **Contact Page (`/contact`, Sheet A-05)**:
   - Direct real email (`olidesignstudio06@gmail.com`), plus WhatsApp and phone links marked as placeholders.
   - 4-field enquiry form: Name, Phone / WhatsApp, Project Type, Message.
   - Strict accessibility: visible labels, zero `placeholder=` attributes, keyboard reachable, `aria-live` state announcements.
   - Client-side inline blur validation; input values strictly preserved on error.
   - Static export integration via Web3Forms with `botcheck` anti-spam honeypot.
   - Web3Forms key loaded via `NEXT_PUBLIC_WEB3FORMS_KEY`:
     - In development/preview without key: mocks submission, logs payload to console, and presents the animated Stamp.
     - In production (`OLI_PRODUCTION=1`): build fails if `NEXT_PUBLIC_WEB3FORMS_KEY` is missing or empty.
   - Animated Stamp on success ("THANK YOU / WE REPLY IN 1 WORKING DAY [DRAFT]").
4. **Custom 404 Sheet (`app/not-found.tsx`)**:
   - Conforms to sheet aesthetic: "This sheet doesn't exist. Back to Home →" per `content.md`.
5. **Sheet Page Transitions**:
   - ≤400ms architectural ink line-wipe across route navigation.
   - Automatically skipped under `prefers-reduced-motion: reduce` and on filter-only query param changes (`/work?type=...`).
   - Ensures GSAP ScrollTrigger recalculations (`ScrollTrigger.refresh()`) complete after transition without distorting pinned section spacers or interfering with natural Back scroll restoration.
6. **UAT Policy**:
   - All visual, layout, animation, and interaction feel items must be recorded as **"awaiting user verification"** and NOT self-certified.

---

## 2. Settled Decisions

### 2.1 Sheet Numbering
- Home: `Sheet A-01`
- Work: `Sheet A-02`
  - Project Sub-sheets: `Sheet A-02.01`, `A-02.02`, `A-02.03`, `A-02.04`
- Process: `Sheet A-03`
- About: `Sheet A-04`
- Contact: `Sheet A-05`
- 404: Unnumbered sheet / `Sheet 404`

### 2.2 Process Page (`PAGE-01`)
- **Route:** `app/process/page.tsx`
- **Sheet Header:** `SHEET A-03 · PROCESS`
- **Title:** `Process` (Instrument Serif)
- **Intro:** `A project is a series of decisions. Here is when each one gets made. [DRAFT]`
- **Structure:** 4 sequential panels / sections:
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
  - Short draft statement (Instrument Serif italic):
    "We take care of your projects from designing to <HandCircle>handover.</HandCircle> [DRAFT]"
  - Circled word: "handover" using the existing `HandCircle` primitive.
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
  - Email: `olidesignstudio06@gmail.com` (real, clickable mailto)
  - WhatsApp: `https://wa.me/` with `[NEEDED: Studio WhatsApp number]` placeholder indicator
  - Phone: `[NEEDED: Studio phone number]`
  - Instagram: `[NEEDED: Instagram handle]`
- **Form Architecture:**
  - Exactly 4 visible fields:
    1. **Name** (`input[type="text"]`, required)
    2. **Phone / WhatsApp** (`input[type="tel"]`, required)
    3. **Project type** (`select` or custom radio group with options: *Architecture*, *Interior*, *Landscape*, *Product*, *Not sure yet*, required; pre-selects from `?type=` query param if passed)
    4. **Message** (`textarea`, required)
  - Anti-spam: Hidden `botcheck` input (invisible, `tabIndex={-1}`, `autoComplete="off"`).
  - Visible `<label>` tags for all fields; **no `placeholder=` attributes** on inputs.
  - Architectural underline styling: border-bottom only, red focus-visible state.
  - Validation: Inline validation on `blur` and on `submit`.
  - Error state: If submission fails or network fails, the user's entered values are **strictly preserved** in state, and an inline accessible error banner appears.
  - Success state: Form is replaced by confirmation container announcing via `aria-live="polite"` and rendering the animated `Stamp` primitive:
    `"THANK YOU · RECEIVED [DRAFT]"` with copy: `"We reply within [NEEDED] working day(s). [DRAFT]"`.
  - Environment Variable `NEXT_PUBLIC_WEB3FORMS_KEY`:
    - Documented in `docs/tech-spec.md` and `.env.example`.
    - If missing during development: simulates successful submission with 500ms mock delay and console payload log.
    - If missing during production build (`build:prod` / `OLI_PRODUCTION=1`): build fails immediately with a descriptive error.

### 2.5 404 Sheet (`PAGE-06`)
- **Route:** `app/not-found.tsx`
- **Copy:** Exactly per `content.md`:
  - Sheet tag: `SHEET 404 · NOT FOUND`
  - Title: `This sheet doesn't exist.`
  - Action link: `Back to Home →` linking to `/`

### 2.6 Page Transitions & Pin Lifecycle Safety (`PAGE-07`)
- **Implementation:** Architectural ink line-wipe component mounted in root layout or template:
  - Runs quick (≤400ms) stroke-wipe across the screen on pathname change.
  - Skipped if `prefersReducedMotion()` is true.
  - Skipped if the navigation is merely a query parameter change on the same pathname (e.g. `/work?type=interior`).
  - Calls `ScrollTrigger.refresh()` upon transition completion.
  - Preserves native browser Back button scroll restoration.

---

## 3. Plan Decomposition for Phase 5

1. **Plan 05-01: Process Page (`/process`, Sheet A-03) & About Page (`/about`, Sheet A-04)**
   - Build `/process` with 4-stage structured placeholders (`[NEEDED]`).
   - Build `/about` with draft philosophy, circled word, and team/location placeholders.
2. **Plan 05-02: Contact Page (`/contact`, Sheet A-05) & 4-Field Enquiry Form**
   - Build `/contact` with direct channels (real email, placeholder phone/WhatsApp).
   - Build accessible 4-field form with visible labels, blur validation, input preservation, `botcheck`, Web3Forms client-side integration (mock in dev, build guard in prod), and animated Stamp success state.
3. **Plan 05-03: 404 Sheet (`not-found.tsx`) & Line-Wipe Page Transition**
   - Build custom 404 sheet.
   - Build ≤400ms sheet line-wipe transition with pin lifecycle safety and reduced-motion bypass.
