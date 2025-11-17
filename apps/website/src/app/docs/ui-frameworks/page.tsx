import Link from 'next/link'

export default function UIFrameworksPage() {
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
                <li><Link href="/docs/quick-start" className="text-muted-foreground hover:text-foreground">Quick Start</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/docs/ui-frameworks" className="font-semibold">UI Frameworks</Link></li>
                <li><Link href="/docs/database" className="text-muted-foreground hover:text-foreground">Database</Link></li>
                <li><Link href="/docs/authentication" className="text-muted-foreground hover:text-foreground">Authentication</Link></li>
              </ul>
            </div>
          </aside>
          
          <main className="prose prose-slate max-w-none">
            <h1>UI Frameworks</h1>
            
            <p>NextCraft supports three popular UI frameworks. Choose based on your needs.</p>
            
            <h2>Shadcn UI (Recommended)</h2>
            
            <p>Modern, accessible components built with Radix UI and Tailwind CSS.</p>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --ui shadcn</code></pre>
            
            <h3>Features</h3>
            
            <ul>
              <li>Copy-paste components</li>
              <li>Full customization</li>
              <li>Accessible by default</li>
              <li>Dark mode support</li>
            </ul>
            
            <h2>Chakra UI</h2>
            
            <p>Simple, modular component library with great accessibility.</p>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --ui chakra</code></pre>
            
            <h3>Features</h3>
            
            <ul>
              <li>Theme customization</li>
              <li>Responsive styles</li>
              <li>Built-in dark mode</li>
              <li>Composable components</li>
            </ul>
            
            <h2>Material-UI</h2>
            
            <p>Google's Material Design implementation for React.</p>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --ui material</code></pre>
            
            <h3>Features</h3>
            
            <ul>
              <li>Material Design</li>
              <li>Rich component library</li>
              <li>Theming system</li>
              <li>Enterprise ready</li>
            </ul>
            
            <h2>Comparison</h2>
            
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Shadcn</th>
                  <th>Chakra</th>
                  <th>Material-UI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bundle Size</td>
                  <td>Small</td>
                  <td>Medium</td>
                  <td>Large</td>
                </tr>
                <tr>
                  <td>Customization</td>
                  <td>Full</td>
                  <td>High</td>
                  <td>Medium</td>
                </tr>
                <tr>
                  <td>Learning Curve</td>
                  <td>Low</td>
                  <td>Low</td>
                  <td>Medium</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  )
}
