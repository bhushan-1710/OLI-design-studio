# PRD — OLI Design Studio Website

**Status:** Draft v1 · **Related docs:** `design.md`, `ux-spec.md`, `motion-spec.md`, `content.md`, `tech-spec.md`, `client-asset-checklist.md`, `tasks.md`, `AGENTS.md`

---

## 1. Overview

OLI Design Studio is an Indian design studio offering Architecture, Interior, Landscape and Product Design. Its current website (olidesignstudio.in) is a Google Sites placeholder reading "Website under construction", with a tagline, an Instagram link and an email address. The studio has no web presence that shows its work or process.

This project replaces it with a custom site whose central idea is the studio's own promise: **"We take care of your projects from designing to handover."** The site demonstrates that promise by letting visitors watch a sketch become a built project as they scroll.

## 2. Problem

- A visitor arriving from Instagram can't judge the studio's work, process, or credibility beyond the feed.
- Four disciplines under one name reads as unfocused unless the connecting idea (one team, start to finish) is made obvious.
- There is no clear path to enquire.

## 3. Goals

| # | Goal | How we'll know |
|---|---|---|
| G1 | Convert visitors into qualified enquiries | Enquiry form + WhatsApp clicks per month (baseline to be set at launch, since none exists today) |
| G2 | Make the "design to handover" promise obvious within the first scroll | Hero + process section usability check with 3–5 people unfamiliar with the studio |
| G3 | Show real work credibly | 3–4 featured projects with real photography and process material |
| G4 | Feel distinctive, not templated | Client sign-off against `design.md` principles |
| G5 | Work well on mid-range phones | Performance budgets in `tech-spec.md` met on a real Android device |

## 4. Non-goals (v1)

- Blog, CMS-driven articles, e-commerce, client login/portal, multi-language, online payments.
- Full 3D/WebGL experiences (reconsidered only if a real 3D model of a project exists).
- Rebuilding the studio's Instagram presence.

## 5. Audience

**Primary: the homeowner.** Planning a new home, renovation or interior fit-out. Arrives on a phone from Instagram or a referral link. Needs: proof of quality, a sense of how the process works, an easy way to contact someone.

**Secondary: the small business owner.** Planning a shop, office or hospitality space. Needs: evidence the studio handles commercial work, and confidence in delivery to handover.

**Tertiary: collaborators and press** (contractors, vendors, journalists). Need: studio facts, contact, project list.

## 6. Scope

### MVP
1. Home (hero, selected work, process, disciplines, closing CTA)
2. Work index with discipline filters
3. Project detail template (and 3–4 populated projects)
4. Process page
5. About page
6. Contact page with enquiry form, WhatsApp, email, Instagram
7. Shared: nav, footer, sheet frame, dark/light theme, 404

### Later
- More projects, project categories by typology/location
- Journal/notes, testimonials, downloadable brochure
- Hindi/Marathi language option (if the client's market needs it)
- Light CMS so the studio can add projects themselves

## 7. Functional requirements

**Navigation & global**
- FR-1 Persistent nav with Work, Process, About and an Enquire button; Enquire remains visible on mobile.
- FR-2 Every page shares the sheet frame and title block system defined in `design.md`.
- FR-3 Light and dark themes follow the system setting, with a manual override stored in the browser.

**Home**
- FR-4 Hero runs the approved scroll sequence (`oli-hero.html`) using a traced drawing of a real OLI project.
- FR-5 Selected work shows 3–4 project cards linking to project pages.
- FR-6 Process section presents Sketch → Develop → Build → Handover with one drawing and one sentence per stage.
- FR-7 Closing CTA offers form, WhatsApp and email.

**Work**
- FR-8 Project index with filter chips (All, Architecture, Interior, Landscape, Product); filtering does not reload the page.
- FR-9 Each card shows name, discipline, location, cover photo.

**Project detail**
- FR-10 Template contains title/meta, brief, sketch-to-photo sequence, process images, outcome gallery, next-project link.
- FR-11 Content comes from structured data files so projects can be added without touching components.

**Contact**
- FR-12 Enquiry form with at most four fields (name, phone/WhatsApp, project type, message); validates client-side and server-side; success and error states.
- FR-13 One-tap WhatsApp (click-to-chat) and `mailto:` links; Instagram link.
- FR-14 Spam protection that does not rely on a visible CAPTCHA.

**SEO / sharing**
- FR-15 Real HTML text for headings, tagline, disciplines, project names; unique title/description per page; Open Graph images; sitemap.xml and robots.txt; `ProfessionalService` structured data.

## 8. Non-functional requirements

- **Performance:** see budgets in `tech-spec.md` (mid-range Android on 4G is the reference device).
- **Accessibility:** WCAG 2.2 AA; full keyboard use; reduced-motion mode renders all content in its final state with no pinning.
- **Responsive:** designed mobile-first at 390px; tested at 390, 768, 1280, 1920.
- **Browsers:** current Chrome, Safari (iOS and macOS), Firefox, Edge.
- **Maintainability:** content in data files, not hard-coded in components; design tokens in one place.

## 9. Success metrics

- Enquiries (form + WhatsApp click-throughs) per month, tracked from launch.
- Median scroll depth on Home reaches the process section.
- Bounce rate on mobile sessions from Instagram.
- Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.

## 10. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Studio can't supply good project photos/drawings | Site loses its core strength | Use `client-asset-checklist.md` early; fall back to tracing plans/elevations; do not ship with stock |
| Scroll animation hurts mobile performance | Visitors leave | SVG-only motion, filter off on mobile, performance budgets, real-device testing |
| "Hand-drawn" reads as amateur | Credibility loss | Follow `design.md` don'ts; hand font limited to annotations; precise linework |
| Content and copy arrive late | Launch delay | `content.md` placeholders are clearly flagged; ship with real content only |
| Client wants more than MVP | Scope creep | Later list in §6; change requests go through `tasks.md` |

## 11. Dependencies

- Studio-supplied projects, photographs, drawings, team info, contact details (see checklist).
- Domain access for `olidesignstudio.in` (DNS) to move from Google Sites.
- Form delivery destination (email address or service account).

## 12. Open questions

1. Which 3–4 projects launch on the home page?
2. Do plans, sections or sketches exist for them?
3. WhatsApp business number and enquiry email destination?
4. Studio location(s) and service area?
5. Is a Hindi or Marathi version needed at launch?
6. Who maintains the site after launch, and how often do they add projects?
