import Link from 'next/link'

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold">NextCraft</Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/docs/installation" className="text-muted-foreground hover:text-foreground">Installation</Link></li>
                <li><Link href="/docs/quick-start" className="text-muted-foreground hover:text-foreground">Quick Start</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/docs/ui-frameworks" className="text-muted-foreground hover:text-foreground">UI Frameworks</Link></li>
                <li><Link href="/docs/database" className="text-muted-foreground hover:text-foreground">Database</Link></li>
                <li><Link href="/docs/authentication" className="font-semibold">Authentication</Link></li>
              </ul>
            </div>
          </aside>
          
          <main className="prose prose-slate max-w-none">
            <h1>Authentication</h1>
            
            <p>NextCraft includes Auth.js (NextAuth.js) for secure authentication.</p>
            
            <h2>Enable Authentication</h2>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --auth</code></pre>
            
            <h2>Features</h2>
            
            <ul>
              <li>Multiple providers (Google, GitHub, Email)</li>
              <li>Session management</li>
              <li>JWT tokens</li>
              <li>Database sessions</li>
              <li>CSRF protection</li>
            </ul>
            
            <h2>Configuration</h2>
            
            <p>Update <code>.env</code>:</p>
            
            <pre className="bg-muted p-4 rounded"><code>{`NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret`}</code></pre>
            
            <h2>Usage</h2>
            
            <h3>Server Component</h3>
            
            <pre className="bg-muted p-4 rounded"><code>{`import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()
  
  if (!session) {
    return <div>Not authenticated</div>
  }
  
  return <div>Welcome {session.user.name}</div>
}`}</code></pre>
            
            <h3>Client Component</h3>
            
            <pre className="bg-muted p-4 rounded"><code>{`'use client'
import { useSession } from 'next-auth/react'

export function Profile() {
  const { data: session } = useSession()
  
  return <div>{session?.user?.name}</div>
}`}</code></pre>
            
            <h2>Protected Routes</h2>
            
            <pre className="bg-muted p-4 rounded"><code>{`import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }
  
  return <div>Protected content</div>
}`}</code></pre>
          </main>
        </div>
      </div>
    </div>
  )
}
