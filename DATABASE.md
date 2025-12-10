# 🗄️ Guide Base de Données - Velocy

Ce guide documente la configuration et l'utilisation de PostgreSQL avec Prisma dans le projet Velocy.

## 📦 Infrastructure

### Docker Compose

PostgreSQL tourne dans un conteneur Docker pour faciliter le développement local.

**Fichier**: `docker-compose.yml`

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: velocy-postgres
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: velocy
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Commandes Docker

```bash
# Lancer PostgreSQL
docker-compose up -d

# Arrêter PostgreSQL
docker-compose down

# Voir les logs
docker-compose logs -f postgres

# Arrêter et supprimer les données
docker-compose down -v
```

## 🔧 Configuration Prisma

### Installation

Prisma est installé dans `apps/api` :

```json
{
  "dependencies": {
    "@prisma/client": "^5.22.0"
  },
  "devDependencies": {
    "prisma": "^5.22.0"
  }
}
```

### Variables d'Environnement

Fichier: `apps/api/.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/velocy?schema=public"
PORT=4000
```

## 📊 Schéma de Base de Données

Le schéma Prisma contient **14 modèles** organisés pour une application de gestion de projet type Kanban :

### Modèles Principaux

| Modèle | Description | Relations clés |
|--------|-------------|----------------|
| **User** | Utilisateurs de la plateforme | Workspaces, Cards, Comments |
| **Workspace** | Espaces de travail (organisations) | Members, Boards, AuditLogs |
| **WorkspaceMember** | Membres d'un workspace avec rôles | User, Workspace |
| **Board** | Tableaux Kanban | Workspace, Lists |
| **List** | Colonnes dans un board | Board, Cards |
| **Card** | Tâches/cartes | List, Assignees, Comments, Attachments |
| **Comment** | Commentaires sur cartes | Card, User |
| **Attachment** | Fichiers attachés | Card |
| **Checklist** | Listes de vérification | Card, Items |
| **ChecklistItem** | Items dans une checklist | Checklist |
| **Label** | Étiquettes/tags | Cards |
| **TimeEntry** | Suivi du temps | Card, User |
| **AuditLog** | Journal d'audit | Workspace |
| **Notification** | Notifications | - |
| **NotificationSettings** | Paramètres de notification | User |

### Enums

- **Role**: `OWNER`, `ADMIN`, `MEMBER`, `GUEST`
- **ActionType**: `CREATE`, `UPDATE`, `DELETE`, `MOVE_CARD`
- **EntityType**: `BOARD`, `LIST`, `CARD`, `COMMENT`

## 🚀 Commandes Prisma

### Synchroniser le schéma

```bash
cd apps/api
npx prisma db push
```

### Générer le client Prisma

```bash
npx prisma generate
```

### Ouvrir Prisma Studio (GUI)

```bash
npx prisma studio
```

Interface web sur `http://localhost:5555` pour visualiser et éditer les données.

### Créer une migration

```bash
npx prisma migrate dev --name nom_de_la_migration
```

### Réinitialiser la base de données

```bash
npx prisma migrate reset
```

⚠️ **Attention**: Supprime toutes les données !

## 💻 Utilisation dans le Code

### Initialiser Prisma Client

```typescript
// apps/api/src/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

### Exemples de Requêtes

#### Créer un utilisateur

```typescript
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
  },
});
```

#### Créer un workspace avec un membre

```typescript
const workspace = await prisma.workspace.create({
  data: {
    name: 'Mon Projet',
    slug: 'mon-projet',
    members: {
      create: {
        userId: user.id,
        role: 'OWNER',
      },
    },
  },
});
```

#### Récupérer un board avec ses listes et cartes

```typescript
const board = await prisma.board.findUnique({
  where: { id: boardId },
  include: {
    lists: {
      include: {
        cards: {
          include: {
            assignees: true,
            labels: true,
          },
        },
      },
    },
  },
});
```

#### Créer une carte avec assignés

```typescript
const card = await prisma.card.create({
  data: {
    title: 'Nouvelle tâche',
    listId: listId,
    creatorId: userId,
    assignees: {
      connect: [{ id: userId1 }, { id: userId2 }],
    },
    labels: {
      connect: [{ id: labelId }],
    },
  },
});
```

## 🔍 Inspection de la Base

### Connexion PostgreSQL

```bash
# Avec Docker exec
docker exec -it velocy-postgres psql -U postgres -d velocy

# Avec psql local
psql postgresql://postgres:postgres@localhost:5432/velocy
```

### Commandes SQL utiles

```sql
-- Lister les tables
\dt

-- Voir la structure d'une table
\d "User"

-- Compter les utilisateurs
SELECT COUNT(*) FROM "User";

-- Voir tous les workspaces
SELECT * FROM "Workspace";
```

## 📝 Scripts Package.json

Ajoutez ces scripts utiles dans `apps/api/package.json` :

```json
{
  "scripts": {
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "db:reset": "prisma migrate reset",
    "db:seed": "ts-node prisma/seed.ts"
  }
}
```

## 🌱 Seeding (Données de test)

Créez `apps/api/prisma/seed.ts` :

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur de test
  const user = await prisma.user.upsert({
    where: { email: 'admin@velocy.com' },
    update: {},
    create: {
      email: 'admin@velocy.com',
      firstName: 'Admin',
      lastName: 'Velocy',
      password: 'hashed_password_here',
    },
  });

  // Créer un workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Velocy Team',
      slug: 'velocy-team',
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  console.log({ user, workspace });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Exécuter le seed :

```bash
npm run db:seed
```

## ⚠️ Bonnes Pratiques

1. **Ne jamais commiter `.env`** - Utilisez `.env.example` pour la documentation
2. **Toujours utiliser migrations en production** - Pas `db push`
3. **Indexer les champs fréquemment utilisés** - Déjà fait dans le schéma
4. **Utiliser transactions pour opérations multiples** :
   ```typescript
   await prisma.$transaction([
     prisma.card.create({ data: cardData }),
     prisma.auditLog.create({ data: auditData }),
   ]);
   ```
5. **Fermer les connexions** - Le service Prisma gère ça automatiquement

## 🔒 Sécurité

- Les mots de passe doivent être hashés (utilisez bcrypt)
- Validez toujours les entrées utilisateur
- Utilisez les relations Prisma pour éviter les injections SQL
- Activez RLS (Row Level Security) en production si nécessaire

## 🚀 Déploiement

En production, utilisez des migrations :

```bash
# Générer une migration
npx prisma migrate dev

# Appliquer en production
npx prisma migrate deploy
```

## 📚 Ressources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

**Base de données configurée et prête à l'emploi !** 🎉
