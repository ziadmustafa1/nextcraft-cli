import { DocsLayout } from '@/components/docs-layout'
import { CodeBlock } from '@/components/code-block'

export default function DatabasePage() {
  const toc = (
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="#prisma-orm" className="hover:text-foreground transition-colors">Prisma ORM</a></li>
      <li><a href="#supported-databases" className="hover:text-foreground transition-colors">Supported Databases</a></li>
      <li><a href="#setup" className="hover:text-foreground transition-colors">Setup & Migration</a></li>
      <li><a href="#seeding" className="hover:text-foreground transition-colors">Seeding</a></li>
    </ul>
  )

  return (
    <DocsLayout toc={toc}>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Database</h1>
        <p className="text-lg text-muted-foreground">
          Production-ready database integration with Prisma ORM and type-safe queries.
        </p>
      </div>

      <div className="mt-10">
        <h2 id="prisma-orm" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Prisma ORM</h2>
        <p className="leading-7 mt-6">
          NextCraft uses <a href="https://www.prisma.io" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Prisma</a> as the default ORM. It provides:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Type Safety:</strong> Auto-generated TypeScript client based on your schema.</li>
          <li><strong>Migrations:</strong> Declarative data modeling and migration system.</li>
          <li><strong>Studio:</strong> GUI to view and edit data in your database.</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 id="supported-databases" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Supported Databases</h2>
        <p className="leading-7 mt-6">
          You can choose your database during project creation:
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">PostgreSQL</h3>
            <p className="text-sm text-muted-foreground mt-2">Recommended for production apps. Robust and scalable.</p>
            <code className="mt-2 block text-xs bg-muted p-1 rounded">--db postgres</code>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">MySQL</h3>
            <p className="text-sm text-muted-foreground mt-2">Great for legacy compatibility and widespread hosting support.</p>
            <code className="mt-2 block text-xs bg-muted p-1 rounded">--db mysql</code>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">SQLite</h3>
            <p className="text-sm text-muted-foreground mt-2">Best for prototyping and small apps. No server required.</p>
            <code className="mt-2 block text-xs bg-muted p-1 rounded">--db sqlite</code>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 id="setup" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Setup & Migration</h2>
        <p className="leading-7 mt-6">
          After creating your project, configure your database connection in <code>.env</code>:
        </p>

        <CodeBlock code='DATABASE_URL="postgresql://user:password@localhost:5432/mydb"' language="bash" />

        <p className="leading-7">
          Then run migrations to create tables:
        </p>

        <CodeBlock code="npx prisma migrate dev" language="bash" />
      </div>

      <div className="mt-10">
        <h2 id="seeding" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Seeding</h2>
        <p className="leading-7 mt-6">
          We include a <code>prisma/seed.ts</code> file to populate your database with initial data.
        </p>

        <CodeBlock code="npx prisma db seed" language="bash" />
      </div>
    </DocsLayout>
  )
}
