import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-4">NextCraft</h3>
            <p className="text-sm text-muted-foreground">
              Smart Next.js project generator
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Docs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs/installation" className="text-muted-foreground hover:text-foreground">Installation</Link></li>
              <li><Link href="/docs/quick-start" className="text-muted-foreground hover:text-foreground">Quick Start</Link></li>
              <li><Link href="/docs/ui-frameworks" className="text-muted-foreground hover:text-foreground">UI Frameworks</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/examples" className="text-muted-foreground hover:text-foreground">Examples</Link></li>
              <li><a href="https://github.com/ziadmustafa1/NextCraft" className="text-muted-foreground hover:text-foreground">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/nextcraft-cli" className="text-muted-foreground hover:text-foreground">npm</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/ziadmustafa1/NextCraft/issues" className="text-muted-foreground hover:text-foreground">Issues</a></li>
              <li><a href="https://github.com/ziadmustafa1/NextCraft/discussions" className="text-muted-foreground hover:text-foreground">Discussions</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Built with NextCraft 💎 | MIT License</p>
        </div>
      </div>
    </footer>
  )
}
