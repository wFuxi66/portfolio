# Jimmy Zheng — portfolio

A cinematic single-page portfolio for Jimmy Zheng, a full-stack developer and computer science student at IUT d'Orsay. Built as a study in Chinese ink painting, editorial typography, and slow, tactile motion.

**Live:** <https://wfuxi66.github.io/portfolio/>  
**Code:** <https://github.com/wFuxi66/portfolio>

---

## Run it

Requires Node 20.19+ or 22.12+ (tested on Node 22).

```bash
npm install
npm run dev       # local dev server at /
npm run build     # production build to dist/ (base: /portfolio/)
npm run preview   # serve the production build at /portfolio/
```

No environment variables, API keys, or build-time asset pipeline. Everything ships in `public/`.

The Vite config keeps the dev server at the root and sets the GitHub Pages base to `/portfolio/` only for production builds.

---

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`: install with `npm ci`, build with Vite, and publish `dist/` to GitHub Pages.

---

## Languages

The page is bilingual French / English.

- **Location-first detection:** visitors in France (or French overseas time zones) get French; everyone else gets English. Browser language is used as a fallback for French speakers abroad.
- **Manual switch:** the `FR / EN` control in the header overrides detection and is remembered in `localStorage`.
- **No IP lookup, no backend.** The static French markup is the source; `src/i18n.js` swaps text and attributes in place, so the animations and DOM references stay intact.
- Meta title, description, Open Graph locale, and image alt text follow the active language.

---

## Stack

- **Vite** — static build
- **GSAP + ScrollTrigger** — reveals, pinned chapters, horizontal gallery
- **Lenis** — smooth scrolling, synced to ScrollTrigger
- **WebGL** — a hand-written ink-diffusion shader (`src/ink.js`)
- **Web Audio** — procedurally generated room tone, no audio files
- **Vanilla JS / CSS** — no framework, no runtime dependencies beyond the above

---

## Structure

```
.github/workflows/deploy.yml   GitHub Pages build + deploy
index.html              page, copy, inline SVG marks, static French content
src/style.css           design system, layout, responsive + reduced motion
src/main.js             loader, navigation, motion, dialogs, audio
src/i18n.js             French → English layer + location detection
src/ink.js              WebGL ink field with 2D/CSS fallback
public/img/             artwork crops and social cover
public/favicon.svg      site mark
public/fonts/           self-hosted Latin + text-subset CJK fonts
public/CV_Jimmy_ZHENG.pdf
vite.config.js          dev at /, production build at /portfolio/
```

The five skill domains and four journey steps are driven by the markup; project dialog copy lives in `main.js` and is bilingual.

---

## Content map

- **Hero** — Jimmy Zheng, full-stack developer, Paris.
- **Profile** — BUT Informatique at IUT d'Orsay, Networks & Security track; internship at USTS; looking for an internship from 18 January to 14 May 2027.
- **Skills** — languages, frameworks, data, systems/network, practices/quality.
- **Journey** — BUT Informatique, USTS internship, CHOKEN, Baccalauréat.
- **Projects** — Réservation (USTS), osu!scan, Glitch Party, plus eight archived projects, including the previous 3D PCB portfolio.
- **Contact** — email, phone, GitHub, LinkedIn, CV.

---

## Motion notes

- A short ink-wash preloader waits for the hero image and a minimum beat, then hands off to the title reveal.
- The skills chapter pins and advances through five steps; the ink circle is a live WebGL field that responds to pointer movement and step.
- The journey chapter is a pinned horizontal gallery on desktop and native horizontal scroll under reduced motion.
- Header theme inverts over dark sections.
- Reduced motion (`prefers-reduced-motion: reduce`) removes pins, reveals, particles, and the preloader beat; content remains fully readable in normal document flow.
- WebGL failure adds `.is-fallback` to the ink circle and shows a painted CSS composition instead.
- Native scrollbars are hidden; the thin top rule is the scroll progress indicator.
- “Back to the surface” scales its duration with scroll distance and eases both ends.

Keyboard support includes a skip link, focus trapping in the edition dialog, Escape to close, and visible focus styles.

---

## Artwork & credits

All paintings and objects are **public domain**, downloaded from [The Metropolitan Museum of Art Open Access](https://www.metmuseum.org/about-the-met/policies-and-documents/open-access), then cropped and colour-graded for the site.

- Shitao (Zhu Ruoji), *Thirty-six Peaks of Mount Huang Recollected*, ca. 1705 — hero scroll
- Wang Meng, *Red Cliffs and Green Valleys*, ca. 1367 — profile figure
- Wang Meng, *Simple Retreat*, ca. 1370 — osu!scan card
- Chen Rong, *The Dragon*, 13th century — interlude and Glitch Party card
- Attributed to Shitao, *Landscapes* (album leaf), ca. 1690 — panorama and Réservation card
- Duan inkstone with pine and bird carving — object study

Typefaces: [Instrument Serif & Instrument Sans](https://fonts.google.com/specimen/Instrument+Serif) and [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC), self-hosted under the SIL Open Font License. The CJK files are text subsets containing only the glyphs used on the page.

Room tone is synthesized in the browser with filtered brown noise and a slow gain envelope. No recordings are used.

---

## Notes

- The project is a portfolio, not an atelier: the ink paintings and Chinese typographic accents are art direction, while the content, projects, dates, and contact details are Jimmy Zheng's.
- The previous 3D PCB portfolio is preserved under the `pcb-2026` tag, and the archive links to it.
- The social preview (`public/img/og-cover.jpg`, 1200 × 630) is composed from the hero scroll, the site's type, and the 2027 internship window.
- Glitch Party's original domain is offline; its card now opens a demo request by email.

---

## License

MIT — see `LICENSE`.
