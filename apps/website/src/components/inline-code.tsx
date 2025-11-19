interface InlineCodeProps {
  children: string
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
      {children}
    </code>
  )
}
