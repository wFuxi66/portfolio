// Bilingual layer for the portfolio.
// French stays in the markup (useful without JS and for search engines).
// English is applied in place, so every GSAP/ScrollTrigger reference stays valid.

const STORAGE_KEY = 'jz-lang';

const META = {
  fr: {
    title: 'Jimmy Zheng — Développeur Full-Stack · Portfolio',
    description:
      "Portfolio de Jimmy Zheng, étudiant en BUT Informatique à l'IUT d'Orsay. Développement full-stack, réseau et mise en production. À la recherche d'un stage du 18 janvier au 14 mai 2027.",
    ogTitle: 'Jimmy Zheng — Développeur Full-Stack',
    ogDescription:
      'Du code au produit : développement full-stack, réseau et mise en production. Portfolio en encre et mouvement.',
    ogLocale: 'fr_FR',
  },
  en: {
    title: 'Jimmy Zheng — Full-Stack Developer · Portfolio',
    description:
      "Jimmy Zheng's portfolio — a computer science student at IUT d'Orsay. Full-stack development, networking and production. Looking for an internship from 18 January to 14 May 2027.",
    ogTitle: 'Jimmy Zheng — Full-Stack Developer',
    ogDescription:
      'From code to product: full-stack development, networking and production. A portfolio in ink and motion.',
    ogLocale: 'en_US',
  },
};

const UI = {
  fr: {
    soundOn: "Activer l'ambiance sonore",
    soundOff: "Couper l'ambiance sonore",
    toastSoundOn: "Ambiance activée — l'atelier au petit matin.",
    toastSoundOff: 'Ambiance coupée — le silence revient.',
    toastUnsupported: "L'ambiance sonore n'est pas disponible dans ce navigateur.",
    toastQuiet: 'Le silence est resté. Réessayez.',
  },
  en: {
    soundOn: 'Turn on room tone',
    soundOff: 'Turn off room tone',
    toastSoundOn: 'Room tone on — the studio at dawn.',
    toastSoundOff: 'Room tone off — the room is quiet again.',
    toastUnsupported: 'Room tone is not supported in this browser.',
    toastQuiet: 'The room stayed quiet. Try again.',
  },
};

