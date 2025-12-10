# @velocy/config

Package de configurations partagées pour la plateforme Velocy.

## Utilisation Future

Ce package est préparé pour contenir des configurations réutilisables (ESLint, TypeScript, Prettier, etc.) à travers les applications du monorepo.

### Exemples de configurations à ajouter

#### TypeScript Config Partagé

```json
// packages/config/tsconfig-base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

Utilisation dans une application:

```json
// apps/web/tsconfig.json
{
  "extends": "@velocy/config/tsconfig-base.json",
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

#### ESLint Config Partagé

```js
// packages/config/eslint-preset.js
module.exports = {
  extends: ['next', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
};
```
