# Getting Started with NextCraft

## Installation

You don't need to install NextCraft globally. Use it directly with npx:

```bash
npx create-nextcraft-app my-app
```

Or with other package managers:

```bash
# pnpm
pnpm dlx create-nextcraft-app my-app

# yarn
yarn create nextcraft-app my-app

# bun
bunx create-nextcraft-app my-app
```

## Interactive Setup

NextCraft will guide you through an interactive setup:

1. **Project Mode**: Choose between Frontend or Fullstack
2. **UI Framework**: Select your preferred UI library (Shadcn UI recommended)
3. **Database**: (Fullstack only) Choose your database
4. **Features**: Enable authentication, RTL, SEO, etc.
5. **Modules**: Add pre-built modules

## Project Structure

### Frontend Mode

```
my-app/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   │   ├── api-client.ts # API client
│   │   └── utils.ts      # Helper functions
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── public/               # Static files
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

### Fullstack Mode

Includes everything from Frontend mode, plus:

```
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── app/
│   │   └── api/          # API routes
│   │       ├── auth/     # Authentication
│   │       ├── users/    # User management
│   │       └── health/   # Health check
│   └── lib/
│       ├── db/           # Database utilities
│       │   └── prisma.ts # Prisma client
│       └── auth/         # Auth configuration
└── .env                  # Environment variables
```

## First Steps

After creating your project:

```bash
cd my-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Next Steps

- [Configuration Guide](./configuration.md) - Learn about nextcraft.config.ts
- [CLI Reference](./cli-reference.md) - Explore available commands
- [Adding Modules](./modules.md) - Extend your project with modules
