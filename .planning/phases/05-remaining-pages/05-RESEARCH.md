# Phase 5 Research: Remaining Pages, Form Integration & Transitions

## 1. Web3Forms Integration Pattern

### 1.1 Submission Protocol
- **Endpoint:** `POST https://api.web3forms.com/submit`
- **Headers:**
  ```js
  {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  ```
- **Payload Shape:**
  ```json
  {
    "access_key": "...",
    "name": "...",
    "phone": "...",
    "project_type": "...",
    "message": "...",
    "botcheck": ""
  }
  ```
- **Response Format:**
  - Success: HTTP 200 with JSON `{ "success": true, "message": "..." }`
  - Error: `{ "success": false, "message": "..." }`
- **Verification Rule:** Code must inspect `data.success === true`, not merely `res.ok === 200`.

### 1.2 Form State Machine & Resilience
- **States:**
  - `idle`: Default clean form with visible labels.
  - `submitting`: Inputs and submit button disabled (`disabled={isSubmitting}`); loading spinner or "Sending..." indicator.
  - `success`: Form replaced by confirmation container with `aria-live="polite"` announcing success and rendering the animated `Stamp` primitive.
  - `error`: Inline red error message above form; all user inputs are strictly preserved in state so nothing has to be re-typed.
  - `demo`: When `NEXT_PUBLIC_WEB3FORMS_KEY` is missing in development, displays a clearly labelled `"Demo mode — this was NOT sent"` banner. Never shows the success stamp.
- **Timeout:** 10-second timeout using native `AbortController`:
  ```ts
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  ```
- **Phone Validation Regex (Loose):**
  Accepts digits, spaces, `+`, `-`, and parentheses, length 7 to 20:
  ```ts
  const PHONE_REGEX = /^[\d\s+\-()]{7,20}$/;
  ```

---

## 2. Page Transitions & Pin Lifecycle Safety

### 2.1 Next.js App Router Transition Architecture
- **Challenge:** Pinned ScrollTrigger sections (Home hero and Process horizontal scroll) depend on accurate window heights and DOM positions. If an exit transition hides the old page while the new page renders, or if scroll positions jump prematurely, ScrollTrigger pin-spacers can calculate incorrect offsets.
- **Safe Pattern:**
  - Track `pathname` using `usePathname()`. Since `usePathname()` ignores query string changes (`?type=...`), filter-only changes on `/work` will never trigger the route transition.
  - Transition overlay: A high-z-index lightweight SVG ink line that wipes across the screen in ≤400ms (`power2.inOut`).
  - Upon transition settle:
    - Invoke `ScrollTrigger.refresh()`.
    - Ensure Lenis is running (`lenis.start()`).
  - `prefers-reduced-motion`: When reduced motion is preferred, bypass transition entirely (duration 0).
- **Contingency Gate:** If browser Back/Forward scroll restoration or pin spacers show any sign of jumping or mismeasurement, drop the transition completely per user instruction.

---

## 3. Copy & Placeholders Fencing

- **Process Page:**
  - Intro: `A project is a series of decisions. Here is when each one gets made. [DRAFT]`
  - 4 stages: `01 Sketch`, `02 Develop`, `03 Build`, `04 Handover`
  - Each stage contains *What we do*, *What you decide*, *What you receive* structured as `[NEEDED: Studio process details]`. Zero invented process narratives.
- **About Page:**
  - Philosophy: strictly `[NEEDED: Studio's own words]`.
  - HandCircle demo: uses approved `content.md` phrase: `"From sketch to <HandCircle>handover.</HandCircle>"`.
  - Team & Location: `[NEEDED: Team member name]`, `[NEEDED: Team portrait]`, `[NEEDED: Studio location]`.
- **Contact Page:**
  - Direct email: `mailto:olidesignstudio06@gmail.com`
  - Phone & WhatsApp: Non-link plain text: `[NEEDED: WhatsApp number]`, `[NEEDED: Phone number]`.
- **404 Sheet:**
  - "This sheet doesn't exist. Back to Home →"
