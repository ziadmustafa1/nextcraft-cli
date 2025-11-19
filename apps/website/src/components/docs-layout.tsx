import { ReactNode } from 'react'
import Link from 'next/link'
import { Navbar } from './navbar'
import { Footer } from './footer'

interface DocsLayoutProps {
  children: ReactNode
  toc?: ReactNode
}

export function DocsLayout({ children, toc }: DocsLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Sticky */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Getting Started</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/docs/installation" className="block py-1 text-muted-foreground hover:text-foreground transition-colors">
                      Installation
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/quick-start" className="block py-1 text-muted-foreground hover:text-foreground transition-colors">
                      Quick Start
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/docs/ui-frameworks" className="block py-1 text-muted-foreground hover:text-foreground transition-colors">
                      UI Frameworks
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/database" className="block py-1 text-muted-foreground hover:text-foreground transition-colors">
                      Database
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/authentication" className="block py-1 text-muted-foreground hover:text-foreground transition-colors">
                      Authentication
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          
          {/* Content - Flexible */}
          <main className="flex-1 min-w-0 prose prose-slate max-w-none">
            {children}
          </main>
          
          {/* Right TOC - Sticky */}
          {toc && (
            <aside className="hidden xl:block w-56 flex-shrink-0">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">On This Page</h4>
                {toc}
              </div>
            </aside>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
