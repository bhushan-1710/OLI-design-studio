---
status: awaiting_user_verification
result: pending_user_review
phase: 02-home-hero
source:
  - 02-01-SUMMARY.md
  - 02-02-SUMMARY.md
started: 2026-10-20T14:39:00+05:30
updated: 2026-10-20T15:42:00+05:30
---

## Summary

total: 5
passed: 0
awaiting_user_verification: 5
issues: 0

Script-verifiable DOM node structures and static compilation pass. Per project policy, all animation timing, pinning feel, visual contrast, and layout aesthetics are recorded as "awaiting user verification" and are not self-certified.

## Tests

### 1. Intro Animation & Initial State
expected: Construction lines draw, then outline draws, headline fades up, tracker sits on "01 Sketch", "scroll ↓" bobs, and TitleBlock shows A-01.
status: awaiting user verification
notes: DOM elements and SVG layers exist in markup; visual pacing and animation entrance require user verification in browser.

### 2. Pinned Scroll Scrub & Stage Progression
expected: As you scroll, the hero stays pinned for 3 viewport heights (+=300%). "scroll ↓" fades out immediately. Secondary linework (.s2) draws, dimension rules (.dim) draw, annotations (.note) fade in, watercolor washes rise smoothly from ground line, construction lines fade out, the red "HANDED OVER" stamp lands with a bounce at -5deg, and the red circle loops around "handover.". Stage tracker progresses 01 Sketch -> 02 Develop -> 03 Build -> 04 Handover.
status: awaiting user verification
notes: GSAP timeline and threshold logic implemented; visual pinning feel, scrub smoothness, and stamp bounce require user verification.

### 3. Clean Pin Release & Strict-Mode Layout
expected: At the end of the scroll scrub, the hero releases cleanly to reveal subsequent sections with exactly 1 pin spacer and zero ghost whitespace.
status: awaiting user verification
notes: Exactly 1 `.pin-spacer` confirmed in DOM; visual release and scroll feel require user verification.

### 4. Dark Mode Wash & Linework Contrast
expected: Switch to dark theme in Footer. Revisit the hero scrub: light cream linework (#ECE6D9) remains crisp, distinct, and legible over all dark watercolor wash fills (sand, concrete, glass, slab, sage).
status: awaiting user verification
notes: Calibrated dark tokens declared in tokens.css; visual contrast and perceived legibility require user verification.

### 5. Mobile Layout (390px) & Reduced Motion
expected: At 390px, copy collapses to 1 column, tags hide, TitleBlock hides, SVG art expands responsively, and wobble filter is stripped. Under prefers-reduced-motion, the hero displays the completed drawing, wash, stamp, and Handover stage immediately with no scroll pin or Lenis.
status: awaiting user verification
notes: CSS media queries and prefers-reduced-motion checks in code; visual presentation on mobile viewports and reduced motion feel require user verification.

## Gaps

Awaiting user visual inspection at http://localhost:3005.
