import Link from 'next/link'

export default function DatabasePage() {
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
                <li><Link href="/docs/database" className="font-semibold">Database</Link></li>
                <li><Link href="/docs/authentication" className="text-muted-foreground hover:text-foreground">Authentication</Link></li>
              </ul>
            </div>
          </aside>
          
          <main className="prose prose-slate max-w-none">
            <h1>Database</h1>
            
            <p>NextCraft fullstack mode includes Prisma ORM with your choice of database.</p>
            
            <h2>Supported Databases</h2>
            
            <h3>PostgreSQL (Recommended)</h3>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --mode fullstack --db postgres</code></pre>
            
            <p>Best for production applications with complex queries.</p>
            
            <h3>MySQL</h3>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --mode fullstack --db mysql</code></pre>
            
            <p>Popular choice with wide hosting support.</p>
            
            <h3>SQLite</h3>
            
            <pre className="bg-muted p-4 rounded"><code>npx nextcraft-cli my-app --mode fullstack --db sqlite</code></pre>
            
            <p>Perfect for development and small applications.</p>
            
            <h2>Setup</h2>
            
            <p>After creating your project:</p>
            
            <ol>
              <li>Update <code>.env</code> with your database URL</li>
              <li>Run migrations: <code>npx prisma migrate dev</code></li>
              <li>Generate client: <code>npx prisma generate</code></li>
            </ol>
            
            <h2>Example Schema</h2>
            
            <pre className="bg-muted p-4 rounded"><code>{`model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}</code></pre>
            
            <h2>Usage</h2>
            
            <pre className="bg-muted p-4 rounded"><code>{`import { prisma } from '@/lib/prisma'

export async function getUsers() {
  return await prisma.user.findMany()
}`}</code></pre>
            
            <h2>Prisma Studio</h2>
            
            <p>View and edit your data:</p>
            
            <pre className="bg-muted p-4 rounded"><code>npx prisma studio</code></pre>
          </main>
        </div>
      </div>
    </div>
  )
}
