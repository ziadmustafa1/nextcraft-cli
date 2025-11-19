import Link from 'next/link'
import { DocsLayout } from '@/components/docs-layout'
import { ArrowRight, Terminal, Shield, Database, Palette } from 'lucide-react'

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Welcome to NextCraft. The modern, production-ready generator for Next.js 16 applications.
          Stop configuring, start shipping.
        </p>

        <div className="flex gap-4 pt-4">
          <Link
            href="/docs/quick-start"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Quick Start
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/docs/installation"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            Installation
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <Card
          href="/docs/installation"
          icon={<Terminal className="h-6 w-6" />}
          title="CLI Tool"
          description="Learn how to use the NextCraft CLI to scaffold new projects in seconds."
        />
        <Card
          href="/docs/ui-frameworks"
          icon={<Palette className="h-6 w-6" />}
          title="UI Frameworks"
          description="Pre-configured support for Shadcn UI, Chakra, and Material UI."
        />
        <Card
          href="/docs/database"
          icon={<Database className="h-6 w-6" />}
          title="Database & ORM"
          description="Production-ready setup for PostgreSQL, MySQL, and SQLite with Prisma."
        />
        <Card
          href="/docs/authentication"
          icon={<Shield className="h-6 w-6" />}
          title="Authentication"
          description="Secure authentication flows built-in and ready to use."
        />
      </div>

      <div className="mt-16">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Why NextCraft?
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Feature
            title="Next.js 16 Ready"
            description="Built on the latest stable version with Turbopack and Server Actions."
          />
          <Feature
            title="Type Safe"
            description="Strict TypeScript configuration with Zod validation everywhere."
          />
          <Feature
            title="Production Grade"
            description="ESLint, Prettier, Husky, and Vitest configured out of the box."
          />
        </div>
      </div>
    </DocsLayout>
  )
}

function Card({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="group relative rounded-lg border p-6 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </Link>
  )
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="font-semibold leading-none tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
