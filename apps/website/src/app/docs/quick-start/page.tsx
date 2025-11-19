import { DocsLayout } from '@/components/docs-layout'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CodeBlock } from '@/components/code-block'

export default function QuickStartPage() {
  const toc = (
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#create-project" className="hover:text-foreground transition-colors">Create Project</a></li>
      <li><a href="#development" className="hover:text-foreground transition-colors">Development</a></li>
      <li><a href="#project-structure" className="hover:text-foreground transition-colors">Project Structure</a></li>
    </ul>
  )

  return (
    <DocsLayout toc={toc}>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Quick Start</h1>
        <p className="text-lg text-muted-foreground">
          Create your first production-ready application in less than a minute.
        </p>
      </div>

      <div className="mt-10">
        <h2 id="create-project" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">1. Create Project</h2>
        <p className="leading-7 mt-6">
          Run the creation command and follow the interactive prompts:
        </p>

        <CodeBlock code="npx nextcraft-cli my-awesome-app" language="bash" />

        <p className="leading-7">
          You will be asked to choose:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Mode:</strong> Frontend-only or Fullstack</li>
          <li><strong>UI Framework:</strong> Shadcn, Chakra, or Material UI</li>
          <li><strong>Database:</strong> PostgreSQL, MySQL, or SQLite (Fullstack only)</li>
          <li><strong>Authentication:</strong> Yes/No (Fullstack only)</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 id="development" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">2. Start Development</h2>
        <p className="leading-7 mt-6">
          Navigate to your project folder and start the development server:
        </p>

        <CodeBlock code={`cd my-awesome-app\npnpm dev`} language="bash" />

        <p className="leading-7">
          Your app is now running at <code className="text-sm font-semibold">http://localhost:3000</code>.
        </p>
      </div>

      <div className="mt-10">
        <h2 id="project-structure" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">3. Project Structure</h2>
        <p className="leading-7 mt-6">
          NextCraft generates a clean, opinionated structure optimized for scale:
        </p>

        <CodeBlock code={`my-awesome-app/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/              # Utilities & helpers
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript definitions
├── public/               # Static assets
├── prisma/               # Database schema (Fullstack)
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies`} language="text" />
      </div>

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <Link href="/docs/installation" className="group flex items-center gap-2 text-sm font-medium hover:text-primary">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back: Installation
        </Link>
        <Link href="/docs/cli" className="group flex items-center gap-2 text-sm font-medium hover:text-primary">
          Next: CLI Reference
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </DocsLayout>
  )
}
