# Technical Implementation Research: OLI Design Studio

This document covers the implementation-level research topics specifically left open for the Next.js App Router + GSAP + Lenis + static export architecture.

---

## 1. GSAP ScrollTrigger Pinning in Next.js App Router

### Patterns & Constraints
1. **Client Boundary (`'use client'`):**
   - Any component initializing GSAP animations or ScrollTrigger must be a Client Component.
   - Server components can wrap client components and pass serialized props/data.

2. **Lifecycle & Cleanup (`gsap.context()`):**
   - React 18+ Strict Mode mounts, unmounts, and remounts components in development. Without strict cleanup, duplicate ScrollTrigger instances cause pinned sections to misalign or break pin spacers.
   - Wrap all GSAP tween and ScrollTrigger creation inside `gsap.context((self) => { ... }, containerRef)`.
   - On unmount (`return () => ctx.revert()`), all tweens, timelines, and ScrollTrigger pin spacers are cleanly removed.

3. **Viewport Height & Mobile Address Bars:**
   - Always use `100svh` (small viewport height) for `.stage` and full-screen pinned containers rather than `100vh` or `100dvh`.
   - `100svh` prevents pin jump and height recalculation thrashing when mobile browser chrome (address/URL bar) expands or contracts on Android Chrome and iOS Safari.

4. **Font Loading & ScrollTrigger Refresh:**
   - Next.js `next/font` loads font subsets with zero layout shift (`display: 'swap'`).
   - Call `ScrollTrigger.refresh()` after web fonts load (`document.fonts.ready.then(() => ScrollTrigger.refresh())`) or when DOM measurements stabilize.

---

## 2. Lenis 1.1.x + ScrollTrigger Integration

### Setup Architecture
To ensure silky 60fps smooth scrolling while keeping ScrollTrigger pins and scrub timelines perfectly synchronized:

```ts
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  // If user prefers reduced motion, do not initialize Lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    autoRaf: false, // We drive RAF via GSAP ticker
  });

  // Synchronize ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update);

  // Bind Lenis RAF into GSAP's central ticker
  const tickerUpdate = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerUpdate);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerUpdate);
    lenis.destroy();
  };
}
```

### Reduced-Motion Fallback
- Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- If true: bypass Lenis completely, do not add `html.js`, leave native scrolling untouched, and render all SVG strokes and wash layers in their final (completed) state without pinning.

---

## 3. Static-Export Form Handling (`output: 'export'`)

### Constraints
- With Next.js `output: 'export'`, the build generates purely static HTML/CSS/JS bundles.
- Next.js API Routes (`/app/api/contact/route.ts`) are **not** supported in static export mode because there is no Node.js runtime server.

### Implementation Architecture
1. **Third-Party Client-Side Endpoint (Web3Forms / Formspree):**
   - The enquiry form posts directly via browser `fetch` to an external API (default recommendation: **Web3Forms**, which offers an API key, zero backend setup, email delivery to `olidesignstudio06@gmail.com`, and CORS support).
   - Form state management:
     - Input fields: Name, Phone/WhatsApp, Project Type (select/radio), Message.
     - Hidden Honeypot field (e.g. `botcheck` or `_gotcha`) hidden with CSS (`display: none;` and `tabIndex={-1}`).
     - Submission sends JSON payload to `https://api.web3forms.com/submit`.
2. **Offline & Fallback Redundancy:**
   - If form submission encounters a network error or failure, the error message clearly displays direct WhatsApp (`https://wa.me/...`) and `mailto:olidesignstudio06@gmail.com` links so the lead is never lost.
3. **Validation & Success:**
   - Client-side validation runs on blur and submit.
   - Successful submission renders the confirmation card stamped with the animated "ENQUIRY RECEIVED" / "HANDED OVER" stamp.
