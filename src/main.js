// Jimmy Zheng — portfolio interaction and motion direction.
// Warm paper, slow ink, and nothing that moves without a reason.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { InkField } from './ink.js';
import { getLang, initLanguage, t } from './i18n.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const dom = {
  html: document.documentElement,
  body: document.body,
  loader: $('#loader'),
  loadCount: $('#load-count'),
  loadBar: $('#load-bar'),
  header: $('#header'),
  progressBar: $('#scroll-progress-bar'),
  clock: $('#clock'),
  footerClock: $('#clock-footer'),
  menuToggle: $('#menu-toggle'),
  menuDialog: $('#menu-dialog'),
  menuClose: $('#menu-close'),
  editionDialog: $('#edition-dialog'),
  toast: $('#toast'),
  toastText: $('#toast-text'),
  soundToggle: $('#sound-toggle'),
  backTop: $('#back-top'),
  hero: $('.hero'),
  heroCopy: $('.hero-copy'),
  heroArt: $('#hero-art'),
  scrollFrame: $('#scroll-frame'),
  craftStage: $('#craft-stage'),
  inkCanvas: $('#ink-shader'),
  inkGlyph: $('#ink-glyph'),
  stepCurrent: $('#step-current'),
  craftProgress: $('#craft-progress'),
  progressRing: $('#progress-ring'),
  craftSteps: $$('.craft-step'),
  treasurePin: $('#treasure-pin'),
  treasureViewport: $('#treasure-viewport'),
  treasureTrack: $('#treasure-track'),
  treasureIndex: $('#treasure-index'),
  treasureProgress: $('#treasure-progress'),
  treasureCards: $$('.treasure-card'),
  loaderBrand: $('.loader-brand'),
  loaderAside: $('.loader-aside'),
  loaderProgress: $('.loader-progress')
};

let lenis = null;
let ink = null;
let inkVisible = false;
let toastTimer = null;
let activeEditionOpener = null;
let menuOpener = null;
let currentCraftStep = -1;
let currentTreasure = -1;
let headerScrolled = false;
let headerDark = false;
let scrollbarDark = null;
let headerHidden = false;
let lastScrollY = 0;
let scrollTicking = false;

// Navigation and chapter state. One owner for "where are we going / where
// are we", so the header, active link, and focus all agree.
let navState = 'idle';
let navToken = 0;
let activeChapterOverride = null;
let activeChapterIndex = -2;
const initialHash = location.hash;
let lastAppliedHash = initialHash;

// Layout is measured once per refresh, not read back on every scroll frame.
const metrics = {
  pageHeight: 0,
  headerHeight: 0,
  darkRanges: [],
  chapters: [],
  treasure: {
    max: 0,
    centers: [],
    viewportCenter: 0
  }
};

const darkSections = $$('.theme-dark, .footer');
const sections = ['origin', 'craft', 'treasures', 'editions', 'visit']
  .map((id) => ({ id, el: document.getElementById(id), link: $(`.main-nav a[href="#${id}"]`) }))
  .filter((item) => item.el && item.link);

/* =========================================================
   small utilities
   ========================================================= */

function showToast(message, duration = 3600) {
  if (!dom.toast || !dom.toastText) return;
  window.clearTimeout(toastTimer);
  dom.toastText.textContent = message;
  dom.toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => dom.toast.classList.remove('is-visible'), duration);
}

function formatCount(value) {
  return String(Math.round(value)).padStart(2, '0');
}

function setLoaderProgress(value) {
  const amount = clamp(value, 0, 100);
  if (dom.loadCount) dom.loadCount.textContent = formatCount(amount);
  if (dom.loadBar) dom.loadBar.style.transform = `scaleX(${amount / 100})`;
}

function lockScroll() {
  dom.html.classList.add('has-dialog');
  lenis?.stop();
}

function unlockScroll() {
  if (dom.menuDialog?.open || dom.editionDialog?.open) return;
  dom.html.classList.remove('has-dialog');
  if (!reduced) lenis?.start();
}

function getTarget(hash) {
  if (!hash || hash === '#') return null;
  try {
    return document.querySelector(hash);
  } catch {
    return null;
  }
}

// A full-page return is long enough that a fixed duration or an aggressive
// ease-out reads as a jump followed by a crawl. Scale the time with distance
// and ease both ends so the ascent lifts off and settles instead.
const easeSurface = (t) => t * t * (3 - 2 * t);

// Same grammar for in-page hops: no jerk at the start, no abrupt stop.
const easeJourney = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// A jump longer than this crosses whole pinned chapters. Animating the camera
// through them reads as a blur, so the travel happens behind an ink veil.
const VEIL_DISTANCE = 1.7;

function docTop(element) {
  return window.scrollY + element.getBoundingClientRect().top;
}

function targetTop(target) {
  return Math.max(0, docTop(target));
}

function jumpInstantly(top) {
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo(0, top);
  lastScrollY = window.scrollY;
}

function isNavigating() {
  return navState !== 'idle';
}

function showHeader() {
  if (!headerHidden) return;
  headerHidden = false;
  dom.header?.classList.remove('is-hidden');
}

function focusTarget(target) {
  if (!target) return;
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  try {
    target.focus({ preventScroll: true });
  } catch {
    /* no-op */
  }
}

function focusIfArrived(target, top, focus = true) {
  if (!focus) return;
  if (Math.abs(window.scrollY - top) > 8) return;
  focusTarget(target);
}

/* ---------- layout metrics ---------- */

function measureTreasure() {
  if (!dom.treasureTrack || !dom.treasureViewport) return;
  metrics.treasure.max = Math.max(
    0,
    dom.treasureTrack.scrollWidth - dom.treasureViewport.clientWidth + 2
  );
  metrics.treasure.viewportCenter = dom.treasureViewport.clientWidth * 0.52;
  metrics.treasure.centers = dom.treasureCards.map(
    (card) => card.offsetLeft + card.offsetWidth / 2
  );
}

