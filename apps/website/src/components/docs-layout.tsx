import { ReactNode } from 'react'
import { DocsSidebar } from '@/components/docs-sidebar'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

interface DocsLayoutProps {
    children: ReactNode
    toc?: ReactNode // Table of contents
}

export function DocsLayout({ children, toc }: DocsLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 md:px-8 flex items-start lg:gap-10">
                {/* Sidebar - Hidden on mobile, shown on large screens */}
                <aside className="hidden lg:block w-[240px] shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4">
                    <DocsSidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 py-8">
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:border-b prose-h2:pb-2 prose-p:leading-7 prose-li:my-0">
                        {children}
                    </div>
                    <div className="mt-20">
                        <Footer />
                    </div>
                </main>

                {/* Right Sidebar (TOC) - Optional */}
                {toc && (
                    <aside className="hidden xl:block w-[200px] shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pl-4">
                        <div className="text-sm">
                            <h4 className="font-medium mb-4 text-foreground">On this page</h4>
                            {toc}
                        </div>
                    </aside>
                )}
            </div>
        </div>
    )
}
