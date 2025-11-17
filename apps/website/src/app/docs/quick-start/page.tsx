import Link from 'next/link'

export default function QuickStartPage() {
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
                <li><Link href="/docs/installation" className="text-muted-foreground hover:text-foreground">Installation</Link></li>
                <li><Link href="/docs/quick-start" className="font-semibold">Quick Start</Link></li>
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
            <h1>Quick Start</h1>
            
            <h2>Create Your First Project</h2>
            
            <p>Run the CLI and follow the interactive prompts:</p>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app</code></pre>
            
            <p>You'll be asked:</p>
            
            <ol>
              <li><strong>Project mode</strong>: frontend or fullstack</li>
              <li><strong>UI framework</strong>: shadcn, chakra, or material</li>
              <li><strong>Database</strong>: postgres, mysql, or sqlite (fullstack only)</li>
              <li><strong>Authentication</strong>: yes or no</li>
              <li><strong>RTL support</strong>: yes or no</li>
              <li><strong>SEO optimization</strong>: yes or no</li>
            </ol>
            
            <h2>Non-Interactive Mode</h2>
            
            <p>Skip prompts with command-line options:</p>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --mode frontend --ui shadcn -y</code></pre>
            
            <h2>Start Development</h2>
            
            <pre className="bg-muted p-4 rounded"><code>{`cd my-app
npm run dev`}</code></pre>
            
            <p>Open <a href="http://localhost:3000">http://localhost:3000</a></p>
            
            <h2>Project Structure</h2>
            
            <pre className="bg-muted p-4 rounded text-sm"><code>{`my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── actions/
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   └── hooks/
├── public/
├── package.json
├── next.config.ts
└── tailwind.config.js`}</code></pre>
            
            <h2>Next Steps</h2>
            
            <ul>
              <li><Link href="/docs/ui-frameworks">Explore UI Frameworks</Link></li>
              <li><Link href="/docs/database">Setup Database</Link></li>
              <li><Link href="/docs/authentication">Add Authentication</Link></li>
            </ul>
          </main>
        </div>
      </div>
    </div>
  )
}
