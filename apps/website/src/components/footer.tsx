import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <Logo className="h-8 w-8" />
              NextCraft
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The modern CLI for building production-ready Next.js applications. Ship faster with best practices built-in.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/ziadmustafa1/NextCraft" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/docs/installation" className="hover:text-primary transition-colors">Installation</Link></li>
              <li><Link href="/docs/quick-start" className="hover:text-primary transition-colors">Quick Start</Link></li>
              <li><Link href="/docs/cli" className="hover:text-primary transition-colors">CLI Commands</Link></li>
              <li><Link href="/docs/ui-frameworks" className="hover:text-primary transition-colors">UI Components</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/examples" className="hover:text-primary transition-colors">Examples</Link></li>
              <li><Link href="/docs/authentication" className="hover:text-primary transition-colors">Authentication</Link></li>
              <li><Link href="/docs/database" className="hover:text-primary transition-colors">Database</Link></li>
              <li><a href="https://www.npmjs.com/package/nextcraft-cli" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">NPM Package</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Community</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="https://github.com/ziadmustafa1/NextCraft" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="https://github.com/ziadmustafa1/NextCraft/issues" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Report an Issue</a></li>
              <li><a href="https://github.com/ziadmustafa1/NextCraft/discussions" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Discussions</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 NextCraft. All rights reserved.</p>
          <p>Built with ❤️ by <a href="https://github.com/ziadmustafa1" className="hover:text-white transition-colors">Ziad Mustafa</a></p>
        </div>
      </div>
    </footer>
  )
}
