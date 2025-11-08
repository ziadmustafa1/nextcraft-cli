# 🚀 Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.17 or higher (v20 LTS recommended)
- **Package Manager**: pnpm (recommended), npm, yarn, or bun
- **Git**: Latest version

### Check your versions:

```bash
node --version  # Should be v18.17+
npm --version   # or pnpm --version
git --version
```

---

## Installation Methods

### Method 1: NPX (Recommended)

The easiest way to create a new NextCraft project:

```bash
npx create-nextcraft-app my-app
```

This will:
- ✅ Download the latest version
- ✅ Run the interactive CLI
- ✅ Generate your project
- ✅ Install all dependencies

### Method 2: Global Installation

Install NextCraft globally for repeated use:

```bash
# Using npm
npm install -g create-nextcraft-app

# Using pnpm (faster)
pnpm add -g create-nextcraft-app

# Using yarn
yarn global add create-nextcraft-app

# Using bun (fastest)
bun add -g create-nextcraft-app
```

Then create projects with:

```bash
create-nextcraft-app my-app
```

### Method 3: Non-Interactive Mode

Perfect for CI/CD or scripting:

```bash
# With all defaults
npx create-nextcraft-app my-app --yes

# With specific options
npx create-nextcraft-app my-app \
  --mode frontend \
  --ui shadcn \
  --yes

# Fullstack with database
npx create-nextcraft-app my-fullstack-app \
  --mode fullstack \
  --ui shadcn \
  --db postgres \
  --auth \
  --yes
```

---

## Quick Start

### 1. Create Your Project

```bash
npx create-nextcraft-app my-app
```

You'll be asked:
- **Project mode**: Frontend or Fullstack
- **UI framework**: Shadcn, Chakra, or Material
- **Database** (fullstack only): PostgreSQL, SQLite, or MySQL
- **Authentication**: Enable Auth.js
- **RTL Support**: For Arabic/Hebrew
- **SEO**: Enable SEO optimization

### 2. Navigate to Project

```bash
cd my-app
```

### 3. Start Development Server

```bash
# If dependencies aren't installed yet
pnpm install

# Start dev server with Turbopack
pnpm dev
```

Your app will be running at `http://localhost:3000` 🚀

### 4. Build for Production

```bash
pnpm build
```

---

## What Gets Installed?

### Frontend Mode (37 packages)

#### Production Dependencies (17):
- `next@16.0.1` - Framework
- `react@19.2.0` & `react-dom@19.2.0` - UI Library
- `@tanstack/react-query@5.60+` - Data fetching
- `zustand@5.0+` - State management
- `react-hook-form@7.54+` - Form handling
- `zod@3.24+` - Runtime validation
- `framer-motion@11.15+` - Animations
- `axios@1.7+` - HTTP client
- `lucide-react@0.460+` - Icons
- `class-variance-authority` - CVA utilities
- `clsx` & `tailwind-merge` - Class utilities
- `tailwind-variants` - Advanced variants
- `server-only` & `client-only` - Code boundaries

#### Dev Dependencies (20):
- `typescript@5.7+` - Strict mode enabled
- `tailwindcss@4.1+` - Latest CSS framework
- `@tailwindcss/postcss@4.1+` - TailwindCSS 4 plugin
- `eslint@9.16+` - Flat config
- `prettier@3.4+` - Auto-formatting
- `husky@9.1+` - Git hooks
- `lint-staged@15.2+` - Pre-commit linting
- `vitest@2.1+` - Modern testing
- `@testing-library/react@16.1+` - Component testing
- `@typescript-eslint/*` - TypeScript linting
- Plus 10 more quality tools

### Fullstack Mode

All frontend packages **plus**:
- `prisma@latest` - ORM
- `@prisma/client` - Database client
- `next-auth@beta` - Authentication
- `bcryptjs` - Password hashing
- Additional database-specific packages

---

## Verification

After installation, verify everything works:

```bash
# Check project structure
ls -la

# Check package.json
cat package.json

# Type check
pnpm typecheck

# Lint
pnpm lint

# Run tests
pnpm test

# Build
pnpm build
```

All commands should complete successfully ✅

---

## Troubleshooting

### Issue: `command not found: npx`

**Solution**: Update Node.js to v18.17+

```bash
# Using nvm
nvm install 20
nvm use 20
```

### Issue: Installation hangs

**Solution**: Clear cache and retry

```bash
# npm
npm cache clean --force

# pnpm
pnpm store prune

# yarn
yarn cache clean
```

### Issue: Permission errors

**Solution**: Don't use sudo with npm/pnpm

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## Next Steps

- [📖 Project Structure](./project-structure.md)
- [⚙️ Configuration Guide](../configuration.md)
- [🎨 UI Customization](./ui-customization.md)
- [🚀 Deployment](../deployment.md)

---

**Ready to build something amazing!** 🚀