// French source string -> English translation.
// Keys are matched against the trimmed text node (or attribute value), so inline
// <em>/<br> fragments are translated independently and whitespace is preserved.
const EN_TEXT = {
  // document / chrome
  'Aller au contenu': 'Skip to content',
  'Jimmy Zheng — accueil': 'Jimmy Zheng — home',
  'Navigation principale': 'Primary navigation',
  'Passer en anglais': 'Switch to English',
  'Activer l’ambiance sonore': 'Turn on room tone',
  "Activer l'ambiance sonore": 'Turn on room tone',
  'Heure locale à Paris': 'Local time in Paris',
  'Faire défiler vers le profil': 'Scroll to the profile',
  'Repères': 'Key facts',
  'La stack de Jimmy Zheng': "Jimmy Zheng's stack",
  "Un champ de nuages d'encre en mouvement lent": 'A slowly moving field of ink cloud',
  "Peinture à l'encre des trente-six pics du mont Huang, avec un pavillon et un lettré dans une barque":
    'Ink painting of the thirty-six peaks of Mount Huang, with a pavilion and a scholar in a boat',
  'Paysage de Wang Meng avec un lettré assis sous des pins au bord d’un lac':
    'Wang Meng landscape painting with a scholar seated beneath pine trees beside a lake',
  "Paysage de Wang Meng avec un lettré assis sous des pins au bord d'un lac":
    'Wang Meng landscape painting with a scholar seated beneath pine trees beside a lake',
  'Détail des pins et du travail au pinceau de Shitao':
    "Close detail of Shitao's pine trees and mountain brushwork",
  "Nuages d'encre sombre du tableau Le Dragon de Chen Rong":
    "Dark ink clouds from Chen Rong's painting The Dragon",
  'Détail de la calligraphie de Shitao et de ses sceaux vermillon sur papier ancien':
    "Close detail of Shitao's calligraphy and vermilion seals on aged paper",
  "Pierre à encre duan finement sculptée, motifs de pin et d'oiseau":
    'A finely carved duan inkstone with pine and bird motifs',
  "Feuille d'album de Shitao avec deux barques près d'une rive couleur pêche à l'aube":
    'Shitao album leaf with two boats near a peach-coloured shore at dawn',
  'Retraite de montagne densément boisée de Wang Meng, dans des tons d’encre froids':
    "Wang Meng's densely wooded mountain retreat in cool ink tones",
  "Retraite de montagne densément boisée de Wang Meng, dans des tons d'encre froids":
    "Wang Meng's densely wooded mountain retreat in cool ink tones",
  "Nuages d'encre et dragon d'un rouleau du XIIIe siècle":
    'Ink clouds and a dragon from a thirteenth-century scroll',
  "Deux petites barques aux voiles terre cuite passant devant une rive pêche, d'après une feuille d'album de Shitao":
    'Two small boats with terracotta sails passing a peach-coloured bank, from a Shitao album leaf',
  'Paysage chinois panoramique avec deux barques, un pavillon et des montagnes pâles':
    'A panoramic Chinese landscape with two boats, a pavilion, and pale mountains',
  'Voir le projet Réservation': 'View the Reservation project',
  'Voir le projet osu!scan': 'View the osu!scan project',
  'Voir le projet osu!browser': 'View the osu!browser project',
  'Retour en haut': 'Back to top',
  'Pied de page': 'Footer',
  'Navigation mobile': 'Mobile navigation',
  'Fermer le menu': 'Close menu',
  'Fermer les détails du projet': 'Close project details',
  'Ambiance': 'Room tone',
  'Me contacter': 'Contact me',
  'Profil': 'Profile',
  'Compétences': 'Skills',
  'Parcours': 'Journey',
  'Projets': 'Projects',
  'Contact': 'Contact',
  "PRÉPARATION DE L'ENCRE": 'PREPARING THE INK',
  'PRÉPARATION DE L’ENCRE': 'PREPARING THE INK',
  'Paris 13e, France': 'Paris 13e, France',
  'Jimmy Zheng — Développeur Full-Stack · Portfolio': 'Jimmy Zheng — Full-Stack Developer · Portfolio',

  // hero
  'Du code,': 'From code,',
  'au': 'to',
  'produit.': 'product.',
  "Je conçois, développe et mets en production des applications complètes — du schéma de base de données à l'interface, sans perdre de vue le réseau, la donnée et la prod.":
    'I design, build and ship complete applications — from the database schema to the interface, without losing sight of the network, the data and production.',
  'Découvrir le parcours': 'Explore the journey',
  'Recherche de stage': 'Looking for an internship',
  '18 janv. → 14 mai 2027': '18 Jan → 14 May 2027',
  'Faites défiler': 'Scroll to enter',
  'Nº 00': 'Nº 00',
  'Prologue': 'Prologue',

  // profile
  '— Profil': '— Profile',
  "Derrière l'interface": 'Behind the interface',
  'Un parcours,': 'A journey,',
  'de bout en bout.': 'end to end.',
  "Étudiant en BUT Informatique à l'IUT d'Orsay (Université Paris-Saclay), parcours Réseaux & Sécurité, je m'intéresse aux systèmes complets : développement web, bases de données, réseau et mise en production.":
    "A computer science student at IUT d'Orsay (Université Paris-Saclay), Networks & Security track, I am interested in complete systems: web development, databases, networking and production.",
  "J'aime comprendre ce qui se passe sous le capot — de la requête HTTP au paquet réseau. En stage chez USTS, j'ai développé une plateforme de réservation de bout en bout pour un parc nature : billetterie, paiement et accès par QR code.":
    "I like understanding what happens under the hood — from the HTTP request to the network packet. During an internship at USTS, I built an end-to-end booking platform for a nature park: ticketing, payment and QR-code access.",
  "Je recherche aujourd'hui un stage du 18 janvier au 14 mai 2027 pour continuer à construire des produits utiles, dans une équipe":
    'Today I am looking for an internship from 18 January to 14 May 2027 to keep building useful products, in a',
  'exigeante.': 'demanding team.',
  '2027': '2027',
  'Diplôme': 'Degree',
  '3e': '3rd',
  'Année BUT': 'year',
  '11': '11',
  'Stage visé': 'Target internship',

  // skills
  '— Compétences': '— Skills',
  'Cinq domaines · Un socle': 'Five domains · One foundation',
  'Du langage à la production': 'From language to production',
  'Cinq domaines,': 'Five domains,',
  'un même': 'one shared',
  'socle.': 'foundation.',
  "Chaque projet traverse les mêmes couches : le langage, le framework, la donnée, le réseau, la mise en production. Le socle ne change pas ; l'exigence non plus.":
    'Every project moves through the same layers: language, framework, data, network, production. The foundation stays the same; so does the standard.',
  'Les cinq domaines': 'The five domains',
  'Domaine 01': 'Domain 01',
  'Domaine 02': 'Domain 02',
  'Domaine 03': 'Domain 03',
  'Domaine 04': 'Domain 04',
  'Domaine 05': 'Domain 05',
  'Écrire le socle.': 'Write the foundation.',
  'TypeScript, PHP, JavaScript, Python, Java, C++ : six langages, une même exigence — des bases lisibles, testées et versionnées.':
    'TypeScript, PHP, JavaScript, Python, Java, C++: six languages, one standard — readable, tested, versioned code.',
  'Langages': 'Languages',
  '6': '6',
  'Usage': 'Usage',
  'Full-stack': 'Full-stack',
  'Donner une forme.': 'Give it shape.',
  'Symfony, Angular, React Native, Flask. Des interfaces et des API qui tiennent la charge, du prototype à la production.':
    'Symfony, Angular, React Native, Flask. Interfaces and APIs that hold up under load, from prototype to production.',
  'Frameworks': 'Frameworks',
  '4': '4',
  'Terrain': 'Scope',
  'Web & mobile': 'Web & mobile',
  'Relier la donnée.': 'Connect the data.',
  'PostgreSQL, MySQL, API REST, Stripe, JWT / OAuth2. Concevoir les schémas, sécuriser les échanges, garder la donnée cohérente.':
    'PostgreSQL, MySQL, REST APIs, Stripe, JWT / OAuth2. Design schemas, secure exchanges, keep data consistent.',
  'Bases': 'Databases',
  'PostgreSQL · MySQL': 'PostgreSQL · MySQL',
  'APIs': 'APIs',
  'REST · OAuth2': 'REST · OAuth2',
  "Comprendre la couche d'en dessous.": 'Understand the layer below.',
  'DNS, DHCP, VLAN, SSH, Linux, Docker. Savoir ce qui se passe entre la requête HTTP et le paquet réseau.':
    'DNS, DHCP, VLAN, SSH, Linux, Docker. Know what happens between the HTTP request and the network packet.',
  'Systèmes': 'Systems',
  'Linux · Docker': 'Linux · Docker',
  'Réseau': 'Network',
  'VLAN · SSH': 'VLAN · SSH',
  'Livrer, puis surveiller.': 'Ship, then watch.',
  'GitLab, Scrum, CI/CD, PHPUnit, Vitest, Coolify. Automatiser les tests, documenter les choix, mettre en production sans trembler.':
    'GitLab, Scrum, CI/CD, PHPUnit, Vitest, Coolify. Automate tests, document decisions, ship without flinching.',
  'Pratiques': 'Practices',
  'CI/CD · Scrum': 'CI/CD · Scrum',
  'Qualité': 'Quality',
  'Tests & prod': 'Tests & production',
  'La dernière étape vous appartient.': 'The last step is yours.',
  'FULL-STACK · RÉSEAU · SÉCURITÉ · PARIS · 2027 · FULL-STACK · RÉSEAU · SÉCURITÉ · PARIS · 2027 ·':
    'FULL-STACK · NETWORK · SECURITY · PARIS · 2027 · FULL-STACK · NETWORK · SECURITY · PARIS · 2027 ·',
  "Touchez l'encre": 'Touch the ink',
  'PARIS, 48.83° N — 2.36° E': 'PARIS, 48.83° N — 2.36° E',
  'Bougez pour remuer · Appuyez pour laisser une trace': 'Move to stir · Press to leave a mark',

  // journey
  '— Parcours': '— Journey',
  'Formation & expérience': 'Education & experience',
  'Quatre étapes,': 'Four steps,',
  'fil.': 'thread.',
  'De la salle de classe à la production : quatre étapes qui ont façonné la manière de concevoir, de coder et de livrer.':
    'From the classroom to production: four steps that shaped how I design, code and ship.',
  '« Le parcours, lui aussi,': '“The journey, too,',
  'est un paysage. »': 'is a landscape.”',
  'Quatre étapes, quatre façons de tenir le temps. Avancez lentement.':
    'Four steps, four ways of holding time. Move slowly through them.',
  'Défilez pour avancer': 'Scroll to move',
  'ÉTAPE / 01': 'STEP / 01',
  'ÉTAPE / 02': 'STEP / 02',
  'ÉTAPE / 03': 'STEP / 03',
  'ÉTAPE / 04': 'STEP / 04',
  'BUT Informatique': 'BUT Computer Science',
  'Le socle.': 'The foundation.',
  'Développement logiciel, bases de données, réseaux et sécurité : trois années pour apprendre à construire des systèmes de bout en bout.':
    'Software development, databases, networking and security: three years learning to build systems end to end.',
  '2024 — 2027': '2024 — 2027',
  "IUT d'Orsay": "IUT d'Orsay",
  'Stage USTS': 'USTS Internship',
  'La production.': 'Production.',
  'Billetterie, hébergements, paiement et QR codes : une plateforme complète pour un parc nature, en équipe Scrum.':
    'Ticketing, lodging, payment and QR codes: a complete platform for a nature park, in a Scrum team.',
  'Avril — Juillet 2026': 'April — July 2026',
  'Paris 13e': 'Paris 13e',
  'Le rythme.': 'The pace.',
  "Service, gestion du rush et sens du client : une école de réactivité et d'organisation, en équipe.":
    'Service, rush management and customer care: a lesson in responsiveness and organisation, as part of a team.',
  'Juin — Août 2025': 'June — August 2025',
  'Pontoise': 'Pontoise',
  'Baccalauréat': 'Baccalaureate',
  'Les fondations.': 'Foundations.',
  'Spécialités mathématiques et physique-chimie, mention Bien. La rigueur avant le code.':
    'Mathematics and Physics-Chemistry specialities, with honours. Rigour before code.',
  '2021 — 2024': '2021 — 2024',
  'Lycée Claude Monet': 'Lycée Claude Monet',

  // projects
  '— Projets': '— Projects',
  'Sélection & archives': 'Selection & archive',
  'Du prototype à la production': 'From prototype to production',
  'Trois projets,': 'Three projects,',
  'trois': 'three',
  'échelles.': 'scales.',
  "Une sélection menée de la conception à la mise en production : une plateforme de réservation, un outil autour de l'API osu! et un éditeur de beatmaps dans le navigateur. Chaque carte ouvre le détail.":
    'A selection taken from design to production: a booking platform, a tool built around the osu! API and a beatmap editor in the browser. Each card opens the details.',
  "Voir l'archive complète": 'View the full archive',
  'Réservation': 'Reservation',
  'Nº 01 · RÉSERVATION': 'Nº 01 · RESERVATION',
  'Stage': 'Internship',
  'Billetterie, hébergements, paiement en ligne et accès par QR code pour un parc nature.':
    'Ticketing, lodging, online payment and QR-code access for a nature park.',
  'Symfony · Angular · Stripe': 'Symfony · Angular · Stripe',
  'Voir le projet': 'View project',
  'Perso': 'Personal',
  "Classements, nominations et scans nocturnes autour de l'API osu! v2.":
    'Rankings, nominations and nightly scans around the osu! v2 API.',
  'Python · Flask · OAuth2': 'Python · Flask · OAuth2',
  'Projet personnel': 'Personal project',
  'osu! stable dans un onglet : jouer, mapper et exporter ses beatmaps, sans installation.':
    'osu! stable in a tab: play, map and export your beatmaps, no install.',
  'React · TypeScript · Hono': 'React · TypeScript · Hono',
  'Node.js · Socket.io · Three.js · Docker': 'Node.js · Socket.io · Three.js · Docker',
  '2026 — en cours': '2026 — ongoing',
  '— Archive': '— Archive',
  '09 autres projets': '09 more projects',
  'Demander une démo de Glitch Party': 'Request a Glitch Party demo',
  "Jeu d'énigmes coopératif": 'Co-op puzzle game',
  'Unity · C# · GitLab': 'Unity · C# · GitLab',
  'S5 — 2026': 'S5 — 2026',
  'Application de gestion — CIUP': 'Management application — CIUP',
  'Java · Swing · UML': 'Java · Swing · UML',
  'Répartition de groupes — IUT': 'Group allocation — IUT',
  'Java · PHP · SQL': 'Java · PHP · SQL',
  'S3': 'S3',
  'Infrastructure réseau & firewall': 'Network infrastructure & firewall',
  'Linux · iptables · VLAN': 'Linux · iptables · VLAN',
  'Jeu vidéo 2D en C++': '2D game in C++',
  'C++ · SDL2': 'C++ · SDL2',
  'S1': 'S1',
  'Intégration web responsive': 'Responsive web integration',
  'HTML · CSS · WCAG': 'HTML · CSS · WCAG',
  'CHOKEN — site vitrine': 'CHOKEN — showcase site',
  'Vite · JavaScript · CSS': 'Vite · JavaScript · CSS',
  'Portfolio — carte électronique': 'Portfolio — circuit board',
  'React · Three.js · Vite': 'React · Three.js · Vite',
  'Perso — 2026': 'Personal — 2026',
  'Chaque projet est documenté, versionné et déployé autant que possible. Les dépôts publics sont ouverts.':
    'Every project is documented, versioned and deployed wherever possible. Public repositories are open.',
  'Paris 13e · Disponible pour un stage — 2027': 'Paris 13e · Available for an internship — 2027',

  // interlude
  'Du carnet de bord': 'From the notebook',
  'Du réseau': 'From the network',
  "à l'interface,": 'to the interface,',
  'de la donnée': 'from the data',
  'au produit.': 'to the product.',
  '— Jimmy Zheng, profil — 2026': '— Jimmy Zheng, profile — 2026',
  'Un bon produit ne crie pas.': 'A good product does not shout.',

  // contact
  'Stage 2027': 'Internship 2027',
  'La porte est ouverte': 'The door is open',
  'Un stage à': 'An internship',
  'confier ?': 'to offer?',
  'Disponible du 18 janvier au 14 mai 2027, à temps plein, à Paris ou en Île-de-France. Je réponds vite, avec des projets qui tournent déjà en production.':
    'Available from 18 January to 14 May 2027, full-time, in Paris or the Île-de-France region. I reply quickly, with projects already running in production.',
  'Écrire un e-mail': 'Write an email',
  "La rivière Xin'an, un matin d'octobre.": "The Xin'an River, a morning in October.",
  '29.867° N': '29.867° N',
  'Localisation': 'Location',
  'Paris 13e (75013)': 'Paris 13e (75013)',
  'Île-de-France': 'Île-de-France',
  'France': 'France',
  'Disponibilité': 'Availability',
  'Stage — 18 janv. → 14 mai 2027': 'Internship — 18 Jan → 14 May 2027',
  'Temps plein': 'Full-time',
  'Paris ou Île-de-France': 'Paris or Île-de-France',
  'Écrire': 'Write',
  '07 67 69 69 93': '07 67 69 69 93',
  'GitHub': 'GitHub',
  'LinkedIn': 'LinkedIn',
  'Paris, 2026': 'Paris, 2026',

  // footer
  'Un stage à confier ?': 'An internship to offer?',
  'Disponible du 18 janvier au 14 mai 2027 · Paris & Île-de-France':
    'Available 18 January — 14 May 2027 · Paris & Île-de-France',
  'Télécharger le CV': 'Download CV',
  'Développeur Full-Stack': 'Full-Stack Developer',
  'Paris 13e · 2027': 'Paris 13e · 2027',
  'github.com/wFuxi66': 'github.com/wFuxi66',
  "Un portfolio construit comme une étude d'encre et de mouvement. Œuvres : The Metropolitan Museum of Art, Open Access. Typographie : Instrument Serif, Instrument Sans & Noto Serif SC.":
    'A portfolio built as a study in ink and motion. Artworks: The Metropolitan Museum of Art, Open Access. Type: Instrument Serif, Instrument Sans & Noto Serif SC.',
  'à Paris': 'in Paris',
  'Remonter à la surface': 'Back to the surface',
  '© 2026 Jimmy Zheng': '© 2026 Jimmy Zheng',
  'Tous droits réservés, sans bruit.': 'All rights reserved, quietly.',
  'Fait lentement, à Paris': 'Made slowly, in Paris',
  'MENU': 'MENU',
  'Fermer': 'Close',
  'Disponible pour un stage': 'Available for an internship',

  // dialog
  'Projet 01 — Stage USTS': 'Project 01 — USTS internship',
  'Périmètre': 'Scope',
  'Stack': 'Stack',
  'Période': 'Period',
  'Contexte': 'Context',
  'Type': 'Type',
  'Demander le détail': 'Request details',
  'Chaque projet est documenté et versionné. Les dépôts publics sont sur GitHub.':
    'Every project is documented and versioned. Public repositories are on GitHub.',
  'Fermer le projet': 'Close project',
  "Ambiance — l'atelier au petit matin.": 'Room tone — the studio at dawn.',
};

