# Configuration

NextCraft uses a `nextcraft.config.ts` file for project configuration.

## Configuration File

Create a `nextcraft.config.ts` in your project root:

```typescript
import { defineConfig } from '@nextcraft/core';

export default defineConfig({
  mode: 'fullstack',
  ui: 'shadcn',
  db: 'postgres',
  auth: true,
  rtl: false,
  seo: true,
  modules: ['auth', 'users'],
});
```

## Options

### `mode`

**Type:** `'frontend' | 'fullstack'`  
**Default:** `'frontend'`

Project mode:
- **frontend**: UI-only project with API calls
- **fullstack**: Full application with backend and database

### `ui`

**Type:** `'shadcn' | 'chakra' | 'material'`  
**Default:** `'shadcn'`

UI framework to use:
- **shadcn**: Shadcn UI (Recommended) - Beautiful components with Radix UI
- **chakra**: Chakra UI - Simple and accessible
- **material**: Material UI - Google's Material Design

### `db`

**Type:** `'postgres' | 'sqlite' | 'mysql'`  
**Default:** `undefined`  
**Required for:** Fullstack mode

Database provider:
- **postgres**: PostgreSQL (Recommended for production)
- **sqlite**: SQLite (Great for development)
- **mysql**: MySQL

### `auth`

**Type:** `boolean`  
**Default:** `false`

Enable authentication with Auth.js (NextAuth).

Includes:
- JWT session management
- Credentials provider
- User model with Prisma
- Auth API routes

### `rtl`

**Type:** `boolean`  
**Default:** `false`

Enable Right-to-Left support for Arabic, Hebrew, etc.

Automatically configures:
- Next.js `dir` setting
- Tailwind RTL utilities
- Component layout adjustments

### `seo`

**Type:** `boolean`  
**Default:** `true`

Enable SEO optimization.

Includes:
- Meta tags configuration
- Open Graph tags
- Twitter Card tags
- Sitemap generation
- robots.txt

### `modules`

**Type:** `string[]`  
**Default:** `[]`

Pre-installed modules:
- `auth`: Authentication system
- `users`: User management
- `blog`: Blog with Markdown
- `admin`: Admin dashboard
- `dashboard`: Analytics dashboard
- `payments`: Payment integration

## Examples

### Frontend Project

```typescript
export default defineConfig({
  mode: 'frontend',
  ui: 'shadcn',
  seo: true,
  rtl: false,
});
```

### Fullstack with Auth

```typescript
export default defineConfig({
  mode: 'fullstack',
  ui: 'shadcn',
  db: 'postgres',
  auth: true,
  seo: true,
  modules: ['auth', 'users', 'admin'],
});
```

### Multi-language RTL

```typescript
export default defineConfig({
  mode: 'frontend',
  ui: 'shadcn',
  rtl: true,
  seo: true,
});
```

## Environment Variables

For fullstack projects, configure your `.env`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Authentication (if auth: true)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# Optional
NODE_ENV="development"
```

## Dynamic Configuration

You can use environment variables in your config:

```typescript
export default defineConfig({
  mode: process.env.NODE_ENV === 'production' ? 'fullstack' : 'frontend',
  ui: 'shadcn',
  db: process.env.DATABASE_URL ? 'postgres' : 'sqlite',
  auth: true,
  seo: true,
});
```

## TypeScript Support

The config file is fully typed. Use autocomplete and type checking:

```typescript
import { defineConfig, NextCraftConfig } from '@nextcraft/core';

const config: NextCraftConfig = {
  mode: 'fullstack',
  // TypeScript will validate all options
};

export default defineConfig(config);
```
