# Tech Spec — OLI Design Studio

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router), static export | Static output, fast on mobile, easy hosting, fits the Antigravity workflow |
| Styling | Plain CSS with custom properties (tokens from `design.md`) | The sheet aesthetic is custom; a UI kit would fight it |
| Motion | GSAP 3.12.x + ScrollTrigger, Lenis 1.1.x | Same versions as the approved hero prototype |
| Drawings | Inline SVG components | Crisp, tiny, animatable |
| Content | Typed data files (`/content/*.ts` or JSON/MDX) | Projects can be added without touching components |
| Forms | Server endpoint or form service (Resend, Web3Forms or Formspree) | Decision pending, see §6 |
| Fonts | `next/font` for Instrument Serif, Just Another Hand, DM Mono | Self-hosted, no layout shift |
| Images | `next/image` with AVIF/WebP, responsive sizes | Photos are the heaviest assets |
| Hosting | Vercel or Netlify | Free tier is enough; custom domain support |
| Analytics | Plausible or GA4 (client's choice) | Needs enquiry-click events |

Pin exact versions in `package.json`. Choose release versions at least two weeks old.

## 2. Project structure

```
/app
  layout.tsx            sheet frame, nav, footer, theme
  page.tsx              Home
  work/page.tsx         Work index
  work/[slug]/page.tsx  Project detail
  process/page.tsx
  about/page.tsx
  contact/page.tsx
  not-found.tsx
/components
  layout/   Nav, Footer, SheetFrame, TitleBlock, ThemeToggle
  ui/       Button, Chip, Stamp, DimensionRule, Annotation, HandCircle
  drawings/ HeroElevation, ProcessSketch, DisciplineSketches
  sections/ Hero, SelectedWork, ProcessScroll, Disciplines, ClosingCTA
/lib
  motion/   lenis.ts, draw.ts, hero.ts, process.ts (gsap contexts)
  seo.ts
/content
  projects.ts           typed project data
  site.ts               contact details, nav, copy that repeats
/styles
  tokens.css  base.css  components.css
/public
  images/ (optimised exports)  og/  favicon
```

## 3. Data model

```ts
type Discipline = 'architecture' | 'interior' | 'landscape' | 'product';

interface Project {
  slug: string;
  name: string;
  disciplines: Discipline[];
  location: string;
  year: number;
  brief: string;                 // 2–3 sentences
  cover: ImageRef;               // photo with width/height/alt
  drawing?: { svg: string; alt: string };  // for sketch-to-photo scrub
  process: { image: ImageRef; caption: string }[];
  gallery: ImageRef[];
  featured?: boolean;            // appears on Home
}
```

A project cannot publish without `cover`, `brief` and at least three images (build-time validation).

## 4. Performance budgets (reference: mid-range Android, 4G)

| Metric | Target |
|---|---|
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.05 |
| INP | ≤ 200 ms |
| JS shipped on Home | ≤ 200 KB gzipped (including GSAP + ScrollTrigger + Lenis) |
| Hero drawing SVG | ≤ 60 KB |
| Image weight per project page | ≤ 1.5 MB initial, rest lazy-loaded |
| Lighthouse (mobile) | Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95 |

Tactics: load animation code only on pages that need it; dynamic-import ScrollTrigger-heavy sections; no wobble filter on mobile; lazy-load below-the-fold images; preload the headline font only.

## 5. SEO and structured data

- Per-page `metadata` (title, description, canonical, Open Graph, Twitter).
- `sitemap.xml` and `robots.txt` generated at build.
- JSON-LD `ProfessionalService` on Home/Contact (name, URL, email, Instagram `sameAs`, address when supplied).
- OG image: static export of the hero drawing, 1200 × 630.
- Redirect plan: the old Google Sites URLs (`/home`) redirect to `/`.

## 6. Forms and contact

- Fields: name, phone/WhatsApp, project type, message.
- Static export form provider: Web3Forms via client-side fetch (`https://api.web3forms.com/submit`).
- Access Key Environment Variable: `NEXT_PUBLIC_WEB3FORMS_KEY` (documented in `.env.example`).
  - In development/preview: if unset, form simulates submission in mock mode with a 500ms delay, logs payload to console, and triggers the success Stamp.
  - In production (`OLI_PRODUCTION=1`): build fails if the key is missing or blank.
- Spam protection & validation: honeypot field named `botcheck` (hidden via CSS and tabindex -1), client-side input validation on blur, and access key restricted to the production domain (`olidesignstudio.in`).
- Delivery: direct to `olidesignstudio06@gmail.com`.
- WhatsApp: `https://wa.me/<number>?text=<prefilled message>`, number to be supplied.
- Fallback redundancy: direct WhatsApp and `mailto:` links displayed prominently on submission failure. Input values are preserved in state on error.

## 7. Theming

Tokens on `:root`; dark values under `@media (prefers-color-scheme: dark)` guarded with `:root:not([data-theme="light"])` and under `:root[data-theme="dark"]`. Manual toggle placed in the Footer, defaulting to system preference and storing user override in `localStorage`. Set the theme attribute before paint (inline script) to avoid any flash.

## 8. Accessibility implementation

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page.
- Skip-to-content link.
- `role="img"` + label on drawings; decorative linework `aria-hidden`.
- Focus-visible styles in red, 2px with offset.
- Reduced motion handled at the root (no `js` class, no Lenis, no pin).

## 9. Deployment & Production Safety

1. **Production Build Command:** Hosting platforms (Vercel, Cloudflare Pages, Netlify, etc.) **MUST** use the command `npm run build:prod` (which invokes `cross-env OLI_PRODUCTION=1 next build && node scripts/clean-dev-export.mjs && node scripts/scan-placeholders.mjs`), or configure the environment variable `OLI_PRODUCTION=1` in the hosting environment.
2. **Production Safety Gates:**
   - `content/projects.ts` build-time validation strictly throws and halts compilation if any project has `isPlaceholder: true`.
   - `scripts/scan-placeholders.mjs` executes post-build and scans all exported HTML (`out/**/*.html`) for `[NEEDED`, `TBC`, and `placeholder`. Under `OLI_PRODUCTION=1`, it strictly fails the build if any matches are detected.
   - Development builds (`npm run build`) allow placeholders with visible warnings to facilitate local review and design iteration.
3. Repo on GitHub; main branch protected, preview deploys per PR.
4. Environment variables for form provider keys.
5. Add `olidesignstudio.in` as the custom domain; update DNS at the registrar (needs client access).
6. Test the redirect from the Google Sites URL before switching DNS.
7. Post-launch: submit sitemap to Google Search Console; verify analytics events.

## 10. Testing

- Manual: 390, 768, 1280, 1920 widths; iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari.
- Automated: Lighthouse CI on Home, Work, one project page; axe accessibility scan.
- Animation QA checklist lives in `motion-spec.md` §8.