function measureLayout() {
  metrics.pageHeight = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  metrics.headerHeight = dom.header?.offsetHeight || 0;

  metrics.darkRanges = darkSections
    .map((section) => {
      const top = docTop(section);
      return { top, bottom: top + section.offsetHeight };
    })
    .sort((a, b) => a.top - b.top);

  metrics.chapters = sections.map((item, index) => {
    const next = sections[index + 1];
    return {
      ...item,
      top: docTop(item.el),
      bottom: next ? docTop(next.el) : metrics.pageHeight + window.innerHeight
    };
  });

  measureTreasure();
  updateChapters();
  paintHeader();
  paintProgress();
}

/* ---------- chapters ---------- */

function applyActiveChapter(index) {
  if (index === activeChapterIndex) return;
  activeChapterIndex = index;

  sections.forEach((item, i) => {
    const active = i === index;
    if (item.link.classList.contains('is-active') !== active) {
      item.link.classList.toggle('is-active', active);
    }
    if (active) item.link.setAttribute('aria-current', 'location');
    else item.link.removeAttribute('aria-current');
  });
}

function updateChapters() {
  let index = -1;
  if (metrics.chapters.length) {
    const probe = window.scrollY + window.innerHeight * 0.42;
    metrics.chapters.forEach((chapter, i) => {
      if (probe >= chapter.top) index = i;
    });
  }
  applyActiveChapter(activeChapterOverride !== null ? activeChapterOverride : index);
}

function setActiveChapter(id) {
  const index = sections.findIndex((item) => item.id === id);
  if (index >= 0) {
    activeChapterOverride = index;
    applyActiveChapter(index);
    return;
  }

  if (id === 'top' || id === 'main') {
    activeChapterOverride = -1;
    applyActiveChapter(-1);
    return;
  }

  // Sub-section anchors (the archive, for example) should let the normal
  // tracker keep the containing chapter highlighted while we travel.
  activeChapterOverride = null;
  updateChapters();
}

function releaseActiveChapter() {
  activeChapterOverride = null;
  updateChapters();
}

/* ---------- chapter transition ---------- */

const chapterGlyphs = {
  top: '松',
  origin: '传',
  craft: '技',
  treasures: '历',
  editions: '作',
  visit: '联'
};

const veil = {
  node: null,
  glyph: null,
  state: 'hidden',
  timeline: null,
  coverPromise: null,
  revealPromise: null,

  ensure() {
    if (this.node) return this.node;
    this.node = document.createElement('div');
    this.node.className = 'chapter-veil';
    this.node.setAttribute('aria-hidden', 'true');
    this.glyph = document.createElement('span');
    this.glyph.className = 'chapter-veil-glyph';
    this.node.append(this.glyph);
    dom.body.append(this.node);
    return this.node;
  },

  paint(target) {
    this.ensure();
    this.node.classList.toggle('is-night', Boolean(target.closest('.theme-dark')));
    this.glyph.textContent = chapterGlyphs[target.id] || '';
  },

  cover(target) {
    this.paint(target);
    this.node.classList.add('is-active');
    dom.html.classList.add('is-chapter-jumping');

    if (this.state === 'covering' && this.coverPromise) return this.coverPromise;
    if (this.state === 'covered') return Promise.resolve();
    if (this.state === 'revealing') {
      this.timeline?.kill();
      this.state = 'covered';
      gsap.set(this.node, { opacity: 1, visibility: 'visible', pointerEvents: 'auto' });
      return Promise.resolve();
    }

    this.timeline?.kill();
    gsap.killTweensOf([this.node, this.glyph]);
    this.state = 'covering';
    gsap.set(this.node, { visibility: 'visible', pointerEvents: 'auto' });

    this.coverPromise = new Promise((resolve) => {
      this.timeline = gsap.timeline({
        onComplete: () => {
          if (this.state !== 'covering') return;
          this.state = 'covered';
          this.coverPromise = null;
          resolve();
        }
      });
      this.timeline
        .fromTo(this.node, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.in' })
        .call(
          () => {
            if (this.state !== 'covering') return;
            this.state = 'covered';
            this.coverPromise = null;
            resolve();
          },
          [],
          0.22
        )
        .fromTo(
          this.glyph,
          { scale: 1.08, yPercent: 3 },
          { scale: 1, yPercent: 0, duration: 0.9, ease: 'power3.out' },
          0.02
        );
    });

    return this.coverPromise;
  },

  reveal() {
    if (!this.node || this.state === 'hidden') return Promise.resolve();
    if (this.state === 'revealing' && this.revealPromise) return this.revealPromise;

    this.timeline?.kill();
    this.state = 'revealing';

    this.revealPromise = new Promise((resolve) => {
      this.timeline = gsap.timeline({
        onComplete: () => {
          this.state = 'hidden';
          this.revealPromise = null;
          this.node.classList.remove('is-active');
          dom.html.classList.remove('is-chapter-jumping');
          gsap.set(this.node, { visibility: 'hidden', pointerEvents: 'none' });
          resolve();
        }
      });
      this.timeline.to(this.node, { opacity: 0, duration: 0.58, ease: 'power2.inOut' });
    });

    return this.revealPromise;
  }
};

function scrollToSurface() {
  if (reduced) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return Promise.resolve();
  }
  if (!lenis) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return Promise.resolve();
  }

  const distance = window.scrollY;
  if (distance < 4) return Promise.resolve();

  return new Promise((resolve) => {
    const duration = clamp(distance / 5600, 1.05, 2.45);
    let timer = 0;
    const done = () => {
      window.clearTimeout(timer);
      resolve();
    };
    timer = window.setTimeout(done, duration * 1000 + 300);
    lenis.scrollTo(0, { duration, easing: easeSurface, onComplete: done });
  });
}

function glideTo(top, distance) {
  return new Promise((resolve) => {
    const duration = clamp(0.5 + distance / 4800, 0.62, 1.25);
    let timer = 0;
    const done = () => {
      window.clearTimeout(timer);
      resolve();
    };
    timer = window.setTimeout(done, duration * 1000 + 300);
    lenis.scrollTo(top, { duration, easing: easeJourney, onComplete: done });
  });
}

