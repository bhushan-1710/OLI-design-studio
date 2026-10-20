# UX Spec — OLI Design Studio

Defines structure and behaviour. Visual rules live in `design.md`; motion detail in `motion-spec.md`.

---

## 1. UX principles

1. **One next step per screen.** Every section ends in an obvious action (see work, see process, enquire).
2. **Proof before pitch.** Show projects and process before asking for contact.
3. **Phone first.** Most visitors arrive from Instagram on a phone. Design at 390px, then scale up.
4. **Animation never gates content.** Copy is readable without waiting for or finishing any animation.
5. **Low-friction contact.** WhatsApp first (the likely preferred channel for this market), form second, email third.

## 2. Sitemap

```
/                Home            Sheet A-01
/work            Work index      Sheet A-02
/work/[slug]     Project detail  Sheet A-03 … A-0n
/process         Process         Sheet A-0n+1
/about           About           Sheet A-0n+2
/contact         Contact         Sheet A-0n+3
/404             Not found
```

Global: Nav (Work · Process · About · Enquire), Footer (contact, Instagram, location, small print).

## 3. Core user flows

**Flow A: Instagram visitor → enquiry (primary)**
Instagram link → Home hero (promise) → scroll sketch-to-handover → Selected work → a project page → Enquire (form or WhatsApp).

**Flow B: Referred visitor → credibility check**
Link to a project or Home → Work index → filter by discipline → project detail → Process → Contact.

**Flow C: Collaborator → contact**
Home or Contact → email/Instagram. Footer must carry these on every page.

## 4. Page wireframes (low-fidelity, mobile first)

### Home

```
┌──────────────────┐
│ OLI        Enquire│  nav
│                  │
│ From sketch to   │  headline (serif)
│ handover.        │
│ tagline          │
│  ┌────────────┐  │
│  │ elevation  │  │  pinned drawing: sketch → plan → build → handed over
│  │ drawing    │  │
│  └────────────┘  │
│ 01 02 03 04      │  stage tracker
└──────────────────┘
┌──────────────────┐
│ ── 4.2 M ──      │  dimension-rule divider
│ Selected work    │
│ [photo] Name     │  3–4 project cards, stacked on mobile
│ Disciplines · Loc│
│ [photo] Name     │
│ → All work       │
└──────────────────┘
┌──────────────────┐
│ Process          │  pinned horizontal: Sketch → Develop → Build → Handover
│ 01 ▢──▢──▢──▢    │  mobile: stacked panels, drawing on enter
└──────────────────┘
┌──────────────────┐
│ Architecture  ↗  │  four large lines of text; tap/hover reveals small drawing
│ Interior      ↗  │
│ Landscape     ↗  │
│ Product       ↗  │
└──────────────────┘
┌──────────────────┐
│ Have a project?  │  closing CTA
│ [WhatsApp][Form] │
│ email · Instagram│
└──────────────────┘
 footer
```

### Work index

```
Sheet A-02 · Work
[All][Architecture][Interior][Landscape][Product]   filter chips
┌─────────┐ ┌─────────┐   2 columns desktop, 1 mobile
│ photo   │ │ photo   │
│ Name    │ │ Name    │
│ Interior│ │ Arch.   │
└─────────┘ └─────────┘
```

### Project detail

```
Name (serif, large)
Discipline · Location · Year        mono meta
Brief — 2–3 sentences
┌──────────────────────────┐
│ sketch overlay → photo   │   scroll-scrubbed reveal
└──────────────────────────┘
Process images (plans, sections, site)
Outcome gallery
→ Next project  ·  Enquire about a project like this
```

### Process

```
Intro sentence
01 Sketch      what we do · what you decide · what you receive
02 Develop     …
03 Build       …
04 Handover    …
CTA
```

### About

```
Studio philosophy (short, serif)
Team: portrait · name · role
Location(s)
CTA
```

### Contact

```
Let's talk about your project.
[ WhatsApp ]  [ Call ]  [ Email ]
Name ____
Phone / WhatsApp ____
Project type  (Architecture | Interior | Landscape | Product | Not sure)
Message ____
[ Send ]
Instagram · address (if applicable)
```

## 5. Interaction rules

- **Sticky Enquire** on mobile: visible after the hero; never covers content or form fields.
- **Filters:** instant, no page reload; the active filter is reflected in the URL (`/work?type=interior`) so it can be shared.
- **Form:** inline validation on blur; submit button shows progress; success replaces the form with a confirmation (stamp) and states what happens next ("We reply within one working day", pending client confirmation). Errors never clear what the user typed.
- **Links to projects:** the entire card is the link; focus ring in red.
- **Back behaviour:** returning from a project to Work restores scroll position and filter.
- **Page transitions:** quick (≤ 400 ms) sheet-line wipe; skipped under reduced motion.

## 6. Accessibility behaviour

- Headings in order, one `h1` per page.
- Pinned scroll sections keep a logical DOM order and expose all text to screen readers at once.
- Drawings are `role="img"` with a one-line description; decorative lines are `aria-hidden`.
- Focus state: 2px red outline with offset, never removed.
- Touch targets ≥ 44 × 44 px.

## 7. Content constraints that shape the UX

- Four form fields maximum.
- Project cards need a cover photo; no photo, no card.
- Project pages need at least a brief and three images to publish.
- No page may depend on content the studio hasn't confirmed (see `client-asset-checklist.md`).
