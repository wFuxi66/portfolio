# Portfolio — Jimmy ZHENG

🌐 **[Voir le portfolio](https://wfuxi66.github.io/portfolio/)**

Portfolio-carte électronique : une carte mère 3D (Three.js / React Three Fiber) dont la sérigraphie raconte le parcours — pistes en cuivre, composants, signaux animés et caméra pilotée au scroll. Les panneaux de contenu sont posés au-dessus de la carte comme des feuilles de schéma.

## Stack

- **React 18 + Vite** — application statique
- **Three.js / @react-three/fiber** — scène 3D ; la texture complète du circuit imprimé (pistes, sérigraphie, cotes) est peinte en Canvas 2D (`src/three/boardTexture.js`)
- **Tailwind CSS + design system custom** — palette cuivre / graphite / ivoire, cohérence « atelier électronique »
- **Framer Motion** — révélations au scroll, respect de `prefers-reduced-motion`

## Développement

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run build
npm run preview
```

## Structure

| Dossier | Rôle |
| --- | --- |
| `src/three/` | Scène WebGL : plateau, composants, texture PCB, caméra (`BoardScene.jsx`, `boardTexture.js`) |
| `src/sections/` | Sections HTML (hero, profil, formation, expérience, projets, compétences, contact) |
| `src/components/` | HUD, crosshair EDA, cartes projets, en-têtes, révélation |
| `src/data/` | **Tout le contenu du CV** — à mettre à jour sans toucher aux composants |
| `src/lib/sceneState.js` | Pont scroll / souris → scène 3D, sans re-render React |

## Mettre à jour le contenu

Le contenu (expériences, projets, compétences, formation, coordonnées) vit entièrement dans `src/data/`.
Le CV téléchargeable depuis le site est `public/CV_Jimmy_ZHENG.pdf`.

© 2026 Jimmy ZHENG - Tous droits réservés
