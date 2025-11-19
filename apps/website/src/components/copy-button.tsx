"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        let timeout: NodeJS.Timeout
        if (hasCopied) {
            timeout = setTimeout(() => {
                setHasCopied(false)
            }, 2000)
        }
        return () => clearTimeout(timeout)
    }, [hasCopied])

    const copyToClipboard = React.useCallback((value: string) => {
        navigator.clipboard.writeText(value)
        setHasCopied(true)
    }, [])

    return (
        <button
            className={cn(
                "relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background p-2 text-sm font-medium shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            onClick={() => copyToClipboard(value)}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
    )
}
