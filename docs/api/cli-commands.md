# 🔧 CLI Commands Reference

## Overview

NextCraft CLI provides a powerful command-line interface for creating and managing Next.js projects.

---

## Installation

```bash
npx create-nextcraft-app [project-name] [options]
```

---

## Commands

### `create-nextcraft-app`

Create a new NextCraft project.

#### Basic Usage

```bash
# Interactive mode (default)
npx create-nextcraft-app my-app

# With project name
npx create-nextcraft-app my-awesome-project

# Non-interactive with defaults
npx create-nextcraft-app my-app --yes
```

---

## Options

### `--mode <mode>`

Specify the project mode.

**Values**: `frontend` | `fullstack`

```bash
npx create-nextcraft-app my-app --mode frontend
npx create-nextcraft-app my-app --mode fullstack
```

**Default**: Interactive prompt (or `frontend` with `--yes`)

---

### `--ui <framework>`

Choose UI framework.

**Values**: `shadcn` | `chakra` | `material`

```bash
npx create-nextcraft-app my-app --ui shadcn
npx create-nextcraft-app my-app --ui chakra
npx create-nextcraft-app my-app --ui material
```

**Default**: Interactive prompt (or `shadcn` with `--yes`)

---

### `--db <database>`

Select database (fullstack only).

**Values**: `postgres` | `sqlite` | `mysql`

```bash
npx create-nextcraft-app my-app --mode fullstack --db postgres
npx create-nextcraft-app my-app --mode fullstack --db sqlite
```

**Default**: Interactive prompt (or `sqlite` with `--yes`)

---

### `--auth`

Enable authentication with Auth.js.

```bash
npx create-nextcraft-app my-app --auth
```

**Default**: `false`

---

### `--rtl`

Enable Right-to-Left (RTL) support.

```bash
npx create-nextcraft-app my-app --rtl
```

**Default**: `false`

**Use case**: Arabic, Hebrew, Persian languages

---

### `--no-seo`

Disable SEO optimization.

```bash
npx create-nextcraft-app my-app --no-seo
```

**Default**: SEO is enabled by default

---

### `-y, --yes`

Skip all prompts and use defaults.

```bash
npx create-nextcraft-app my-app --yes
```

**Perfect for**:
- CI/CD pipelines
- Automated scripts
- Quick prototyping

---

### `-V, --version`

Display version number.

```bash
create-nextcraft-app --version
```

---

### `-h, --help`

Display help information.

```bash
create-nextcraft-app --help
```

---

## Examples

### Frontend Project with Defaults

```bash
npx create-nextcraft-app my-frontend-app --yes
```

**Creates**:
- Frontend mode
- Shadcn UI
- No auth
- No RTL
- SEO enabled

---

### Fullstack with PostgreSQL & Auth

```bash
npx create-nextcraft-app my-fullstack-app \
  --mode fullstack \
  --ui shadcn \
  --db postgres \
  --auth \
  --yes
```

**Creates**:
- Fullstack mode
- Shadcn UI
- PostgreSQL database
- Auth.js authentication
- SEO enabled

---

### RTL-Enabled Project

```bash
npx create-nextcraft-app arabic-website \
  --mode frontend \
  --ui shadcn \
  --rtl \
  --yes
```

**Perfect for**: Arabic, Hebrew, Persian websites

---

### Material UI without SEO

```bash
npx create-nextcraft-app simple-app \
  --ui material \
  --no-seo \
  --yes
```

---

## Interactive Mode

When you run without `--yes`, you'll get interactive prompts:

```
🎨 Welcome to NextCraft

? What is your project name? › my-app
? Select project mode › 
  ❯ Frontend (UI + Server Actions)
    Fullstack (Frontend + Database + API)
    
? Select UI framework ›
  ❯ Shadcn UI (Recommended)
    Chakra UI
    Material UI

? Select database (fullstack only) ›
  ❯ PostgreSQL
    SQLite (for development)
    MySQL

? Enable authentication? › No / Yes
? Enable RTL support? › No / Yes
? Enable SEO optimization? › Yes / No
```

---

## Environment Variables

After creation, update `.env` (fullstack):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Auth.js (if --auth enabled)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# OAuth Providers (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

---

## Generated Scripts

Every project comes with these npm scripts:

```json
{
  "dev": "next dev --turbo",           // Start dev server
  "build": "next build",               // Build for production
  "start": "next start",               // Start production server
  "lint": "eslint . --max-warnings 0", // Lint code
  "lint:fix": "eslint . --fix",        // Fix lint errors
  "format": "prettier --write",        // Format code
  "typecheck": "tsc --noEmit",         // Check types
  "test": "vitest run",                // Run tests
  "test:watch": "vitest",              // Watch mode
  "test:coverage": "vitest --coverage", // Coverage report
  "validate": "lint && typecheck && test" // Run all checks
}
```

---

## Exit Codes

- `0` - Success
- `1` - Error (invalid options, network issues, etc.)

---

## Tips

### 1. Use Aliases

```bash
# Create alias in ~/.bashrc or ~/.zshrc
alias ncapp="npx create-nextcraft-app"

# Usage
ncapp my-new-app --yes
```

### 2. Default Options File

Create `~/.nextcraftrc`:

```json
{
  "mode": "frontend",
  "ui": "shadcn",
  "seo": true
}
```

### 3. CI/CD Integration

```yaml
# .github/workflows/create-project.yml
- name: Create NextCraft project
  run: |
    npx create-nextcraft-app test-app \
      --mode frontend \
      --yes
    
    cd test-app
    pnpm build
```

---

## Troubleshooting

### "Command not found"

**Solution**: Ensure Node.js v18.17+ is installed

```bash
node --version  # Should be v18.17+
```

### "Permission denied"

**Solution**: Don't use `sudo` with npm

```bash
# Fix permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

### "Network timeout"

**Solution**: Use different registry

```bash
npm config set registry https://registry.npmjs.org/
```

---

## Next Steps

- [📁 Project Structure](../getting-started/project-structure.md)
- [⚙️ Configuration](../configuration.md)
- [🚀 Deployment](../deployment.md)