function finishNavigation(token) {
  if (token !== navToken) return;
  navState = 'idle';
  // Lenis can complete between chrome frames; sync the baseline so the final
  // step is not mistaken for a downward flick and the header does not hide.
  lastScrollY = window.scrollY;
  releaseActiveChapter();
  paintHeader();
  paintProgress();
}

async function navigateTo(target, { smooth = true, push = true, focus = true } = {}) {
  if (!target) return;

  const token = ++navToken;
  const hash = target.id ? `#${target.id}` : null;
  const top = targetTop(target);

  navState = 'navigating';
  showHeader();
  setActiveChapter(target.id);

  if (push && hash) {
    if (location.hash !== hash) history.pushState(null, '', hash);
    lastAppliedHash = hash;
  }

  if (!smooth || reduced) {
    jumpInstantly(top);
    if (focus) focusTarget(target);
    finishNavigation(token);
    return;
  }

  if (target === dom.hero || target.id === 'top') {
    await scrollToSurface();
    if (token !== navToken) return;
    focusIfArrived(target, 0, focus);
    finishNavigation(token);
    return;
  }

  const distance = Math.abs(top - window.scrollY);
  if (distance < 4) {
    if (focus) focusTarget(target);
    finishNavigation(token);
    return;
  }

  if (!lenis) {
    window.scrollTo({ top, behavior: 'smooth' });
    await wait(600);
    if (token !== navToken) return;
    focusIfArrived(target, top, focus);
    finishNavigation(token);
    return;
  }

  if (distance > window.innerHeight * VEIL_DISTANCE) {
    navState = 'covering';
    await veil.cover(target);
    if (token !== navToken) return;

    jumpInstantly(top);
    paintHeader();
    paintProgress();
    revealArrival(target);
    focusIfArrived(target, top, focus);

    navState = 'revealing';
    await veil.reveal();
    if (token !== navToken) return;
    finishNavigation(token);
    return;
  }

  navState = 'gliding';
  await glideTo(top, distance);
  if (token !== navToken) return;
  focusIfArrived(target, top, focus);
  finishNavigation(token);
}

/* =========================================================
   clock
   ========================================================= */

function initClock() {
  const options = {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const makeFormatter = () =>
    new Intl.DateTimeFormat(getLang() === 'fr' ? 'fr-FR' : 'en-GB', options);
  let formatter = makeFormatter();

  const paint = () => {
    const time = formatter.format(new Date());
    if (dom.clock) dom.clock.textContent = time;
    if (dom.footerClock) dom.footerClock.textContent = time;
  };

  document.addEventListener('jz:languagechange', () => {
    formatter = makeFormatter();
    paint();
  });

  paint();
  window.setInterval(paint, 20_000);
}

/* =========================================================
   header, progress, and section awareness
   ========================================================= */

function paintHeader() {
  if (!dom.header) return;
  const scrolled = window.scrollY > 28;
  const probe = window.scrollY + (metrics.headerHeight || 86) * 0.5;
  const dark = metrics.darkRanges.some(
    (range) => range.top <= probe && range.bottom >= probe
  );

  if (scrolled !== headerScrolled) {
    headerScrolled = scrolled;
    dom.header.classList.toggle('is-scrolled', scrolled);
  }
  if (dark !== headerDark) {
    headerDark = dark;
    dom.header.classList.toggle('on-dark', dark);
  }

  // Match the scrollbar gutter to whichever theme owns the viewport, so the
  // thin track disappears into paper or night instead of cutting a stripe.
  const viewportMid = window.scrollY + window.innerHeight * 0.5;
  const scrollbarNight = metrics.darkRanges.some(
    (range) => range.top <= viewportMid && range.bottom >= viewportMid
  );
  if (scrollbarNight !== scrollbarDark) {
    scrollbarDark = scrollbarNight;
    dom.html.classList.toggle('has-dark-scrollbar', scrollbarNight);
  }
}

function paintProgress() {
  if (!dom.progressBar) return;
  const max = metrics.pageHeight;
  const amount = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
  dom.progressBar.style.transform = `scaleX(${amount})`;
}

function updateChrome() {
  scrollTicking = false;
  const y = window.scrollY;

  paintHeader();
  paintProgress();
  updateChapters();

  if (reduced || !dom.header || dom.menuDialog?.open || dom.editionDialog?.open) {
    lastScrollY = y;
    return;
  }

  if (y < 90) {
    if (headerHidden) {
      headerHidden = false;
      dom.header.classList.remove('is-hidden');
    }
  } else if (y > lastScrollY + 6 && y > 320 && !isNavigating()) {
    if (!headerHidden) {
      headerHidden = true;
      dom.header.classList.add('is-hidden');
    }
  } else if (y < lastScrollY - 6) {
    if (headerHidden) {
      headerHidden = false;
      dom.header.classList.remove('is-hidden');
    }
  }

  lastScrollY = y;
}

function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateChrome);
}

/* =========================================================
   dialogs and mobile menu
   ========================================================= */

function openDialog(dialog, opener, onOpen) {
  if (!dialog || dialog.open) return;
  if (dom.menuDialog?.open) dom.menuDialog.close();
  if (dom.editionDialog?.open) dom.editionDialog.close();
  dialog.showModal();
  dialog.dataset.lenisPrevent = '';
  lockScroll();
  onOpen?.();
  requestAnimationFrame(() => {
    const close = dialog.querySelector('[data-dialog-close], .dialog-close, .menu-close');
    (close || dialog.querySelector('button, a[href]'))?.focus({ preventScroll: true });
  });
  dialog._opener = opener || document.activeElement;
}

function closeDialog(dialog) {
  if (!dialog?.open) return Promise.resolve();
  return new Promise((resolve) => {
    dialog.addEventListener('close', () => requestAnimationFrame(resolve), { once: true });
    dialog.close();
  });
}

