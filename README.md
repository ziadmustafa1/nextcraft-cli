# 🎨 NextCraft

> **Senior-Level Next.js 16 Generator** - Production-ready in 1 minute, not 3 hours

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.60-orange)](https://tanstack.com/query)
[![npm version](https://img.shields.io/npm/v/create-nextcraft-app.svg)](https://www.npmjs.com/package/create-nextcraft-app)
[![Downloads](https://img.shields.io/npm/dm/create-nextcraft-app.svg)](https://www.npmjs.com/package/create-nextcraft-app)

## 💎 What Makes NextCraft Different?

**Standard `create-next-app`:** 3-4 basic packages, zero configuration, 3 hours of manual setup  
**NextCraft:** 37+ industry-standard packages, production-ready configuration, **1 minute total**

[📊 See Full Comparison](./docs/COMPARISON.md) | [📚 Documentation](./docs/) | [🚀 Quick Start](#-quick-start)

---

## 🚀 Features (Senior-Level 2025)

### **🏗️ Architecture**
- **Next.js 16.0.1 + React 19.2**: Latest stable with Turbopack, PPR, Server Actions
- **TypeScript Strict Mode**: Zero `any`, full type safety with advanced checks
- **Dual Mode**: Frontend-only or Full-stack projects
- **Smart Config**: Auto-setup via `nextcraft.config.ts`

### **📦 State & Data**
- **TanStack Query 5.60**: Industry-standard data fetching & caching
- **Zustand 5.0**: Lightweight, type-safe state management
- **React Hook Form 7.54**: Professional form handling
- **Zod 3.24**: Runtime validation everywhere

### **🎨 UI & Styling**
- **TailwindCSS 4.1**: Latest with @tailwindcss
- **Shadcn UI**: Accessible, customizable components
- **Framer Motion 11**: Professional animations
- **tailwind-variants**: Advanced variant handling

### **🧪 Testing & Quality**
- **Vitest 2.1**: Fast, modern testing
- **Testing Library**: Component testing best practices
- **ESLint 9**: Flat config with strict rules
- **Prettier 3.4**: Auto-formatting with Tailwind plugin
- **Husky + lint-staged**: Pre-commit quality checks

### **⚙️ Developer Experience**
- **Turbopack**: 10× faster dev builds
- **Strict TypeScript**: Production-grade type safety
- **Git Hooks**: Automated quality enforcement
- **CI/CD Ready**: GitHub Actions pre-configured
- **VSCode Integration**: Settings & extensions included

## 📦 Quick Start

### Create Your First Project

```bash
# Interactive mode (recommended for first time)
npx create-nextcraft-app my-app

# Non-interactive with defaults
npx create-nextcraft-app my-app --yes

# Specify mode and UI framework
npx create-nextcraft-app my-app --mode frontend --ui shadcn

# Fullstack with database
npx create-nextcraft-app my-app --mode fullstack --db postgres --auth
```

### Project Management with Forge

```bash
cd my-app

# Start development server
forge dev

# Build for production
forge build

# Check project health
forge doctor

# Add modules (coming soon)
forge add auth      # Authentication
forge add users     # User management
forge add blog      # Blog system
forge add admin     # Admin dashboard
```

## 🎯 Modes

### Frontend Mode
- Next.js 16 App Router + Turbopack
- React 19 with useOptimistic & useActionState
- TailwindCSS 4 + Shadcn UI
- SWR + Axios
- Server Actions templates
- SEO + RTL ready
- Theme system (Dark/Light)

### Fullstack Mode
- Everything in Frontend +
- Prisma ORM + caching utilities
- Auth.js authentication
- PostgreSQL/SQLite/MySQL
- Server Actions ready
- REST API routes
- Admin dashboard

## 📦 What's Included?

Every project comes with:

```
✅ 27+ Production-Ready Packages
✅ TypeScript Strict Mode Configured
✅ ESLint 9 (Flat Config) + Prettier
✅ Husky + lint-staged (Git Hooks)
✅ Vitest + Testing Library
✅ TanStack Query + Zustand
✅ React Hook Form + Zod
✅ GitHub Actions CI/CD
✅ VSCode Settings
✅ Conventional Commits
✅ Next.js 16 Templates
✅ Security Headers
✅ SEO Optimized
```

[📖 Full Stack Documentation](./SENIOR_STACK_2025.md)

---

## ⚡ Quick Comparison

| Feature | `create-next-app` | NextCraft |
|---------|-------------------|-----------|
| Setup Time | 3 hours | **1 minute** ⚡ |
| Next.js Version | 14.x | **16.0.1** |
| React Version | 18 | **19.2** |
| TypeScript | Basic | **Strict Mode** |
| Data Fetching | Manual | **TanStack Query** |
| State Management | Context | **Zustand** |
| Forms | Manual | **React Hook Form + Zod** |
| Testing | ❌ None | **Vitest** ✅ |
| Linting | Basic | **ESLint 9 + Prettier** |
| Git Hooks | ❌ None | **Husky** ✅ |
| CI/CD | ❌ Manual | **GitHub Actions** ✅ |

**Result:** NextCraft = **Production-ready** from day one 🚀

---

## 📖 Documentation

- [📊 NextCraft vs Standard Setup](./docs/COMPARISON.md)
- [🎯 Senior Stack 2025](./SENIOR_STACK_2025.md)
- [🚀 Next.js 16 Features](./docs/NEXTJS_16_FEATURES.md)
- [📋 Problem-Solution Matrix](./docs/PROBLEM_SOLUTION_MATRIX.md)
- [🗺️ Development Roadmap](./docs/ROADMAP.md)

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/nextcraft/nextcraft.git
cd nextcraft

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Test the CLI locally
cd packages/cli
pnpm build
node dist/index.js test-project --yes

# Run tests
pnpm test

# Lint code
pnpm lint
```

## 🧪 CLI Options

### Create Command

```bash
create-nextcraft-app [project-name] [options]

Options:
  -m, --mode <mode>         Project mode (frontend|fullstack)
  --ui <framework>          UI framework (shadcn|chakra|material)
  --db <database>           Database (postgres|sqlite|mysql)
  --auth                    Include authentication
  --rtl                     Enable RTL support
  --no-seo                  Disable SEO optimization
  -y, --yes                 Use default options (non-interactive)
  -V, --version             Output version number
  -h, --help                Display help
```

### Forge Commands

```bash
forge dev                   # Start development server
forge build                 # Build for production
forge doctor                # Validate project structure
forge add <module>          # Add module to project
```

---

## 💡 Philosophy

> **"Zero Config, Maximum Quality"**

NextCraft believes in:
1. **Senior-Level from Day One** - No junior mistakes
2. **Industry Standards** - Use what the best teams use
3. **Type Safety Everywhere** - Zero runtime surprises
4. **Quality by Default** - Code quality is not optional
5. **Speed Matters** - 1 minute setup, not 3 hours

---

## 🎯 Who is NextCraft for?

- ✅ **Senior Developers** who value time and quality
- ✅ **Teams** who want standardized setups
- ✅ **Agencies** building multiple projects
- ✅ **Startups** who need to move fast
- ✅ **Anyone** who wants production-ready code

---

## 📄 License

MIT © NextCraft Team

---

**🚀 Stop wasting time on setup. Start building.**
