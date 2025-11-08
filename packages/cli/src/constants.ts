export const NEXTCRAFT_VERSION = '0.1.0';

export const SUPPORTED_PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const;

export const TEMPLATES = {
  FRONTEND: 'frontend',
  FULLSTACK: 'fullstack',
} as const;

export const DEFAULT_CONFIG = {
  mode: 'frontend',
  ui: 'shadcn',
  auth: false,
  rtl: false,
  seo: true,
  modules: [],
} as const;

export const AVAILABLE_MODULES = [
  'auth',
  'users',
  'blog',
  'admin',
  'dashboard',
  'payments',
] as const;

export const UI_FRAMEWORKS = {
  shadcn: {
    name: 'Shadcn UI',
    description: 'Beautifully designed components built with Radix UI and Tailwind',
    dependencies: [
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },
  chakra: {
    name: 'Chakra UI',
    description: 'Simple, modular and accessible component library',
    dependencies: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
  },
  material: {
    name: 'Material UI',
    description: 'Google\'s Material Design React components',
    dependencies: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
} as const;

export const DATABASE_PROVIDERS = {
  postgres: {
    name: 'PostgreSQL',
    url: 'postgresql://user:password@localhost:5432/dbname',
  },
  sqlite: {
    name: 'SQLite',
    url: 'file:./dev.db',
  },
  mysql: {
    name: 'MySQL',
    url: 'mysql://user:password@localhost:3306/dbname',
  },
} as const;

export const COLORS = {
  primary: '#0070f3',
  success: '#0070f3',
  error: '#ff0000',
  warning: '#ff9800',
} as const;
