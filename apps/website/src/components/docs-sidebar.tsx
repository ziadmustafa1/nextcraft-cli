'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const sidebarItems = [
    {
        title: 'Getting Started',
        items: [
            { href: '/docs/installation', label: 'Installation' },
            { href: '/docs/quick-start', label: 'Quick Start' },
            { href: '/docs/cli', label: 'CLI Reference' },
        ],
    },
    {
        title: 'Features',
        items: [
            { href: '/docs/ui-frameworks', label: 'UI Frameworks' },
            { href: '/docs/database', label: 'Database' },
            { href: '/docs/authentication', label: 'Authentication' },
        ],
    },
]

export function DocsSidebar() {
    const pathname = usePathname()

    return (
        <nav className="space-y-8">
            {sidebarItems.map((group) => (
                <div key={group.title}>
                    <h3 className="font-semibold mb-3 text-sm tracking-tight text-foreground">{group.title}</h3>
                    <ul className="space-y-2 text-sm">
                        {group.items.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block transition-colors hover:text-foreground/80",
                                            isActive
                                                ? "font-medium text-foreground border-l-2 border-primary pl-3 -ml-[14px]"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    )
}