// Preserved originals so the visitor can switch back to French at any time.
const textOriginals = new WeakMap();
const attributeOriginals = new WeakMap();
let current = window.__JZ_LANG__ === 'en' ? 'en' : 'fr';
let initialized = false;

const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

function insideSkipped(element) {
  return Boolean(
    element &&
      element.closest('script, style, noscript, [data-no-i18n], [data-lang-toggle]')
  );
}

function translateText(lang) {
  if (!document.body) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (insideSkipped(node.parentElement)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
    const original = textOriginals.get(node);
    const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match) return;
    const [, leading, core, trailing] = match;
    if (!core) return;
    const translated = lang === 'en' && has(EN_TEXT, core) ? EN_TEXT[core] : null;
    node.nodeValue = translated ? `${leading}${translated}${trailing}` : original;
  });
}

function translateAttributes(lang) {
  const attributes = ['aria-label', 'alt', 'title', 'placeholder'];
  attributes.forEach((attribute) => {
    document.querySelectorAll(`[${attribute}]`).forEach((element) => {
      if (insideSkipped(element)) return;
      let store = attributeOriginals.get(element);
      if (!store) {
        store = {};
        attributeOriginals.set(element, store);
      }
      if (!(attribute in store)) store[attribute] = element.getAttribute(attribute);
      const original = store[attribute];
      if (!original) return;
      const translated = lang === 'en' && has(EN_TEXT, original) ? EN_TEXT[original] : null;
      element.setAttribute(attribute, translated || original);
    });
  });
}

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

