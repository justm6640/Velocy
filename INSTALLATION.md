# 🚀 Guide d'Installation - Velocy Monorepo

Ce guide vous accompagne pas à pas pour mettre en place et lancer le monorepo Velocy.

## ⚠️ Prérequis

### 1. Node.js

Vérifiez que Node.js est installé (version 18 ou supérieure) :

```bash
node --version
```

Si Node.js n'est pas installé, téléchargez-le depuis [nodejs.org](https://nodejs.org/)

### 2. pnpm (Gestionnaire de paquets)

**pnpm n'est pas encore installé sur votre système.** Voici comment l'installer :

#### Option 1 : Installation via npm (Recommandé)

```bash
npm install -g pnpm
```

#### Option 2 : Installation via PowerShell (Windows)

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

#### Vérifier l'installation

```bash
pnpm --version
```

Vous devriez voir la version 9.x.x ou supérieure.

## 📦 Installation du Projet

### Étape 1 : Installer les dépendances

À la racine du projet `Velocy/`, exécutez :

```bash
pnpm install
```

Cette commande va :
- ✅ Installer toutes les dépendances pour le frontend (Next.js)
- ✅ Installer toutes les dépendances pour le backend (NestJS)
- ✅ Installer Turborepo
- ✅ Créer les liens symboliques entre les workspaces

**⏱️ Durée estimée** : 1-3 minutes selon votre connexion internet.

### Étape 2 : Vérifier l'installation

Vérifiez que l'installation s'est bien passée :

```bash
pnpm list --depth=0
```

Vous devriez voir les workspaces détectés :
- `@velocy/web`
- `@velocy/api`
- `@velocy/ui`
- `@velocy/config`

## 🎯 Lancement en Mode Développement

### Lancer Frontend + Backend simultanément

```bash
pnpm dev
```

Turborepo va lancer les deux applications en parallèle :

- **Frontend (Next.js)** → `http://localhost:3000`
- **Backend (NestJS)** → `http://localhost:4000`

### Lancer les applications séparément

#### Frontend uniquement

```bash
cd apps/web
pnpm dev
```

#### Backend uniquement

```bash
cd apps/api
pnpm dev
```

## ✅ Vérification du Fonctionnement

### 1. Tester le Frontend

Ouvrez votre navigateur à l'adresse :
```
http://localhost:3000
```

Vous devriez voir une page d'accueil moderne avec :
- Le logo "Velocy"
- Des cartes présentant les technologies
- Un bouton "Tester l'API"

### 2. Tester le Backend

Testez l'endpoint de santé de l'API :

```bash
curl http://localhost:4000/health
```

Ou ouvrez dans votre navigateur :
```
http://localhost:4000/health
```

Réponse attendue :
```json
{
  "status": "ok",
  "timestamp": "2025-12-10T18:11:00.000Z",
  "service": "Velocy API",
  "version": "1.0.0"
}
```

### 3. Tester la communication Frontend ↔ Backend

Depuis la page d'accueil (`http://localhost:3000`), cliquez sur le bouton **"Tester l'API →"**.

Cela devrait ouvrir l'endpoint de santé dans un nouvel onglet.

## 🛠️ Commandes Utiles

### Build de Production

Compiler toutes les applications :

```bash
pnpm build
```

Les fichiers build seront dans :
- `apps/web/.next/` (Next.js)
- `apps/api/dist/` (NestJS)

### Linter

Vérifier la qualité du code :

```bash
pnpm lint
```

### Tests

Exécuter les tests :

```bash
pnpm test
```

### Nettoyer le Projet

Supprimer tous les `node_modules` et builds :

```bash
pnpm clean
```

Puis réinstaller :

```bash
pnpm install
```

## 🐛 Résolution de Problèmes

### Erreur : "pnpm n'est pas reconnu"

➡️ Installez pnpm globalement :

```bash
npm install -g pnpm
```

### Erreur : Port déjà utilisé

Si le port 3000 ou 4000 est déjà utilisé :

#### Pour Next.js (Frontend)

```bash
cd apps/web
PORT=3001 pnpm dev
```

#### Pour NestJS (Backend)

Modifiez `apps/api/src/main.ts` :

```typescript
const port = process.env.PORT || 4001; // Changez 4000 en 4001
```

### Erreur lors de l'installation

Supprimez le cache et réinstallez :

```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Turborepo cache issues

Nettoyez le cache Turborepo :

```bash
rm -rf .turbo
pnpm dev
```

## 📚 Prochaines Étapes

Maintenant que votre environnement est configuré :

1. **Explorez le code** :
   - Frontend : `apps/web/src/app/`
   - Backend : `apps/api/src/`

2. **Ajoutez des fonctionnalités** :
   - Créez de nouvelles pages dans `apps/web/src/app/`
   - Ajoutez des endpoints dans `apps/api/src/`

3. **Créez des composants partagés** :
   - Ajoutez des composants React dans `packages/ui/`
   - Utilisez-les dans vos applications

4. **Consultez la documentation** :
   - [Next.js Documentation](https://nextjs.org/docs)
   - [NestJS Documentation](https://docs.nestjs.com)
   - [Turborepo Documentation](https://turbo.build/repo/docs)

## 🎉 Félicitations !

Votre monorepo Velocy est maintenant opérationnel ! 🚀

Pour toute question, consultez le fichier `README.md` principal.