function initDialogs() {
  [dom.menuDialog, dom.editionDialog].forEach((dialog) => {
    if (!dialog) return;
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      unlockScroll();
      if (dialog === dom.menuDialog) {
        dom.menuToggle?.setAttribute('aria-expanded', 'false');
        const returnTo = menuOpener || dom.menuToggle;
        menuOpener = null;
        returnTo?.focus?.({ preventScroll: true });
      } else if (dialog === dom.editionDialog) {
        activeEditionSlug = null;
        const returnTo = activeEditionOpener;
        activeEditionOpener = null;
        returnTo?.focus?.({ preventScroll: true });
      }
    });
  });

  dom.menuToggle?.addEventListener('click', () => {
    menuOpener = dom.menuToggle;
    openDialog(dom.menuDialog, dom.menuToggle, () => {
      dom.menuToggle.setAttribute('aria-expanded', 'true');
      if (!reduced) {
        gsap.fromTo(
          $$('.menu-nav a'),
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'expo.out', delay: 0.08 }
        );
        gsap.fromTo('.menu-art', { opacity: 0, x: 24 }, { opacity: 0.28, x: 0, duration: 1.2, ease: 'power3.out' });
      }
    });
  });

  dom.menuClose?.addEventListener('click', () => closeDialog(dom.menuDialog));
  $$('.dialog-close, .dialog-dismiss').forEach((button) => {
    button.addEventListener('click', () => closeDialog(dom.editionDialog));
  });

  $$('.edition-hit').forEach((hit) => {
    hit.setAttribute('aria-haspopup', 'dialog');
    hit.setAttribute('aria-controls', 'edition-dialog');
    hit.addEventListener('click', (event) => {
      event.preventDefault();
      const card = hit.closest('.edition-card');
      const slug = card?.dataset.edition;
      if (!slug) return;
      activeEditionOpener = hit;
      openEdition(slug, hit);
    });
  });

  document.addEventListener('jz:languagechange', () => {
    if (dom.editionDialog?.open && activeEditionSlug) fillEdition(activeEditionSlug);
  });
}

const editions = {
  reservation: {
    art: '/img/album.webp',
    stick: 'stick-dawn',
    href: 'mailto:zhengjimmy66@gmail.com?subject=R%C3%A9servation%20%E2%80%94%20portfolio',
    external: false,
    fr: {
      cn: '预订',
      pinyin: 'YÙ DÌNG',
      plate: 'Nº 01 · RÉSERVATION',
      kicker: 'Projet 01 — Stage USTS',
      title: 'Réservation',
      desc: "Développée en stage chez USTS, agence web & IA : plateforme complète de réservation pour un parc nature. Billetterie, réservation d'hébergements, paiement en ligne et accès aux sites par QR code. Cadrage du MVP, recette et préproduction avec le client.",
      character: 'Billetterie · Hébergements · Paiement',
      ingredients: 'Symfony · Angular · Stripe · QR code',
      format: 'Avril — Juillet 2026',
      edition: 'Projet client — code confidentiel',
      price: 'Stage',
      credit: 'After Shitao, <em>Landscapes</em>, ca. 1690',
      cta: 'Demander le détail'
    },
    en: {
      cn: '预订',
      pinyin: 'YÙ DÌNG',
      plate: 'Nº 01 · RESERVATION',
      kicker: 'Project 01 — USTS internship',
      title: 'Reservation',
      desc: 'Built during an internship at USTS, a web & AI agency: a complete booking platform for a nature park. Ticketing, lodging reservations, online payment and QR-code access to the sites. MVP scoping, acceptance testing and client pre-production.',
      character: 'Ticketing · Lodging · Payment',
      ingredients: 'Symfony · Angular · Stripe · QR code',
      format: 'April — July 2026',
      edition: 'Client project — confidential code',
      price: 'Internship',
      credit: 'After Shitao, <em>Landscapes</em>, ca. 1690',
      cta: 'Request details'
    }
  },
  osuscan: {
    art: '/img/retreat.webp',
    stick: 'stick-mist',
    href: 'https://osu-scan.onrender.com',
    external: true,
    fr: {
      cn: '扫描',
      pinyin: 'SǍO MIÁO',
      plate: 'Nº 02 · OSU!SCAN',
      kicker: 'Projet 02 — Personnel',
      title: 'osu!scan',
      desc: "Application Python/Flask construite autour de l'API officielle osu! v2 : classements et nominations de beatmaps, scans nocturnes automatisés et rapports HTML détaillés. Authentification OAuth2 et traitement multi-threadé pour analyser des bibliothèques entières en quelques secondes.",
      character: 'Classements · Nominations · Rapports',
      ingredients: 'Python · Flask · osu! API v2 · OAuth2',
      format: '2026 — en cours',
      edition: 'Code ouvert — GitHub',
      price: 'Personnel',
      credit: 'Wang Meng, <em>Simple Retreat</em>, ca. 1370',
      cta: 'Voir le site'
    },
    en: {
      cn: '扫描',
      pinyin: 'SǍO MIÁO',
      plate: 'Nº 02 · OSU!SCAN',
      kicker: 'Project 02 — Personal',
      title: 'osu!scan',
      desc: 'Python/Flask application built around the official osu! v2 API: beatmap rankings and nominations, automated nightly scans and detailed HTML reports. OAuth2 authentication and multi-threaded processing to analyse entire libraries in seconds.',
      character: 'Rankings · Nominations · Reports',
      ingredients: 'Python · Flask · osu! API v2 · OAuth2',
      format: '2026 — ongoing',
      edition: 'Open source — GitHub',
      price: 'Personal',
      credit: 'Wang Meng, <em>Simple Retreat</em>, ca. 1370',
      cta: 'View site'
    }
  },
  'osu-browser': {
    art: '/img/dragon.webp',
    stick: 'stick-rain',
    href: 'https://github.com/wFuxi66/osu-browser',
    external: true,
    fr: {
      cn: '网',
      pinyin: 'WǍNG',
      plate: 'Nº 03 · OSU!BROWSER',
      kicker: 'Projet 03 — Personnel',
      title: 'osu!browser',
      desc: "Un osu! stable complet dans le navigateur : menu principal, song select, jeu et éditeur de beatmaps. On dépose un MP3 ou un .osz pour commencer, on mappe avec les outils de stable — timing, storyboards, skins — puis on exporte le .osz. L'éditeur tourne entièrement côté client (IndexedDB, synchronisation Google Drive optionnelle), avec une API Hono sans base de données pour l'OAuth osu! et les appels à l'API.",
      character: 'Jeu · Éditeur · Export .osz',
      ingredients: 'React · TypeScript · Hono · IndexedDB',
      format: '2026 — en cours',
      edition: 'Code ouvert — GitHub',
      price: 'Personnel',
      credit: 'Chen Rong, <em>The Dragon</em>, 13th century',
      cta: 'Voir le dépôt GitHub'
    },
    en: {
      cn: '网',
      pinyin: 'WǍNG',
      plate: 'Nº 03 · OSU!BROWSER',
      kicker: 'Project 03 — Personal',
      title: 'osu!browser',
      desc: "A full osu! stable experience in the browser: main menu, song select, gameplay and a beatmap editor. Drop an MP3 or an .osz to start, map with stable's tools — timing, storyboards, skins — then export the .osz. The editor runs entirely client-side (IndexedDB, optional Google Drive sync), with a database-free Hono API for osu! OAuth and API calls.",
      character: 'Gameplay · Editor · .osz export',
      ingredients: 'React · TypeScript · Hono · IndexedDB',
      format: '2026 — ongoing',
      edition: 'Open source — GitHub',
      price: 'Personal',
      credit: 'Chen Rong, <em>The Dragon</em>, 13th century',
      cta: 'View on GitHub'
    }
  }
};

