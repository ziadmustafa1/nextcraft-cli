import Link from 'next/link'

export default function InstallationPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold">NextCraft</Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/docs/installation" className="font-semibold">Installation</Link></li>
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
          
          <main className="prose prose-slate max-w-none">
            <h1>Installation</h1>
            
            <h2>Requirements</h2>
            
            <ul>
              <li>Node.js 18.0.0 or higher</li>
              <li>npm, pnpm, or yarn</li>
            </ul>
            
            <h2>Using npx (Recommended)</h2>
            
            <p>No installation required. Run directly:</p>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app</code></pre>
            
            <h2>Global Installation</h2>
            
            <p>Install globally to use the <code>nextcraft</code> command:</p>
            
            <pre className="bg-muted p-4 rounded"><code>npm install -g nextcraft-cli</code></pre>
            
            <p>Then create projects:</p>
            
            <pre className="bg-muted p-4 rounded"><code>nextcraft my-app</code></pre>
            
            <h2>Options</h2>
            
            <pre className="bg-muted p-4 rounded text-sm"><code>{`nextcraft [project-name] [options]

Options:
  -m, --mode <mode>        Project mode (frontend|fullstack)
  --ui <framework>         UI framework (shadcn|chakra|material)
  --db <database>          Database (postgres|sqlite|mysql)
  --auth                   Include authentication
  --rtl                    Enable RTL support
  --no-seo                 Disable SEO optimization
  -y, --yes                Use default options
  -V, --version            Show version
  -h, --help               Show help`}</code></pre>
            
            <h2>Next Steps</h2>
            
            <p>Continue to <Link href="/docs/quick-start">Quick Start</Link> to create your first project.</p>
          </main>
        </div>
      </div>
    </div>
  )
}
