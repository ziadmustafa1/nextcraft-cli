import path from 'path';
import { ensureDir, writeFile } from '../utils/fs-utils';
import { logger } from '../utils/logger';
import {
  serverActionsTemplate,
  cacheUtilitiesTemplate,
  useOptimisticTemplate,
  useActionStateTemplate,
  serverOnlyTemplate,
  clientOnlyTemplate,
} from '../templates/next16-actions';

/**
 * Next.js 16 Smart Setup
 * Adds Next.js 16 specific features and utilities
 */
export class Next16Setup {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  /**
   * Setup all Next.js 16 features
   */
  async setupAll(): Promise<void> {
    logger.info('Setting up Next.js 16 features...');

    await this.createActionsDirectory();
    await this.createLibUtilities();
    await this.createExampleComponents();
    await this.createDocumentation();

    logger.success('✓ Next.js 16 features configured');
  }

  /**
   * Create Server Actions directory with examples
   */
  private async createActionsDirectory(): Promise<void> {
    const actionsDir = path.join(this.projectPath, 'src', 'app', 'actions');
    await ensureDir(actionsDir);

    // Main actions file
    await writeFile(
      path.join(actionsDir, 'index.ts'),
      serverActionsTemplate
    );

    logger.info('✓ Server Actions created');
  }

  /**
   * Create lib utilities for Next.js 16
   */
  private async createLibUtilities(): Promise<void> {
    const libDir = path.join(this.projectPath, 'src', 'lib');

    // Cache utilities
    await writeFile(
      path.join(libDir, 'cache.ts'),
      cacheUtilitiesTemplate
    );

    // Server-only utilities
    await writeFile(
      path.join(libDir, 'server-utils.ts'),
      serverOnlyTemplate
    );

    // Client-only utilities
    await writeFile(
      path.join(libDir, 'client-utils.ts'),
      clientOnlyTemplate
    );

    logger.info('✓ Utility files created');
  }

  /**
   * Create example components showcasing Next.js 16 features
   */
  private async createExampleComponents(): Promise<void> {
    const componentsDir = path.join(this.projectPath, 'src', 'components', 'examples');
    await ensureDir(componentsDir);

    // Optimistic UI example
    await writeFile(
      path.join(componentsDir, 'optimistic-list.tsx'),
      useOptimisticTemplate
    );

    // useActionState example
    await writeFile(
      path.join(componentsDir, 'login-form.tsx'),
      useActionStateTemplate
    );

    // Note: Async page example removed due to cacheComponents compatibility
    // The async-page example conflicts with cacheComponents setting
    // Users can create their own async pages as needed

    logger.info('✓ Example components created');
  }

  /**
   * Create documentation for Next.js 16 features
   */
  private async createDocumentation(): Promise<void> {
    const readme = `# Next.js 16 Features in This Project

## 🚀 Quick Start

This project uses **Next.js 16** with **React 19** for the best performance and developer experience.

### Key Features:

1. **Turbopack** - 10× faster dev builds
2. **Partial Prerendering (PPR)** - Mix static & dynamic
3. **Server Actions** - Direct server mutations
4. **Async APIs** - Modern request handling
5. **Enhanced Caching** - Smart cache control

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── actions/          # Server Actions
│   │   └── index.ts      # Form actions, mutations
│   ├── (examples)/       # Example pages
│   └── layout.tsx        # Async layout with cookies/headers
├── components/
│   └── examples/         # Next.js 16 examples
│       ├── optimistic-list.tsx   # useOptimistic hook
│       └── login-form.tsx        # useActionState hook
└── lib/
    ├── cache.ts          # Caching utilities
    ├── server-utils.ts   # Server-only code
    └── client-utils.ts   # Client-only code
\`\`\`

## 🎯 Usage Examples

### Server Actions

\`\`\`typescript
// app/actions/index.ts
'use server'

export async function createItem(formData: FormData) {
  const name = formData.get('name')
  // Save to database
  revalidatePath('/items')
}

// app/page.tsx
import { createItem } from './actions'

export default function Page() {
  return (
    <form action={createItem}>
      <input name="name" required />
      <button>Create</button>
    </form>
  )
}
\`\`\`

### Async Page (Next.js 16)

\`\`\`typescript
export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ q: string }>
}) {
  const { id } = await params
  const { q } = await searchParams
  
  return <div>ID: {id}, Query: {q}</div>
}
\`\`\`

### Caching with Tags

\`\`\`typescript
'use cache'
import { cacheLife, cacheTag } from 'next/cache'

export async function getData(id: string) {
  cacheLife('hours')
  cacheTag('data', \`data-\${id}\`)
  
  return await fetch(\`/api/data/\${id}\`)
}

// Invalidate from Server Action:
import { revalidateTag } from 'next/cache'

export async function updateData(id: string) {
  // Update logic
  revalidateTag(\`data-\${id}\`)
}
\`\`\`

### Optimistic UI

\`\`\`typescript
'use client'
import { useOptimistic } from 'react'

export function TodoList({ todos }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  )
  
  return (
    <form action={async (formData) => {
      const todo = formData.get('todo')
      addOptimistic({ text: todo })
      await createTodo(todo)
    }}>
      {optimisticTodos.map(todo => <div>{todo.text}</div>)}
    </form>
  )
}
\`\`\`

## ⚙️ Configuration

See \`next.config.ts\` for:
- Partial Prerendering (PPR)
- React Compiler
- Turbopack settings
- Image optimization
- Security headers

## 📚 Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Features](https://react.dev/blog)
- [Turbopack](https://turbo.build/pack)

---

**Generated by NextCraft 💎**
`;

    await writeFile(
      path.join(this.projectPath, 'NEXTJS_16.md'),
      readme
    );

    logger.info('✓ Documentation created');
  }

  /**
   * Add development script with Turbopack
   */
  async updatePackageScripts(packageJsonPath: string): Promise<void> {
    const fs = await import('fs-extra');
    const packageJson = await fs.readJson(packageJsonPath);

    // Update scripts for Next.js 16
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'next dev --turbo',
      'dev:debug': 'next dev --turbo --show-all',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'type-check': 'tsc --noEmit',
    };

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    logger.info('✓ Package scripts updated for Next.js 16');
  }
}

/**
 * Helper function to setup Next.js 16 features
 */
export async function setupNext16Features(projectPath: string): Promise<void> {
  const setup = new Next16Setup(projectPath);
  await setup.setupAll();
  
  // Update package.json scripts
  const packageJsonPath = path.join(projectPath, 'package.json');
  await setup.updatePackageScripts(packageJsonPath);
}
