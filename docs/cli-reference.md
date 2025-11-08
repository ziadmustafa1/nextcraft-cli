# CLI Reference

## create-nextcraft-app

Create a new NextCraft project.

### Usage

```bash
npx create-nextcraft-app [project-name] [options]
```

### Options

- `-m, --mode <mode>` - Project mode (frontend|fullstack)
- `--ui <framework>` - UI framework (shadcn|chakra|material)
- `--db <database>` - Database (postgres|sqlite|mysql)
- `--auth` - Include authentication
- `--rtl` - Enable RTL support
- `--no-seo` - Disable SEO optimization
- `-V, --version` - Output version number
- `-h, --help` - Display help

### Examples

```bash
# Interactive mode (recommended)
npx create-nextcraft-app my-app

# Frontend with Shadcn UI
npx create-nextcraft-app my-app --mode frontend --ui shadcn

# Fullstack with PostgreSQL and Auth
npx create-nextcraft-app my-app --mode fullstack --db postgres --auth

# RTL support
npx create-nextcraft-app my-app --rtl
```

## forge

Project management tool for NextCraft projects.

### Commands

#### `forge add <module>`

Add a module to your project.

```bash
forge add auth
forge add users
forge add blog
forge add admin
```

Available modules:
- `auth` - Authentication with Auth.js
- `users` - User management
- `blog` - Blog with Markdown support
- `admin` - Admin dashboard
- `dashboard` - Analytics dashboard
- `payments` - Payment integration

#### `forge dev`

Start the development server.

```bash
forge dev
```

Equivalent to `npm run dev` or `pnpm dev`.

#### `forge build`

Build the project for production.

```bash
forge build
```

#### `forge deploy`

Deploy to hosting platform (Coming soon).

```bash
forge deploy
```

#### `forge doctor`

Check project health and configuration.

```bash
forge doctor
```

Checks for:
- Required configuration files
- Dependencies
- Database connection (if applicable)
- Environment variables

### Examples

```bash
# Add authentication to existing project
cd my-app
forge add auth

# Start development
forge dev

# Check project health
forge doctor

# Build for production
forge build
```

## Tips

1. **Use Interactive Mode**: When unsure, run without flags for guided setup
2. **Check Before Deploy**: Always run `forge doctor` before deployment
3. **Module Order**: Add auth module before user-related modules
4. **Database Setup**: For fullstack, ensure database is running before `forge dev`
