import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            NextCraft 🎨
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </Link>
            <Link href="/examples" className="text-sm font-medium hover:text-primary transition-colors">
              Examples
            </Link>
            <a 
              href="https://github.com/ziadmustafa1/NextCraft" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/nextcraft-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
