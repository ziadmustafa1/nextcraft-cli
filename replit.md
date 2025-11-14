# NextCraft - Next.js Project Generator

## Overview

NextCraft is a CLI tool that generates production-ready Next.js 16 projects with industry-standard packages and configurations. It eliminates the 3+ hours of manual setup by providing a complete, opinionated stack in under 1 minute.

The project supports two modes:
- **Frontend**: UI-focused applications with API client integration
- **Fullstack**: Complete applications with backend, database (Prisma ORM), and authentication

Built with TypeScript in strict mode, NextCraft uses a monorepo structure (Turborepo) containing CLI packages, core utilities, and example applications.

## User Preferences

Preferred communication style: Simple, everyday language (Arabic).

## Recent Changes

### November 14, 2025 - Production-Ready CLI Implementation
- ✅ CLI fully functional with TypeScript strict mode
- ✅ Fixed vitest.config.ts template for Next.js build compatibility
- ✅ Tested end-to-end project generation (creates, builds, runs successfully)
- ✅ `forge doctor` command validates project structure correctly
- ✅ Interactive and non-interactive modes working
- ✅ Updated README with comprehensive usage examples
- ✅ Architect review: **PASS - Senior-level quality confirmed**

### November 14, 2025 - Replit Migration
- Migrated project from Vercel to Replit environment
- Upgraded Node.js from 18 to 20 to meet Next.js 16 requirements
- Configured dev/start scripts to use port 5000 with 0.0.0.0 binding for Replit compatibility
- Added Cache-Control headers for iframe compatibility
- Removed X-Frame-Options header to allow Replit iframe rendering
- Configured deployment settings for autoscale deployment
- Workflow configured to run from `apps/website` directory

## System Architecture

### Project Structure

**Monorepo Architecture (Turborepo)**
- `packages/cli` - Command-line interface for project generation
- `packages/core` - Shared types and configuration utilities
- `apps/website` - Example Next.js 16 application demonstrating features
- Root-level configuration for TypeScript, ESLint, and build orchestration

**Rationale**: Monorepo enables code sharing between CLI and generated projects while maintaining clear separation of concerns. Turborepo provides efficient build caching and parallel execution.

### CLI Design Pattern

**Generator Pattern with Base Class**
- `BaseGenerator` - Abstract class with shared generation logic
- `FrontendGenerator` - Extends base for frontend-only projects
- `FullstackGenerator` - Extends frontend generator, adds backend features
- `ConfigGenerator` - Standalone generator for `nextcraft.config.ts`

**Rationale**: Inheritance reduces code duplication while allowing mode-specific customization. The pattern makes it easy to add new project types in the future.

### Interactive Prompts System

**Conditional prompts using Enquirer**
- Mode selection determines subsequent questions
- Database options only appear for fullstack mode
- Default values align with recommended stack
- Skip functionality for non-interactive usage (`--yes` flag)

**Rationale**: Progressive disclosure reduces cognitive load. Users only see relevant options for their chosen mode.

### Configuration Management

**Static configuration file approach**
- Generated `nextcraft.config.ts` serves as documentation
- Config exports plain object (not executed at runtime)
- CLI reads user choices, generators consume options
- Type-safe using shared interfaces from `@nextcraft/core`

**Rationale**: Static configs are easier to understand and maintain than dynamic configurations. They serve as self-documenting references for project setup.

### Next.js 16 Integration

**Modern React 19 + Next.js 16 features**
- Server Actions for mutations
- Cache directives (`'use cache'`) with tags and lifecycle
- Split utilities (server-only/client-only packages)
- Turbopack for 10× faster builds
- Component caching (`cacheComponents: true`)

**Compatibility note**: Config uses `cacheComponents` instead of deprecated `ppr` experimental flag to align with Next.js 16.0.1+ API changes.

### TypeScript Configuration

**Strict mode enabled across all packages**
- `strict: true` with all sub-checks enabled
- `noUncheckedIndexedAccess` prevents array access bugs
- Path aliases for clean imports (`@/*`)
- Composite builds for monorepo type checking