let activeEditionSlug = null;

function fillEdition(slug) {
  const entry = editions[slug];
  if (!entry || !dom.editionDialog) return;
  const data = entry[getLang()] || entry.fr;
  const visual = $('#dialog-visual');
  const stick = $('#dialog-stick');

  $('#dialog-kicker').textContent = data.kicker;
  $('#dialog-title').innerHTML = `${data.title} <i>${data.cn}</i>`;
  $('#dialog-plate').textContent = data.plate;
  $('#dialog-desc').textContent = data.desc;
  $('#dialog-character').textContent = data.character;
  $('#dialog-ingredients').textContent = data.ingredients;
  $('#dialog-format').textContent = data.format;
  $('#dialog-edition').textContent = data.edition;
  $('#dialog-price').textContent = data.price;
  $('#dialog-credit').innerHTML = data.credit;
  $('#dialog-stick-cn').textContent = data.cn;
  $('#dialog-stick-pinyin').textContent = data.pinyin;

  const enquire = $('#dialog-enquire');
  if (enquire) {
    enquire.href = entry.href;
    if (entry.external) {
      enquire.target = '_blank';
      enquire.rel = 'noopener noreferrer';
    } else {
      enquire.removeAttribute('target');
      enquire.removeAttribute('rel');
    }
    const label = $('.cta-text', enquire);
    if (label) label.textContent = data.cta;
  }

  visual?.style.setProperty('--dialog-art', `url("${entry.art}")`);
  if (stick) stick.className = `ink-stick dialog-stick ${entry.stick}`;
}

function openEdition(slug, opener) {
  if (!editions[slug] || !dom.editionDialog) return;

  const dialog = dom.editionDialog;
  activeEditionSlug = slug;
  fillEdition(slug);

  openDialog(dialog, opener, () => {
    if (reduced) return;
    const content = $$('.dialog-content > *', dialog);
    gsap.fromTo(
      '.dialog-stick',
      { y: 34, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.05, ease: 'expo.out', delay: 0.08 }
    );
    gsap.fromTo(
      content,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.045, ease: 'power3.out', delay: 0.12 }
    );
  });
}

/* =========================================================
   anchors, back to top
   ========================================================= */

function initAnchors() {
  document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    const target = getTarget(hash);
    if (!target) return;

    event.preventDefault();

    if (dom.menuDialog?.open) await closeDialog(dom.menuDialog);
    if (dom.editionDialog?.open) await closeDialog(dom.editionDialog);

    await navigateTo(target);
  });

  dom.backTop?.addEventListener('click', () => {
    navigateTo(dom.hero);
  });
}

function initHistory() {
  const sync = async () => {
    if (location.hash === lastAppliedHash) return;
    lastAppliedHash = location.hash;

    if (!location.hash) {
      await navigateTo(dom.hero, { smooth: true, push: false });
      return;
    }

    const target = getTarget(location.hash);
    if (target) await navigateTo(target, { smooth: true, push: false });
  };

  window.addEventListener('popstate', sync);
  window.addEventListener('hashchange', sync);
}

/* =========================================================
   room tone — a small synthesized dawn
   ========================================================= */

class RoomTone {
  constructor(button) {
    this.button = button;
    this.context = null;
    this.master = null;
    this.windGain = null;
    this.on = false;
    this.chimeTimer = null;
    document.addEventListener('jz:languagechange', () => this.paint(this.on));
  }

