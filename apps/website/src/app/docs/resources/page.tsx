import { DocsLayout } from '@/components/docs-layout'
import { CodeBlock } from '@/components/code-block'
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ResourcesPage() {
    const toc = (
        <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#overview" className="hover:text-foreground transition-colors">Overview</a></li>
            <li><a href="#usage" className="hover:text-foreground transition-colors">Usage</a></li>
            <li><a href="#generated-files" className="hover:text-foreground transition-colors">Generated Files</a></li>
            <li><a href="#customization" className="hover:text-foreground transition-colors">Customization</a></li>
        </ul>
    )

    return (
        <DocsLayout toc={toc}>
            <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CRUD Resources</h1>
                <p className="text-lg text-muted-foreground">
                    Instantly scaffold full-stack CRUD features with a single command.
                </p>
            </div>

            <div className="mt-10">
                <h2 id="overview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Overview</h2>
                <p className="leading-7 mt-6">
                    Building CRUD (Create, Read, Update, Delete) operations is repetitive. NextCraft automates this by generating the entire stack for a resource, from the database schema to the UI.
                </p>
            </div>

            <div className="mt-10">
                <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
                <p className="leading-7 mt-6">
                    Run the generate command with your resource name (e.g., post, product, user):
                </p>
                <CodeBlock code="nextcraft generate resource post" language="bash" filename="Terminal" />
                <p className="leading-7 mt-4">
                    Or use the alias:
                </p>
                <CodeBlock code="nextcraft g resource product" language="bash" filename="Terminal" />
            </div>

            <div className="mt-10">
                <h2 id="generated-files" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Generated Files</h2>
                <p className="leading-7 mt-6">
                    The generator creates the following files:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        <strong>Validation Schema:</strong> <code>src/lib/validations/[name].ts</code>
                        <br />
                        <span className="text-muted-foreground text-sm">Zod schema for form validation and type safety.</span>
                    </li>
                    <li>
                        <strong>Server Actions:</strong> <code>src/lib/actions/[name].ts</code>
                        <br />
                        <span className="text-muted-foreground text-sm">Secure Server Actions for database operations.</span>
                    </li>
                    <li>
                        <strong>Form Component:</strong> <code>src/components/[name]/[name]-form.tsx</code>
                        <br />
                        <span className="text-muted-foreground text-sm">Client-side form with validation and error handling.</span>
                    </li>
                    <li>
                        <strong>Page:</strong> <code>src/app/[name]s/page.tsx</code>
                        <br />
                        <span className="text-muted-foreground text-sm">Main page listing items and the create form.</span>
                    </li>
                </ul>
            </div>

            <div className="mt-10">
                <h2 id="customization" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Customization</h2>
                <p className="leading-7 mt-6">
                    The generated code uses <code>title</code> and <code>content</code> fields by default. You should:
                </p>
                <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                    <li>Update the <strong>Prisma Model</strong> in <code>prisma/schema.prisma</code>.</li>
                    <li>Update the <strong>Zod Schema</strong> in <code>src/lib/validations/[name].ts</code>.</li>
                    <li>Update the <strong>Form Fields</strong> in <code>src/components/[name]/[name]-form.tsx</code>.</li>
                </ol>
            </div>

            <div className="mt-12 flex items-center justify-between border-t pt-6">
                <div />
                <Link href="/docs/ui-frameworks" className="group flex items-center gap-2 text-sm font-medium hover:text-primary">
                    Next: UI Frameworks
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </DocsLayout>
    )
}
