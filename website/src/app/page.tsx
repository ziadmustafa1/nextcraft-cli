export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            🎨 NextCraft
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Senior-Level Next.js 16 Generator
          </p>
          <p className="mt-2 text-2xl font-semibold">
            Production-ready in 1 minute, not 3 hours
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/docs"
              className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started →
            </a>
            <a
              href="https://github.com/yourusername/nextcraft"
              className="rounded-lg border border-input bg-background px-8 py-3 text-lg font-semibold hover:bg-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12">
            37+ Industry-Standard Packages
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">⚡ Latest Stack</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Next.js 16.0.1 + React 19.2</li>
                <li>✅ TypeScript 5.7 Strict Mode</li>
                <li>✅ TailwindCSS 4</li>
                <li>✅ Turbopack (10× faster)</li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">📦 Senior Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ TanStack Query 5.60</li>
                <li>✅ Zustand 5.0</li>
                <li>✅ React Hook Form + Zod</li>
                <li>✅ Framer Motion 11</li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">🔧 Quality Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ ESLint 9 + Prettier</li>
                <li>✅ Vitest + Testing Library</li>
                <li>✅ Husky + Git Hooks</li>
                <li>✅ GitHub Actions CI/CD</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center text-3xl font-bold mb-8">
            Get Started in 60 Seconds
          </h2>
          
          <div className="rounded-lg border bg-card p-8">
            <pre className="bg-muted p-4 rounded overflow-x-auto">
              <code className="text-sm">npx create-nextcraft-app my-app</code>
            </pre>
            
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">🎨 Frontend Mode</h4>
                <p className="text-sm text-muted-foreground">
                  UI + Server Actions + All quality tools configured
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">🗄️ Fullstack Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Frontend + Database (Prisma) + API + Auth (Auth.js)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold">37+</div>
              <div className="text-sm text-muted-foreground mt-2">Packages Installed</div>
            </div>
            <div>
              <div className="text-4xl font-bold">&lt;1 min</div>
              <div className="text-sm text-muted-foreground mt-2">Setup Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold">$300</div>
              <div className="text-sm text-muted-foreground mt-2">Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop wasting 3 hours on configuration. Start building with production-ready code.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/docs/getting-started/installation"
              className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Read Documentation →
            </a>
            <a
              href="/comparison"
              className="rounded-lg border border-input px-8 py-3 text-lg font-semibold hover:bg-accent transition-colors"
            >
              vs create-next-app
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