  build() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    const ctx = new AudioContext();
    this.context = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);

    // Brown noise, slowly breathed through a low-pass filter.
    const seconds = 7;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.018 * white) / 1.018;
      data[i] = last * 3.2;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 55;
    highpass.Q.value = 0.4;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 520;
    lowpass.Q.value = 0.5;

    this.windGain = ctx.createGain();
    this.windGain.gain.value = 0.035;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.013;
    lfo.connect(lfoDepth);
    lfoDepth.connect(this.windGain.gain);

    source.connect(highpass).connect(lowpass).connect(this.windGain).connect(this.master);
    source.start();
    lfo.start();
    return true;
  }

  chime() {
    if (!this.context || !this.master || !this.on) return;
    const ctx = this.context;
    const now = ctx.currentTime;
    const notes = [196, 220, 261.63, 293.66, 349.23, 392];
    const frequency = notes[Math.floor(Math.random() * notes.length)];
    const panner = ctx.createStereoPanner
      ? ctx.createStereoPanner()
      : ctx.createGain();
    if (panner.pan) panner.pan.value = Math.random() * 1.1 - 0.55;
    panner.connect(this.master);

    const fundamental = ctx.createOscillator();
    fundamental.type = 'sine';
    fundamental.frequency.value = frequency;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.038, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 11);
    fundamental.connect(gain).connect(panner);
    fundamental.start(now);
    fundamental.stop(now + 11.5);

    const overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.value = frequency * 2.005;
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.008, now + 0.3);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 7);
    overtone.connect(overtoneGain).connect(panner);
    overtone.start(now);
    overtone.stop(now + 7.5);
  }

  scheduleChime(delay = 16000 + Math.random() * 22000) {
    window.clearTimeout(this.chimeTimer);
    this.chimeTimer = window.setTimeout(() => {
      this.chime();
      if (this.on) this.scheduleChime();
    }, delay);
  }

  async enable() {
    if (!this.context && !this.build()) {
      showToast(t('toastUnsupported'));
      return;
    }
    await this.context.resume();
    this.on = true;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.9, now + 1.8);
    this.scheduleChime(9000);
    this.paint(true);
    showToast(t('toastSoundOn'));
  }

  disable() {
    if (!this.context) return;
    const now = this.context.currentTime;
    this.on = false;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.0001, now + 0.9);
    window.clearTimeout(this.chimeTimer);
    this.paint(false);
    showToast(t('toastSoundOff'), 2600);
  }

  paint(on) {
    if (!this.button) return;
    this.button.setAttribute('aria-pressed', String(on));
    this.button.setAttribute('aria-label', t(on ? 'soundOff' : 'soundOn'));
  }

  toggle() {
    if (this.on) this.disable();
    else this.enable().catch(() => showToast(t('toastQuiet')));
  }
}

function initSound() {
  if (!dom.soundToggle) return;
  const roomTone = new RoomTone(dom.soundToggle);
  dom.soundToggle.addEventListener('click', () => roomTone.toggle());
}

/* =========================================================
   Lenis + scroll chrome
   ========================================================= */

function initScroller() {
  if (reduced) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return;
  }

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    syncTouch: false
  });

  lenis.stop();
  lenis.on('scroll', onScroll);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  onScroll();
}

/* =========================================================
   hero — entrance, tilt, dust
   ========================================================= */

function prepareHero() {
  gsap.set('.hero-title .line-inner', { yPercent: 112 });
  gsap.set('.hero-eyebrow, .hero-lede, .hero-actions, .hero-vertical, .hero-foot', {
    opacity: 0,
    y: 18
  });
  gsap.set(dom.scrollFrame, { y: 54, scale: 0.985 });
}

