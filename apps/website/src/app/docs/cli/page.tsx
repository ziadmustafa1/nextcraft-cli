import { DocsLayout } from '@/components/docs-layout'
import { CodeBlock } from '@/components/code-block'

export default function CliPage() {
    const toc = (
        <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#installation" className="hover:text-foreground transition-colors">Installation</a></li>
            <li><a href="#commands" className="hover:text-foreground transition-colors">Commands</a></li>
            <li><a href="#options" className="hover:text-foreground transition-colors">Options</a></li>
            <li><a href="#examples" className="hover:text-foreground transition-colors">Examples</a></li>
        </ul>
    )

    return (
        <DocsLayout toc={toc}>
            <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CLI Reference</h1>
                <p className="text-lg text-muted-foreground">
                    Complete reference for the NextCraft CLI tool.
                </p>
            </div>

            <div className="mt-10">
                <h2 id="installation" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">Installation</h2>
                <p className="leading-7 mt-6">
                    You can use the CLI directly with <code>npx</code> (recommended) or install it globally.
                </p>

                <CodeBlock code="npx nextcraft-cli [project-name]" language="bash" />
            </div>

            <div className="mt-10">
                <h2 id="commands" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Commands</h2>

                <div className="mt-6">
                    <h3 className="font-semibold text-xl tracking-tight">create-nextcraft-app</h3>
                    <p className="leading-7 mt-2">Creates a new NextCraft project with the specified name.</p>
                    <CodeBlock code="npx nextcraft-cli my-app [options]" language="bash" />
                </div>
            </div>

            <div className="mt-10">
                <h2 id="options" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Options</h2>

                <div className="my-6 w-full overflow-y-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Option</th>
                                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">--mode &lt;type&gt;</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Project mode (frontend, fullstack)</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">frontend</td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">--ui &lt;lib&gt;</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">UI Framework (shadcn, chakra)</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">shadcn</td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">--db &lt;type&gt;</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Database (postgres, sqlite)</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">postgres</td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">--auth</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Include authentication</td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right font-mono text-sm">false</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-10">
                <h2 id="examples" className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Examples</h2>

                <div className="mt-6 space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg">Basic Frontend Project</h3>
                        <CodeBlock code="npx nextcraft-cli my-blog --mode frontend --ui shadcn" language="bash" />
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">Fullstack SaaS Starter</h3>
                        <CodeBlock code="npx nextcraft-cli my-saas --mode fullstack --db postgres --auth" language="bash" />
                    </div>
                </div>
            </div>
        </DocsLayout>
    )
}
