# @velocy/ui

Package de composants UI partagés pour la plateforme Velocy.

## Utilisation Future

Ce package est préparé pour contenir des composants React réutilisables à travers les applications du monorepo.

### Installation dans une application

```json
{
  "dependencies": {
    "@velocy/ui": "workspace:*"
  }
}
```

### Exemple de composant à ajouter

```tsx
// packages/ui/Button.tsx
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-600 text-white rounded">
      {children}
    </button>
  );
};
```

### Export depuis index.tsx

```tsx
// packages/ui/index.tsx
export { Button } from './Button';
```