function initHeroMotion() {
  if (!dom.hero) return;

  if (finePointer) {
    const rotateY = gsap.quickTo(dom.scrollFrame, 'rotationY', { duration: 1, ease: 'power3' });
    const rotateX = gsap.quickTo(dom.scrollFrame, 'rotationX', { duration: 1, ease: 'power3' });

    dom.hero.addEventListener('pointermove', (event) => {
      const rect = dom.hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(x * 7);
      rotateX(-y * 5);
    });

    dom.hero.addEventListener('pointerleave', () => {
      rotateY(0);
      rotateX(0);
    });
  }

  gsap.to(dom.heroCopy, {
    yPercent: -5,
    opacity: 0.32,
    ease: 'none',
    scrollTrigger: {
      trigger: dom.hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.fromTo(
    dom.heroArt,
    { yPercent: 0, opacity: 1 },
    {
      yPercent: 7,
      opacity: 0.45,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        trigger: dom.hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    }
  );

  initDust();
}

function initDust() {
  const canvas = $('#dust');
  if (!canvas || reduced) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let raf = null;
  let running = false;
  let pointerX = 0;
  let pointerY = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;

  const makeParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.45 + 0.35,
    vx: (Math.random() - 0.5) * 0.05,
    vy: -(Math.random() * 0.075 + 0.018),
    alpha: Math.random() * 0.24 + 0.08,
    phase: Math.random() * Math.PI * 2,
    warm: Math.random() > 0.42
  });

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 700 ? 26 : 54;
    particles = Array.from({ length: count }, makeParticle);
  };

  const draw = (now) => {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);

    pointerX += (targetPointerX - pointerX) * 0.035;
    pointerY += (targetPointerY - pointerY) * 0.035;

    particles.forEach((particle) => {
      particle.x += particle.vx + Math.sin(now * 0.00018 + particle.phase) * 0.09;
      particle.y += particle.vy;
      if (particle.y < -8) {
        particle.y = height + 8;
        particle.x = Math.random() * width;
      }
      if (particle.x < -8) particle.x = width + 8;
      if (particle.x > width + 8) particle.x = -8;

      const px = particle.x + pointerX * (particle.r * 5);
      const py = particle.y + pointerY * (particle.r * 4);
      ctx.beginPath();
      ctx.arc(px, py, particle.r, 0, Math.PI * 2);
      ctx.fillStyle = particle.warm
        ? `rgba(116, 82, 55, ${particle.alpha})`
        : `rgba(236, 228, 210, ${particle.alpha * 1.08})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  };

  const start = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(draw);
  };

  const stop = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  };

  resize();
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    },
    { rootMargin: '120px' }
  );
  observer.observe(canvas);
  new ResizeObserver(resize).observe(canvas);

  dom.hero.addEventListener(
    'pointermove',
    (event) => {
      const rect = dom.hero.getBoundingClientRect();
      targetPointerX = (event.clientX - rect.left) / rect.width - 0.5;
      targetPointerY = (event.clientY - rect.top) / rect.height - 0.5;
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (canvas.getBoundingClientRect().top < window.innerHeight) start();
  });
}

/* =========================================================
   reveals and parallax
   ========================================================= */

function initReveals() {
  if (reduced) return;

  const masks = $$('.line-mask').filter((mask) => !mask.closest('.hero-title'));
  masks.forEach((mask) => {
    const inner = mask.firstElementChild;
    if (!inner) return;
    gsap.fromTo(
      inner,
      { yPercent: 112 },
      {
        yPercent: 0,
        duration: 1.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: mask, start: 'top 88%', once: true }
      }
    );
  });

  $$('.reveal').forEach((element) => {
    gsap.from(element, {
      y: 26,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 89%', once: true }
    });
  });

  gsap.from('.edition-card', {
    y: 52,
    opacity: 0,
    duration: 1.15,
    stagger: 0.11,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.edition-grid', start: 'top 84%', once: true }
  });
}

// A veiled jump skips the scroll journey, so the destination gets a small
// deliberate entrance instead of relying on whichever triggers happened to
// fire underneath the veil.
function revealArrival(target) {
  if (reduced || !target) return;
  if (!sections.some((item) => item.el === target)) return;

  const head = target.querySelector('.section-head');
  const eyebrow = target.querySelector('.eyebrow');
  const items = [head, eyebrow].filter(Boolean);
  const lines = $$('.display .line-inner', target);

  if (items.length) {
    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.06, ease: 'power3.out' }
    );
  }

  if (lines.length) {
    gsap.killTweensOf(lines);
    gsap.fromTo(
      lines,
      { yPercent: 112 },
      { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' }
    );
  }
}

function initParallax() {
  if (reduced) return;

  $$('[data-parallax]').forEach((figure) => {
    const image = figure.querySelector('img');
    if (!image) return;
    gsap.fromTo(
      image,
      { yPercent: -4, scale: 1.075 },
      {
        yPercent: 4,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: { trigger: figure, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  });

  const panorama = $('.panorama-media img');
  if (panorama) {
    gsap.fromTo(
      panorama,
      { yPercent: -3, scale: 1.06 },
      {
        yPercent: 3,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: { trigger: '.panorama-media', start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  }

  const interludeImage = $('.interlude-bg img');
  if (interludeImage) {
    gsap.fromTo(
      interludeImage,
      { yPercent: -7, scale: 1.1 },
      {
        yPercent: 3,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: { trigger: '.interlude', start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
    gsap.to('.interlude-atmos span:first-child', {
      xPercent: 8,
      yPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: '.interlude', start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.to('.interlude-atmos span:last-child', {
      xPercent: -10,
      yPercent: 5,
      ease: 'none',
      scrollTrigger: { trigger: '.interlude', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }
}

/* =========================================================
   craft chapter
   ========================================================= */

const glyphs = ['语', '构', '数', '网', '质'];

function paintCraftChrome(index, progress) {
  if (dom.stepCurrent) dom.stepCurrent.textContent = String(index + 1).padStart(2, '0');
  if (dom.craftProgress) dom.craftProgress.style.height = `${progress * 100}%`;
  if (dom.progressRing) dom.progressRing.style.setProperty('--p', `${progress * 100}%`);
}

function setCraftStep(index, immediate = false) {
  const next = clamp(index, 0, dom.craftSteps.length - 1);
  if (next === currentCraftStep) return;

  const oldStep = dom.craftSteps[currentCraftStep];
  const newStep = dom.craftSteps[next];
  currentCraftStep = next;

  paintCraftChrome(next, (next + 1) / 5);
  ink?.setStep(next);
  ink?.setProgress((next + 1) / 5);

  if (!newStep) return;
  if (dom.inkGlyph) {
    if (!immediate && !reduced) {
      gsap.fromTo(
        dom.inkGlyph,
        { opacity: 0, scale: 0.86 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' }
      );
      dom.inkGlyph.textContent = glyphs[next];
    } else {
      dom.inkGlyph.textContent = glyphs[next];
    }
  }

  if (reduced || immediate) {
    dom.craftSteps.forEach((step, i) => step.classList.toggle('is-active', i === next));
    return;
  }

  if (oldStep && oldStep !== newStep) {
    gsap.killTweensOf(oldStep);
    gsap.to(oldStep, {
      opacity: 0,
      y: -12,
      duration: 0.38,
      ease: 'power2.in',
      onComplete: () => {
        if (dom.craftSteps[currentCraftStep] !== oldStep) oldStep.classList.remove('is-active');
      }
    });
  }

  gsap.killTweensOf(newStep);
  gsap.set(newStep, { opacity: 0, y: 18 });
  newStep.classList.add('is-active');
  gsap.to(newStep, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 0.18 });

  ink?.pulseAt(0.5, 0.5, 0.55);
}

function initCraft() {
  if (dom.inkCanvas) {
    ink = new InkField(dom.inkCanvas);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inkVisible = entry.isIntersecting;
        if (inkVisible && !document.hidden) ink.start();
        else ink.stop();
      },
      { rootMargin: '160px' }
    );
    observer.observe(dom.inkCanvas);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) ink?.stop();
      else if (inkVisible) ink?.start();
    });
  }

  paintCraftChrome(0, 0.2);
  dom.craftSteps[0]?.classList.add('is-active');
  currentCraftStep = 0;
  ink?.setStep(0);
  ink?.setProgress(0.2);

  if (reduced) return;

  const media = gsap.matchMedia();
  media.add('(min-width: 901px)', () => {
    const trigger = ScrollTrigger.create({
      trigger: dom.craftStage,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3.1}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = clamp(Math.floor(self.progress * 5), 0, 4);
        setCraftStep(index);
        ink?.setProgress(self.progress);
      },
      onRefresh: (self) => {
        const index = clamp(Math.floor(self.progress * 5), 0, 4);
        setCraftStep(index, true);
      }
    });

    return () => trigger.kill();
  });
}

/* =========================================================
   treasures — the horizontal desk
   ========================================================= */

function setTreasure(index) {
  const next = clamp(index, 0, dom.treasureCards.length - 1);
  if (next === currentTreasure) return;
  currentTreasure = next;

  if (dom.treasureIndex) dom.treasureIndex.textContent = String(next + 1).padStart(2, '0');
  if (dom.treasureProgress) dom.treasureProgress.style.transform = `scaleX(${next + 1})`;
  dom.treasureCards.forEach((card, i) => card.classList.toggle('is-current', i === next));
}

function initTreasures() {
  setTreasure(0);
  if (reduced) return;

  const media = gsap.matchMedia();
  media.add('(min-width: 901px)', () => {
    measureTreasure();

    const tween = gsap.to(dom.treasureTrack, {
      x: () => -metrics.treasure.max,
      ease: 'none',
      scrollTrigger: {
        trigger: dom.treasurePin,
        start: 'top top',
        end: () => `+=${Math.max(metrics.treasure.max * 1.8, window.innerHeight * 0.9)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: measureTreasure,
        onUpdate: (self) => {
          const { max, centers, viewportCenter } = metrics.treasure;
          const shift = max * self.progress;
          let nearest = 0;
          let distance = Infinity;
          centers.forEach((center, i) => {
            const d = Math.abs(center - shift - viewportCenter);
            if (d < distance) {
              distance = d;
              nearest = i;
            }
          });
          setTreasure(nearest);
        }
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(dom.treasureTrack, { clearProps: 'transform' });
    };
  });
}

