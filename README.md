# Velocy - Monorepo SAAS Platform

![Turborepo](https://img.shields.io/badge/Turborepo-2.3.3-blue)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![NestJS](https://img.shields.io/badge/NestJS-10+-red)
![pnpm](https://img.shields.io/badge/pnpm-9+-orange)

Monorepo robuste pour une plateforme SAAS construite avec **Turborepo**, **Next.js 14+**, et **NestJS**.

## 📁 Structure du Projet

```
Velocy/
├── apps/
│   ├── web/              # Frontend Next.js (port 3000)
│   │   ├── src/
│   │   │   └── app/      # App Router
│   │   ├── package.json
│   │   ├── next.config.mjs
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── api/              # Backend NestJS (port 4000)
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── app.controller.ts
│       │   └── app.service.ts
│       ├── package.json
│       ├── nest-cli.json
│       └── tsconfig.json
├── packages/
│   ├── ui/               # Composants UI partagés
│   └── config/           # Configurations partagées
├── package.json          # Configuration racine
├── pnpm-workspace.yaml   # Workspaces pnpm
├── turbo.json            # Pipeline Turborepo
└── .gitignore
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** >= 18.0.0
- **pnpm** >= 9.0.0

Si pnpm n'est pas installé :

```bash
npm install -g pnpm
```

### Installation

```bash
# Installer toutes les dépendances
pnpm install
```

### Développement

```bash
# Lancer Frontend + Backend en parallèle
pnpm dev
```

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:4000
- **Health Check API** : http://localhost:4000/health

### Build de Production

```bash
# Build toutes les applications
pnpm build
```

### Autres Commandes

```bash
# Linter
pnpm lint

# Tests
pnpm test

# Nettoyer les builds et node_modules
pnpm clean
```

## 🛠️ Technologies Utilisées

### Frontend (apps/web)

- **Next.js 14+** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **React 18** - Bibliothèque UI

### Backend (apps/api)

- **NestJS 10+** - Framework Node.js progressif
- **TypeScript** - Mode strict activé
- **Express** - Serveur HTTP sous-jacent
- **CORS** - Configuration pour communication avec le frontend

### Tooling

- **Turborepo** - Build system et orchestration de tâches
- **pnpm** - Gestionnaire de paquets rapide et efficace
- **TypeScript** - Typage dans tout le monorepo

## 📦 Packages Partagés

### @velocy/ui

Package préparé pour les composants React réutilisables.

```typescript
// Exemple d'utilisation future
import { Button, Card } from '@velocy/ui';
```

### @velocy/config

Package préparé pour les configurations partagées (ESLint, TypeScript, etc.).

## 🔥 Turborepo Pipeline

Le fichier `turbo.json` définit les tâches suivantes :

- **`dev`** : Lanceur de développement (pas de cache, persistant)
- **`build`** : Build de production (avec cache)
- **`lint`** : Vérifications du code
- **test`** : Tests unitaires

## 🌐 Endpoints API

### GET /

Retourne un message de bienvenue.

### GET /health

Retourne le statut de santé de l'API :

```json
{
  "status": "ok",
  "timestamp": "2025-12-10T18:05:00.000Z",
  "service": "Velocy API",
  "version": "1.0.0"
}
```

## 📝 Guide de Développement

### Ajouter une Nouvelle Application

1. Créer un nouveau dossier dans `apps/`
2. Ajouter un `package.json` avec un nom en `@velocy/app-name`
3. Les workspaces pnpm détecteront automatiquement le nouveau package

### Ajouter un Nouveau Package Partagé

1. Créer un nouveau dossier dans `packages/`
2. Ajouter un `package.json` avec un nom en `@velocy/package-name`
3. Référencer le package dans les applications avec `"@velocy/package-name": "workspace:*"`

### Utiliser un Package Partagé

Dans le `package.json` d'une application :

```json
{
  "dependencies": {
    "@velocy/ui": "workspace:*"
  }
}
```

Puis dans le code :

```typescript
import { MyComponent } from '@velocy/ui';
```

## 🤝 Contribution

1. Créer une branche pour votre feature
2. Faire vos modifications
3. Tester avec `pnpm dev` et `pnpm build`
4. Soumettre une pull request

## 📄 Licence

Privé - © 2025 Velocy

---

**Propulsé par Turborepo + Next.js + NestJS** 🚀
