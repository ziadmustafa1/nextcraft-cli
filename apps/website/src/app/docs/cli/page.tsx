import { DocsLayout } from "@/components/docs-layout"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CLICommandsPage() {
    const toc = (
        <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#add-auth" className="hover:text-foreground transition-colors">Add Authentication</a></li>
            <li><a href="#generate-resource" className="hover:text-foreground transition-colors">Generate Resource</a></li>
        </ul>
    )

    return (
        <DocsLayout toc={toc}>
            <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CLI Commands</h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to use the NextCraft CLI to speed up your development.
                </p>
            </div>

            <div className="mt-10">
                <h2 id="add-auth" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Add Authentication</h2>
                <p className="leading-7 mt-6">
                    The <code>add auth</code> command sets up a complete authentication system using NextAuth.js, Prisma, and Shadcn UI.
                </p>
                <CodeBlock code="nextcraft add auth" language="bash" filename="Terminal" />
                <p className="leading-7 mt-6">
                    This command will:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Install <code>next-auth</code>, <code>@auth/prisma-adapter</code>, and <code>bcryptjs</code>.</li>
                    <li>Create <code>src/lib/auth.ts</code> with GitHub and Google providers.</li>
                    <li>Create the API route at <code>src/app/api/auth/[...nextauth]/route.ts</code>.</li>
                    <li>Update your <code>prisma/schema.prisma</code> with User, Account, and Session models.</li>
                </ul>
            </div>

            <div className="mt-10">
                <h2 id="generate-resource" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Generate CRUD Resource</h2>
                <p className="leading-7 mt-6">
                    The <code>generate resource</code> command scaffolds a full CRUD (Create, Read, Update, Delete) feature for a specific entity.
                </p>
                <CodeBlock code="nextcraft generate resource post" language="bash" filename="Terminal" />
                <p className="leading-7 mt-6">
                    This generates:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><strong>Schema:</strong> Zod validation schema in <code>src/lib/validations/post.ts</code>.</li>
                    <li><strong>Actions:</strong> Server Actions for DB operations in <code>src/lib/actions/post.ts</code>.</li>
                    <li><strong>Form:</strong> React Hook Form component in <code>src/components/post/post-form.tsx</code>.</li>
                    <li><strong>Page:</strong> A main page listing items and the create form in <code>src/app/posts/page.tsx</code>.</li>
                </ul>
            </div>

            <div className="mt-12 flex items-center justify-between border-t pt-6">
                <div />
                <Link href="/docs/authentication" className="group flex items-center gap-2 text-sm font-medium hover:text-primary">
                    Next: Authentication
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </DocsLayout>
    )
}
