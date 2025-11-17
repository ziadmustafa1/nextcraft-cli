import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function ExamplesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Examples</h1>
            <p className="text-xl text-muted-foreground">
              See what you can build with NextCraft
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* Frontend Example */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Frontend
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Landing Page</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Modern landing page with Shadcn UI, animations, and SEO
              </p>
              <pre className="bg-muted p-3 rounded text-xs mb-4"><code>npx nextcraft-cli landing --ui shadcn</code></pre>
              <div className="flex gap-2">
                <a href="https://github.com/ziadmustafa1/NextCraft/tree/main/examples/landing" className="text-sm text-primary hover:underline">
                  View Code →
                </a>
              </div>
            </div>
            
            {/* Fullstack Example */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                  Fullstack
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Blog Platform</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Full blog with PostgreSQL, Auth.js, and admin panel
              </p>
              <pre className="bg-muted p-3 rounded text-xs mb-4"><code>npx nextcraft-cli blog --mode fullstack --db postgres --auth</code></pre>
              <div className="flex gap-2">
                <a href="https://github.com/ziadmustafa1/NextCraft/tree/main/examples/blog" className="text-sm text-primary hover:underline">
                  View Code →
                </a>
              </div>
            </div>
            
            {/* E-commerce Example */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Fullstack
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Online store with cart, checkout, and payment integration
              </p>
              <pre className="bg-muted p-3 rounded text-xs mb-4"><code>npx nextcraft-cli shop --mode fullstack --db postgres --auth</code></pre>
              <div className="flex gap-2">
                <a href="https://github.com/ziadmustafa1/NextCraft/tree/main/examples/shop" className="text-sm text-primary hover:underline">
                  View Code →
                </a>
              </div>
            </div>
            
            {/* Dashboard Example */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                  Fullstack
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Analytics dashboard with charts and data tables
              </p>
              <pre className="bg-muted p-3 rounded text-xs mb-4"><code>npx nextcraft-cli dashboard --mode fullstack --ui shadcn --auth</code></pre>
              <div className="flex gap-2">
                <a href="https://github.com/ziadmustafa1/NextCraft/tree/main/examples/dashboard" className="text-sm text-primary hover:underline">
                  View Code →
                </a>
              </div>
            </div>
            
            {/* SaaS Example */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-800">
                  Fullstack
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">SaaS Starter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete SaaS with subscriptions, billing, and teams
              </p>
              <pre className="bg-muted p-3 rounded text-xs mb-4"><code>npx nextcraft-cli saas --mode fullstack --db postgres --auth</code></pre>
              <div className="flex gap-2">
                <a href="https://github.com/ziadmustafa1/NextCraft/tree/main/examples/saas" className="text-sm text-primary hover:underline">
                  View Code →
                </a>
              </div>
            </div>
            
            {/* Portfolio Example */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">
                  Frontend
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Personal portfolio with projects showcase and contact form
              </p>
              <pre className="bg-muted p-3 rounded text-xs mb-4"><code>npx nextcraft-cli portfolio --ui shadcn</code></pre>
              <div className="flex gap-2">
                <a href="https://github.com/ziadmustafa1/NextCraft/tree/main/examples/portfolio" className="text-sm text-primary hover:underline">
                  View Code →
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <Link 
              href="/docs/quick-start"
              className="inline-block rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
