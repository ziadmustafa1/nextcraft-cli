import Link from 'next/link'
import { Github, Menu } from 'lucide-react'
import { Logo } from '@/components/logo'

export function Navbar() {
  return (
    <nav className="sticky top-2 z-50 border border-white/10 bg-background/60 backdrop-blur-xl rounded-2xl supports-[backdrop-filter]:bg-background/60 w-[90%] mx-auto px-4">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              <Logo className="h-8 w-8" />
              <span>NextCraft</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/examples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ziadmustafa1/NextCraft"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>

            <a
              href="https://www.npmjs.com/package/nextcraft-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </a>

            <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