function translateMeta(lang) {
  const meta = META[lang] || META.fr;
  document.title = meta.title;
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[property="og:title"]', 'content', meta.ogTitle);
  setMeta('meta[property="og:description"]', 'content', meta.ogDescription);
  setMeta('meta[property="og:locale"]', 'content', meta.ogLocale);
  setMeta('meta[name="twitter:title"]', 'content', meta.ogTitle);
  setMeta('meta[name="twitter:description"]', 'content', meta.ogDescription);
}

function paintToggle(lang) {
  document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
    const label = lang === 'fr' ? 'Passer en anglais' : 'Switch to French';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.querySelectorAll('[data-lang]').forEach((span) => {
      const active = span.dataset.lang === lang;
      span.classList.toggle('is-active', active);
      span.setAttribute('aria-current', active ? 'true' : 'false');
    });
  });
}

export function getLang() {
  return current;
}

export function t(key) {
  return UI[current]?.[key] || UI.fr[key] || key;
}

export function setLanguage(lang, persist = true) {
  if (lang !== 'fr' && lang !== 'en') return;
  current = lang;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  translateText(lang);
  translateAttributes(lang);
  translateMeta(lang);
  paintToggle(lang);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* private mode */
    }
  }
  document.dispatchEvent(new CustomEvent('jz:languagechange', { detail: { lang } }));
}

export function initLanguage() {
  if (initialized) return;
  initialized = true;
  setLanguage(current, false);
  document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(current === 'fr' ? 'en' : 'fr');
    });
  });
}
