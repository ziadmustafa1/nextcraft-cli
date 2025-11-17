import Link from 'next/link'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function DocsPage() {
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/docs/installation" className="text-muted-foreground hover:text-foreground">Installation</Link></li>
                <li><Link href="/docs/quick-start" className="text-muted-foreground hover:text-foreground">Quick Start</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/docs/ui-frameworks" className="text-muted-foreground hover:text-foreground">UI Frameworks</Link></li>
                <li><Link href="/docs/database" className="text-muted-foreground hover:text-foreground">Database</Link></li>
                <li><Link href="/docs/authentication" className="text-muted-foreground hover:text-foreground">Authentication</Link></li>
              </ul>
            </div>
          </aside>
          
          {/* Content */}
          <main className="prose prose-slate max-w-none">
            <h1>Documentation</h1>
            
            <p>Welcome to NextCraft documentation. Get started building production-ready Next.js applications.</p>
            
            <h2>Quick Start</h2>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app</code></pre>
            
            <h2>What is NextCraft?</h2>
            
            <p>NextCraft is a smart CLI tool that generates production-ready Next.js 16 projects with:</p>
            
            <ul>
              <li>Latest Next.js 16 + React 19</li>
              <li>TypeScript strict mode</li>
              <li>TailwindCSS 4</li>
              <li>Multiple UI frameworks (Shadcn, Chakra, Material-UI)</li>
              <li>Database support (PostgreSQL, MySQL, SQLite)</li>
              <li>Authentication ready</li>
              <li>Testing setup (Vitest)</li>
              <li>ESLint + Prettier</li>
              <li>Git hooks with Husky</li>
            </ul>
            
            <h2>Next Steps</h2>
            
            <ul>
              <li><Link href="/docs/installation">Installation Guide</Link></li>
              <li><Link href="/docs/quick-start">Quick Start Tutorial</Link></li>
              <li><Link href="/docs/ui-frameworks">Choose Your UI Framework</Link></li>
            </ul>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
