# Quiz Lexique Kendo — CAF

Quiz interactif japonais ↔ français pour réviser le lexique du CAF Kendo.

## Utilisation rapide (aucune installation)

Ouvrir directement dans le navigateur :

```
quiz-lexique-kendo/index.html
```

Ce fichier est autonome — aucune installation requise.

---

## Version compilée avec Bun + Vite + Tailwind

### Prérequis

- [Bun](https://bun.sh) installé (`curl -fsSL https://bun.sh/install | bash`)

### Installation

```bash
cd quiz-lexique-kendo
bun install
```

### Développement

```bash
bun run dev
```

Lance Vite sur `http://localhost:5173` avec rechargement à chaud.

### Production

```bash
bun run build    # compile dans dist/
bun run preview  # prévisualise le build
```

---

## Structure du projet

```
quiz-lexique-kendo/
├── index.html          ← version autonome (CDN, aucune installation)
├── app/
│   └── index.html      ← entrée Vite pour la version compilée
├── src/
│   ├── main.ts         ← point d'entrée
│   ├── data.ts         ← 100+ termes du lexique JP/FR
│   ├── store.ts        ← état réactif (Gea Store)
│   ├── App.ts          ← composant principal (Gea Component)
│   └── index.css       ← Tailwind + styles custom
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Fonctionnalités

- **100+ termes** en 11 catégories (Fondamentaux, Équipement, Gardes, Déplacements, Techniques, Waza, Entraînement, Kata, Commandements, Compétition, Grades…)
- **3 modes** : Japonais → Français, Français → Japonais, Les deux
- **4 longueurs** : 10, 20, 30, ou 50 questions
- **Résultats** : score global, détail par direction, liste des termes à revoir
- **Framework** : [Gea.js](https://geajs.com) + Tailwind CSS
