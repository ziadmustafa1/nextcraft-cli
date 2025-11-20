import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CodeBlock } from '@/components/code-block'
import { ArrowRight, Terminal, Database, Lock, Zap, Layout, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              v0.2.0 is now available
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Build Production Next.js Apps at <span className="text-primary">Warp Speed</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              The ultimate CLI for modern web development. Skip the boilerplate and start building with Authentication, Database, and UI components pre-configured.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/docs/installation"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://github.com/ziadmustafa1/NextCraft"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background/50 px-8 py-4 text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all backdrop-blur-sm"
              >
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5 fill-current">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
            </div>

            {/* Terminal Preview */}
            <div className="mt-20 mx-auto max-w-3xl text-left">
              <div className="rounded-xl border bg-card/50 backdrop-blur shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-2 text-xs text-muted-foreground font-mono">terminal</div>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-blue-400">❯</span> npx nextcraft-cli init my-app
                  </div>
                  <div className="mt-2 text-muted-foreground">
                    <span className="text-blue-400">?</span> Select your preferred language <span className="text-primary">TypeScript</span><br />
                    <span className="text-blue-400">?</span> Pick a database adapter <span className="text-primary">Prisma (PostgreSQL)</span><br />
                    <span className="text-blue-400">?</span> Initialize git repository? <span className="text-primary">Yes</span>
                  </div>
                  <div className="mt-4 text-green-400">
                    <span className="text-blue-400">✔</span> Success! Project initialized in /my-app
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-muted/30 border-t border-b">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need to ship</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                NextCraft comes batteries-included with the best tools in the React ecosystem, configured for production.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Lock className="h-8 w-8 text-blue-500" />}
                title="Authentication"
                description="Secure authentication with Auth.js v5. Pre-configured with GitHub, Google, and Email providers."
              />
              <FeatureCard
                icon={<Database className="h-8 w-8 text-emerald-500" />}
                title="Database ORM"
                description="Type-safe database access with Prisma. Support for PostgreSQL, MySQL, and SQLite out of the box."
              />
              <FeatureCard
                icon={<Layout className="h-8 w-8 text-purple-500" />}
                title="Modern UI"
                description="Beautiful, accessible components built with Radix UI and Tailwind CSS. Dark mode included."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-yellow-500" />}
                title="Performance"
                description="Built on Next.js 14 App Router with React Server Components for optimal performance."
              />
              <FeatureCard
                icon={<Terminal className="h-8 w-8 text-slate-500" />}
                title="Powerful CLI"
                description="Scaffold resources, add features, and manage your project with our intuitive CLI tool."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-8 w-8 text-pink-500" />}
                title="Code Quality"
                description="ESLint, Prettier, Husky, and TypeScript strict mode configured for rock-solid code."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to start your next project?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of developers building faster with NextCraft.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CodeBlock code="npx nextcraft-cli init my-app" language="bash" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20">
      <div className="mb-4 inline-flex rounded-lg bg-muted p-3 group-hover:bg-background transition-colors">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
