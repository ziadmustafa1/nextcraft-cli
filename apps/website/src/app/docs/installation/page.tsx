import { DocsLayout } from '@/components/docs-layout'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CodeBlock } from '@/components/code-block'

export default function InstallationPage() {
  const toc = (
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#requirements" className="hover:text-foreground transition-colors">Requirements</a></li>
      <li><a href="#using-npx" className="hover:text-foreground transition-colors">Using npx</a></li>
      <li><a href="#global-install" className="hover:text-foreground transition-colors">Global Installation</a></li>
    </ul>
  )

  return (
    <DocsLayout toc={toc}>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-lg text-muted-foreground">
          Get up and running with NextCraft in seconds.
        </p>
      </div>

      <div className="mt-10">
        <h2 id="requirements" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Requirements</h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Node.js 18.0.0 or higher</li>
          <li>npm, pnpm, or yarn package manager</li>
          <li>Git (optional, for version control)</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 id="using-npx" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Using npx (Recommended)</h2>
        <p className="leading-7 mt-6">
          The easiest way to start is using <code>npx</code>. This ensures you always use the latest version of the generator without installing anything globally.
        </p>

        <CodeBlock code="npx nextcraft-cli my-app" language="bash" />
      </div>

      <div className="mt-10">
        <h2 id="global-install" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Global Installation</h2>
        <p className="leading-7 mt-6">
          If you create projects frequently, you might prefer installing the CLI globally.
        </p>

        <CodeBlock code="npm install -g nextcraft-cli" language="bash" />

        <p className="leading-7">
          Once installed, you can use the <code>nextcraft</code> command directly:
        </p>

        <CodeBlock code="nextcraft my-app" language="bash" />
      </div>

      <div className="mt-12 flex items-center justify-between border-t pt-6">
        <div />
        <Link href="/docs/quick-start" className="group flex items-center gap-2 text-sm font-medium hover:text-primary">
          Next: Quick Start
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </DocsLayout>
  )
}
