import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            🎨 NextCraft
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Smart Next.js Project Generator
          </p>
          <p className="mt-2 text-2xl font-semibold">
            Production-ready in 1 minute
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.npmjs.com/package/nextcraft-cli"
              className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started →
            </a>
            <a
              href="https://github.com/ziadmustafa1/NextCraft"
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
            Features
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">⚡ Latest Stack</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Next.js 16 + React 19</li>
                <li>✅ TypeScript Strict Mode</li>
                <li>✅ TailwindCSS 4</li>
                <li>✅ Turbopack</li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">📦 Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ TanStack Query</li>
                <li>✅ Zustand</li>
                <li>✅ React Hook Form + Zod</li>
                <li>✅ Framer Motion</li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">🔧 Quality</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ ESLint + Prettier</li>
                <li>✅ Vitest + Testing Library</li>
                <li>✅ Husky + Git Hooks</li>
                <li>✅ GitHub Actions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center text-3xl font-bold mb-8">
            Quick Start
          </h2>
          
          <div className="rounded-lg border bg-card p-8">
            <pre className="bg-muted p-4 rounded overflow-x-auto">
              <code className="text-sm">npx nextcraft-cli my-app</code>
            </pre>
            
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">🎨 Frontend Mode</h4>
                <p className="text-sm text-muted-foreground">
                  UI + Server Actions + Quality tools
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">🗄️ Fullstack Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Frontend + Database + API + Auth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start building with production-ready code
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.npmjs.com/package/nextcraft-cli"
              className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              View on npm →
            </a>
            <a
              href="https://github.com/ziadmustafa1/NextCraft"
              className="rounded-lg border border-input px-8 py-3 text-lg font-semibold hover:bg-accent transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}
