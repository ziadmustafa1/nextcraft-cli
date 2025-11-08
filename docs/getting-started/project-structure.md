# 📁 Project Structure

## Overview

NextCraft generates a well-organized, production-ready project structure following industry best practices.

---

## Frontend Project Structure

```
my-app/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── .husky/
│   └── pre-commit              # Git pre-commit hooks
├── .vscode/
│   ├── settings.json           # VSCode workspace settings
│   └── extensions.json         # Recommended extensions
├── __tests__/
│   └── example.test.tsx        # Vitest tests
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── actions/            # Server Actions
│   │   │   └── index.ts
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles (TailwindCSS 4)
│   ├── components/
│   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── examples/           # Example components
│   │   │   ├── optimistic-list.tsx
│   │   │   └── login-form.tsx
│   │   └── shared/             # Shared components
│   ├── hooks/
│   │   ├── use-fetch.ts        # TanStack Query hook
│   │   └── use-query.ts        # Query utilities
│   ├── lib/
│   │   ├── api-client.ts       # Axios client
│   │   ├── cache.ts            # Cache utilities
│   │   ├── utils.ts            # General utilities
│   │   ├── server-utils.ts     # Server-only code
│   │   └── client-utils.ts     # Client-only code
│   ├── config/
│   │   └── site.ts             # Site configuration
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── styles/
│       └── globals.css
├── .editorconfig               # Editor configuration
├── .eslintrc.mjs               # ESLint config (Flat)
├── .gitignore
├── .lintstagedrc               # Lint-staged config
├── .prettierrc                 # Prettier config
├── .prettierignore
├── commitlint.config.mjs       # Conventional commits
├── components.json             # Shadcn config
├── next.config.ts              # Next.js config
├── nextcraft.config.ts         # NextCraft config
├── package.json
├── postcss.config.js           # PostCSS config
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript strict mode
├── vitest.config.ts            # Vitest config
├── vitest.setup.ts             # Vitest setup
├── NEXTJS_16.md                # Next.js 16 guide
└── README.md
```

---

## Fullstack Project Structure

All frontend structure **plus**:

```
my-fullstack-app/
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── src/
│   ├── app/
│   │   ├── api/                # API routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   └── users/
│   │   │       └── route.ts
│   │   └── admin/              # Admin dashboard
│   ├── lib/
│   │   ├── db/
│   │   │   ├── prisma.ts       # Prisma client
│   │   │   └── queries.ts      # Database queries
│   │   └── auth/
│   │       └── config.ts       # Auth.js config
│   └── middleware.ts           # Next.js middleware
├── .env                        # Environment variables
└── .env.example                # Example environment
```

---

## Key Directories Explained

### `/src/app`
- **Next.js 16 App Router** directory
- Each folder becomes a route
- `layout.tsx` - Layout wrapper
- `page.tsx` - Page component
- `loading.tsx` - Loading state
- `error.tsx` - Error boundary

### `/src/app/actions`
- **Server Actions** for data mutations
- Functions with `'use server'` directive
- Direct server-side code execution
- Type-safe client-server communication

### `/src/components/ui`
- **Shadcn UI** components
- Accessible, customizable
- Copy-paste components
- Full TypeScript support

### `/src/hooks`
- **Custom React hooks**
- Reusable logic
- `use-fetch.ts` - TanStack Query wrapper
- State management helpers

### `/src/lib`
- **Utility functions & clients**
- `api-client.ts` - Axios instance
- `cache.ts` - Cache utilities
- `server-utils.ts` - Server-only code (uses `server-only` package)
- `client-utils.ts` - Client-only code (uses `client-only` package)

### `/src/types`
- **TypeScript type definitions**
- Shared interfaces
- Type utilities
- Zod schemas

---

## Configuration Files

### Core Config Files

#### `next.config.ts`
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,  // PPR enabled
  images: {
    formats: ['image/avif', 'image/webp']
  },
  // ... security headers
}
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    // ... more strict checks
  }
}
```

#### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}
```

### Quality Tools Config

#### `.eslintrc.mjs` (Flat Config - ESLint 9)
```javascript
export default [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]
```

#### `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### `.lintstagedrc`
```json
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

---

## Package Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,json,md}\"",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "validate": "pnpm lint && pnpm typecheck && pnpm test"
  }
}
```

### Script Descriptions

- `dev` - Start development server with Turbopack (10× faster)
- `build` - Build for production
- `start` - Start production server
- `lint` - Check for lint errors (max 0 warnings)
- `lint:fix` - Auto-fix lint errors
- `format` - Format all files with Prettier
- `typecheck` - Check TypeScript types
- `test` - Run all tests
- `test:watch` - Run tests in watch mode
- `test:coverage` - Generate coverage report
- `validate` - Run all checks (lint + typecheck + test)

---

## Environment Variables

### `.env` (Fullstack only)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Auth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# API Keys
NEXT_PUBLIC_API_URL="https://api.example.com"
```

### Rules:
- `NEXT_PUBLIC_*` - Exposed to browser
- Others - Server-only

---

## Naming Conventions

### Files
- **Components**: `PascalCase` - `UserProfile.tsx`
- **Utilities**: `kebab-case` - `api-client.ts`
- **Hooks**: `camelCase` - `use-fetch.ts`
- **Types**: `PascalCase` - `UserTypes.ts`

### Functions
- **Components**: `PascalCase` - `function UserCard()`
- **Hooks**: `camelCase` - `function useFetch()`
- **Utilities**: `camelCase` - `function formatDate()`
- **Server Actions**: `camelCase` - `async function createUser()`

### Types
- **Interfaces**: `PascalCase` with `I` prefix (optional) - `interface IUser`
- **Types**: `PascalCase` - `type UserRole`
- **Enums**: `PascalCase` - `enum Status`

---

## Best Practices

### 1. Co-location
Keep related files close:
```
components/
└── UserProfile/
    ├── UserProfile.tsx
    ├── UserProfile.test.tsx
    ├── UserProfile.styles.ts
    └── index.ts
```

### 2. Barrel Exports
Use `index.ts` for clean imports:
```typescript
// components/ui/index.ts
export { Button } from './button'
export { Card } from './card'

// Usage
import { Button, Card } from '@/components/ui'
```

### 3. Absolute Imports
Use `@/` prefix (configured in `tsconfig.json`):
```typescript
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api-client'
```

### 4. Type Safety
Always define types:
```typescript
interface Props {
  user: User
  onUpdate: (user: User) => void
}

export function UserCard({ user, onUpdate }: Props) {
  // ...
}
```

---

## Next Steps

- [⚙️ Configuration Guide](../configuration.md)
- [🎨 UI Customization](./ui-customization.md)
- [📝 Best Practices](../guides/best-practices.md)
- [🚀 Deployment](../deployment.md)