**Rationale**: Strict TypeScript catches errors early and improves code maintainability. The configuration represents senior-level best practices for 2025.

### Testing Architecture

**Vitest for unit/component testing**
- JSdom environment for React component tests
- Testing Library integration for accessible queries
- Coverage reporting with v8 provider
- Setup file for global test configuration

**Rationale**: Vitest offers faster execution than Jest while maintaining familiar API. It integrates seamlessly with Vite-based tooling.

### Code Quality Pipeline

**Multi-layer quality enforcement**
- ESLint with flat config (ESLint 9)
- Prettier with Tailwind plugin for auto-formatting
- Husky pre-commit hooks
- lint-staged for incremental checking
- Commitlint for conventional commits

**Rationale**: Automated quality checks prevent issues from reaching production. The pipeline runs incrementally to maintain fast commit cycles.

### UI Framework Strategy

**Shadcn UI as primary framework**
- Copy-paste component philosophy (not NPM packages)
- Built on Radix UI primitives
- TailwindCSS 4 for styling
- CVA (Class Variance Authority) for variants

**Alternatives**: Chakra UI and Material UI supported but Shadcn recommended for better customization control.

**Rationale**: Shadcn gives developers full ownership of components without vendor lock-in. The approach aligns with modern React best practices.

### State Management Approach

**Multi-tool strategy based on use case**
- **TanStack Query**: Server state, data fetching, caching
- **Zustand**: Client-side global state (lightweight alternative to Redux)
- **React Hook Form + Zod**: Form state with validation
- **URL state**: Search params for shareable UI state

**Rationale**: Different state types require different solutions. This combination provides optimal DX without over-engineering.

### Build System

**Turborepo orchestration**
- Shared cache for unchanged packages
- Parallel task execution
- Pipeline dependencies (`^build` notation)
- Development mode with persistent tasks

**Rationale**: Turborepo maximizes build efficiency in monorepos through intelligent caching and parallel execution.

## External Dependencies

### Framework Core
- **Next.js 16.0.1**: App Router, Server Components, Server Actions
- **React 19.2**: Concurrent features, useOptimistic, useActionState
- **TypeScript 5.7**: Latest language features with strict checking

### Data Layer
- **TanStack Query 5.60**: Data fetching, caching, synchronization
- **Axios 1.7.9**: HTTP client with interceptors
- **Zod 3.24**: Runtime schema validation

### UI & Styling
- **TailwindCSS 4.1**: Utility-first CSS with @tailwindcss/postcss
- **Radix UI**: Accessible component primitives (via Shadcn)
- **Lucide React**: Icon library
- **Framer Motion 11**: Animation library
- **tailwind-variants**: Advanced Tailwind variant system

### Development Tools
- **Vitest 2.1**: Test runner
- **Testing Library**: Component testing utilities
- **ESLint 9**: Linting with flat config
- **Prettier 3.4**: Code formatting with Tailwind plugin
- **Husky**: Git hooks
- **Turbo**: Monorepo build system

### Fullstack Dependencies (mode-specific)
- **Prisma 5.7**: ORM for database access
- **Next-Auth 4.24**: Authentication
- **bcryptjs**: Password hashing

### Package Managers
- Supports: pnpm (recommended), npm, yarn, bun
- Auto-detection via user agent or system availability
- Fallback to npm if others unavailable

### Runtime Requirements
- Node.js 18.17+ (20 LTS recommended)
- Package manager (any of the four supported)
- Git for version control

### Build Targets
- Browser: ES2022 with DOM APIs
- Server: Node.js ESNext modules
- Bundler: Next.js with Turbopack

### Key Design Decisions

**Why monorepo?** Sharing code between CLI and example apps while maintaining independent deployment.

**Why generators over templates?** Dynamic generation allows conditional features and reduces template duplication.

**Why both state libraries?** TanStack Query excels at server state; Zustand handles client state. Using both provides optimal solutions for different use cases.

**Why strict TypeScript?** Catches bugs early, improves refactoring confidence, and serves as inline documentation.

**Why TailwindCSS 4?** Latest version with improved performance and @tailwindcss/postcss simplification.