# Phase 5 Plan 02 Summary: Contact Page & Enquiry Form

## What Was Built
1. **Architectural Drafting Form Styles (`styles/components.css`)**:
   - Clean underline inputs (`border-bottom: 1.5px solid var(--ink)`), zero corner radii, visible labels with uppercase mono styling.
   - Red focus ring (`outline: 2px solid var(--red); outline-offset: 4px; border-bottom-color: var(--red)`).
   - Demo notice banner and error alert styling.

2. **Enquiry Form Component (`components/contact/EnquiryForm.tsx`)**:
   - Exactly 4 visible fields: Name (`input[type="text"]`), Phone / WhatsApp (`input[type="tel"]`), Project type (`select`), Message (`textarea`).
   - Hidden honeypot field (`input[name="botcheck"]`).
   - **Zero `placeholder=` attributes** on inputs — visible labels with `htmlFor` pointing to element `id`.
   - Client-side validation on `blur` and on `submit`:
     - Loose phone validation regex: `/^[\d\s+\-()]{7,20}$/`.
     - Preserves all entered data in React state upon error or timeout so user work is never lost.
   - Double-submit prevention: buttons and inputs disabled while `isSubmitting` is true.
   - 10-second request timeout with `AbortController`.
   - Web3Forms Integration:
     - Demo Mode: When `NEXT_PUBLIC_WEB3FORMS_KEY` is not configured in dev/preview, displays a visible notice banner ("Demo mode — this was NOT sent...") and never displays a false success stamp.
     - Production Guard: When `OLI_PRODUCTION=1`, build immediately fails in `next.config.mjs` if `NEXT_PUBLIC_WEB3FORMS_KEY` is missing or empty.
     - Success Handling: Verifies provider response `data.success === true` before transitioning to confirmation view with animated `Stamp` ("RECEIVED") and live region announcement.
   - Project type query param pre-selection via `useSearchParams()`.

3. **Contact Page (`app/contact/page.tsx`, Sheet A-05)**:
   - Header with `SHEET A-05 · CONTACT` and single `h1`.
   - 2-Column desktop / 1-column mobile layout.
   - Left Column: Direct channels:
     - Clickable `mailto:olidesignstudio06@gmail.com`.
     - Plain non-link text for WhatsApp (`[NEEDED: WhatsApp number]`) and phone (`[NEEDED: Phone number]`) to prevent dead `wa.me/` or `tel:` links.
     - Studio location placeholder (`[NEEDED: Studio location / address]`).
   - Right Column: `<EnquiryForm />` enclosed in `Suspense`.
   - Architectural TitleBlock configured with `A-05`, `Contact`, `Scale 1:100`.

## Verification Status
- Automated script checks (`scripts/verify-contact.mjs`):
  - Sheet A-05 header present.
  - Primary email rendered as clickable mailto link.
  - Zero `placeholder=` attributes on form inputs/textarea.
  - WhatsApp and phone rendered as plain non-link text.
  - Botcheck honeypot present.
  - Visible labels present for all 4 fields.
  - Production build guard verified to fail when `OLI_PRODUCTION=1` and `NEXT_PUBLIC_WEB3FORMS_KEY` is absent.
- Visual styling, keyboard interaction, and responsiveness: **Recorded as awaiting user verification** (per hard rule against self-certifying UAT).
