import { DocsLayout } from '@/components/docs-layout'
import { CodeBlock } from '@/components/code-block'

export default function AuthenticationPage() {
  const toc = (
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#overview" className="hover:text-foreground transition-colors">Overview</a></li>
      <li><a href="#providers" className="hover:text-foreground transition-colors">Providers</a></li>
      <li><a href="#middleware" className="hover:text-foreground transition-colors">Middleware Protection</a></li>
      <li><a href="#client-usage" className="hover:text-foreground transition-colors">Client Usage</a></li>
    </ul>
  )

  return (
    <DocsLayout toc={toc}>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Authentication</h1>
        <p className="text-lg text-muted-foreground">
          Secure, flexible authentication powered by Auth.js (formerly NextAuth).
        </p>
      </div>

      <div className="mt-10">
        <h2 id="overview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Overview</h2>
        <p className="leading-7 mt-6">
          When you select the <code>--auth</code> flag, NextCraft configures a complete authentication system including:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Auth.js v5 (Beta):</strong> The latest version of the standard auth library for Next.js.</li>
          <li><strong>Database Adapter:</strong> Automatically connected to your chosen database (Prisma).</li>
          <li><strong>Session Management:</strong> Secure, HTTP-only cookies.</li>
          <li><strong>Type Safety:</strong> Fully typed session and user objects.</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 id="providers" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Providers</h2>
        <p className="leading-7 mt-6">
          By default, we configure <strong>GitHub</strong> and <strong>Google</strong> providers, plus a <strong>Credentials</strong> provider for email/password login.
        </p>

        <p className="leading-7 mt-4">
          Configure your keys in <code>.env</code>:
        </p>

        <CodeBlock code={`AUTH_SECRET="your-secret-key"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"`} language="bash" filename=".env" />
      </div>

      <div className="mt-10">
        <h2 id="middleware" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Middleware Protection</h2>
        <p className="leading-7 mt-6">
          Routes are protected using Next.js Middleware. We include a <code>middleware.ts</code> that checks for a valid session on protected routes.
        </p>

        <CodeBlock code={`export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"]
}`} language="typescript" filename="middleware.ts" />
      </div>

      <div className="mt-10">
        <h2 id="client-usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Client Usage</h2>
        <p className="leading-7 mt-6">
          Access the current user in Client Components:
        </p>

        <CodeBlock code={`'use client'

import { useSession } from "next-auth/react"

export default function UserProfile() {
  const { data: session } = useSession()

  if (session) {
    return <p>Signed in as {session.user.email}</p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}`} language="typescript" filename="components/user-profile.tsx" />
      </div>
    </DocsLayout>
  )
}
