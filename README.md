# gaston.krabansky.fr

Site portfolio personnel de Gaston Krabansky — étudiant en BTS SIO (option SLAM) et développeur
Java/Python. Site 100% statique (HTML / CSS / JavaScript, sans framework ni backend).

## Structure du projet

```
gaston.krabansky.fr/
│
├── index.html                  ← Page d'accueil
│
├── pages/
│   ├── competences.html
│   ├── parcours.html
│   ├── projets.html
│   ├── contact.html
│   ├── cv.html
│   │
│   ├── projets/                ← Une sous-page par projet
│   │   ├── essentialsx-gui.html
│   │   ├── etoile-du-jeu.html
│   │   └── portfolio.html
│   │
│   ├── experiences/             ← Une sous-page par expérience
│   │   ├── bts-sio.html
│   │   ├── bac.html
│   │   ├── brevet.html
│   │   └── france-3.html
│   │
│   └── bts-sio/                 ← Section dédiée à l'épreuve E5
│       ├── index.html           (présentation du BTS SIO / SLAM)
│       ├── competences.html      (compétences validées par réalisation)
│       ├── veilles.html
│       └── veilles/
│           ├── veille-1.html
│           ├── veille-2.html
│           └── veille-3.html
│
├── assets/
│   ├── css/
│   │   ├── style.css            ← Variables, reset, layout, nav, footer
│   │   ├── components.css       ← Cartes, timeline, onglets, tableaux, formulaire
│   │   └── responsive.css       ← Media queries
│   │
│   ├── js/
│   │   ├── main.js              ← Année dynamique, effet nav au scroll, burger
│   │   ├── navigation.js        ← Mise en surbrillance du lien actif
│   │   └── components.js        ← Onglets + formulaire de contact
│   │
│   ├── images/
│   └── documents/
│       ├── cv/cv.pdf
│       └── rapports/
│
├── robots.txt
├── sitemap.xml
├── humans.txt
└── llms.txt
```

## À compléter / relire

Certaines parties ont été rédigées ou complétées à titre d'exemple, faute de contenu fourni.
Elles sont signalées directement sur les pages concernées par un badge orange
**« Contenu d'exemple à relire / compléter »**. En particulier :

- Les 3 veilles technologiques (`pages/bts-sio/veilles/`) sont des exemples à remplacer par vos
  propres sujets de veille.
- Le rapport de stage France 3 (`pages/experiences/france-3.html`) attend un fichier PDF dans
  `assets/documents/rapports/`.
- Les réalisations de 2ᵉ année du tableau de compétences BTS SIO sont à ajouter au fil de l'année.
- Certains textes de présentation de projets ont été enrichis avec des détails plausibles à valider.

## Déploiement

Le site est statique : il suffit de pousser le contenu de ce dossier sur la branche servie par
GitHub Pages (ou tout autre hébergement statique), sans étape de build.
