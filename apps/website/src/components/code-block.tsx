import { codeToHtml } from "shiki"
import { CopyButton } from "./copy-button"

interface CodeBlockProps {
    code: string
    language?: string
    filename?: string
}

export async function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang: language,
        theme: "github-dark",
    })

    return (
        <div className="relative my-6 overflow-hidden rounded-lg border bg-[#0d1117] border-zinc-800">
            {filename && (
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2 text-xs text-zinc-400 font-mono">
                    <span>{filename}</span>
                </div>
            )}
            <div className="relative group">
                <CopyButton
                    value={code}
                    className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"
                />
                <div
                    className="overflow-x-auto p-4 text-sm font-mono [&>pre]:!bg-transparent [&>pre]:!m-0"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    )
}