/* =========================================================
   loader / entrance
   ========================================================= */

function waitForHeroImage() {
  const image = $('.hero-art img');
  if (!image) return Promise.resolve();
  if (image.complete && image.naturalWidth > 0) {
    return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
  }
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', finish, { once: true });
    window.setTimeout(finish, 3800);
  });
}

function hideLoaderNow() {
  if (dom.loader) dom.loader.style.display = 'none';
  dom.html.classList.remove('is-loading');
}

function playEntrance() {
  if (!dom.loader) {
    dom.html.classList.remove('is-loading');
    lenis?.start();
    measureLayout();
    if (initialHash && navState === 'idle') {
      const target = getTarget(initialHash);
      if (target) navigateTo(target, { smooth: false, push: false, focus: false });
    }
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => {
      hideLoaderNow();
      ScrollTrigger.refresh();
      measureLayout();
      // A deep link captured at boot should land after the entrance, but never
      // override a navigation the visitor started while the loader was leaving.
      if (initialHash && location.hash === initialHash && navState === 'idle') {
        const target = getTarget(initialHash);
        if (target) {
          window.setTimeout(() => {
            if (navState !== 'idle' || location.hash !== initialHash) return;
            navigateTo(target, { smooth: false, push: false, focus: false });
          }, 120);
        }
      }
    }
  });

  tl.to(dom.loaderBrand, { opacity: 0, y: -16, duration: 0.6, ease: 'power2.in' }, 0)
    .to([dom.loaderAside, dom.loaderProgress], { opacity: 0, duration: 0.45, ease: 'power2.in' }, 0)
    .to(dom.loader, { yPercent: -100, duration: 1.2, ease: 'expo.inOut' }, 0.12)
    .call(() => dom.html.classList.remove('is-loading'), [], 0.35)
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.9 }, 0.55)
    .to('.hero-title .line-inner', { yPercent: 0, duration: 1.25, stagger: 0.09 }, 0.5)
    .to(dom.scrollFrame, { y: 0, scale: 1, duration: 1.5 }, 0.4)
    .to('.hero-lede', { opacity: 1, y: 0, duration: 1 }, 0.82)
    .to('.hero-actions', { opacity: 1, y: 0, duration: 1 }, 0.92)
    .to('.hero-vertical', { opacity: 1, y: 0, duration: 1 }, 1.02)
    .to('.hero-foot', { opacity: 1, y: 0, duration: 1 }, 1.08)
    .call(() => {
      hideLoaderNow();
      lenis?.start();
      measureLayout();
    }, [], 1.36);
}

async function boot() {
  initLanguage();
  initClock();
  initDialogs();
  initAnchors();
  initHistory();
  initSound();
  initScroller();

  if (reduced) {
    initCraft();
    initTreasures();
    hideLoaderNow();
    ScrollTrigger.refresh();
    measureLayout();
    updateChrome();
    if (initialHash) {
      const target = getTarget(initialHash);
      if (target) navigateTo(target, { smooth: false, push: false, focus: false });
    }
    return;
  }

  prepareHero();

  const countState = { value: 0 };
  gsap.to(countState, {
    value: 92,
    duration: 1.6,
    ease: 'power2.out',
    onUpdate: () => setLoaderProgress(countState.value)
  });

  const ready = Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    waitForHeroImage(),
    wait(1650)
  ]);

  await Promise.race([ready, wait(5200)]);

  initReveals();
  initHeroMotion();
  initParallax();
  initCraft();
  initTreasures();
  ScrollTrigger.refresh();
  measureLayout();

  gsap.to(countState, {
    value: 100,
    duration: 0.55,
    ease: 'power2.inOut',
    onUpdate: () => setLoaderProgress(countState.value)
  });

  await wait(300);
  playEntrance();
}

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  measureLayout();
});

let resizeTimer = null;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    ink?.resize();
    measureTreasure();
    ScrollTrigger.refresh();
    measureLayout();
  }, 220);
});

let languageTimer = null;
document.addEventListener('jz:languagechange', () => {
  window.clearTimeout(languageTimer);
  languageTimer = window.setTimeout(() => {
    measureTreasure();
    ScrollTrigger.refresh();
    measureLayout();
  }, 220);
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

boot().catch((error) => {
  console.error('Jimmy Zheng portfolio failed to open:', error);
  hideLoaderNow();
  // A quiet page is better than a locked one.
  dom.loader?.remove();
  dom.html.classList.remove('is-loading');
  lenis?.start();
});
