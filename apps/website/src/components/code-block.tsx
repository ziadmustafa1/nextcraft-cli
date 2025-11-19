'use client'

import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState('')

  useEffect(() => {
    const highlight = async () => {
      try {
        const result = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        })
        setHtml(result)
      } catch (error) {
        console.error('Syntax highlighting error:', error)
        setHtml(`<pre><code>${code}</code></pre>`)
      }
    }
    highlight()
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-mono text-zinc-400">{filename}</span>
            )}
            {!filename && language && (
              <span className="text-xs font-mono text-zinc-500 uppercase">{language}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      )}

      {/* Code */}
      <div className="relative overflow-x-auto">
        {html ? (
          <div 
            className="[&>pre]:!bg-transparent [&>pre]:!p-4 [&>pre]:!m-0 [&>pre]:text-sm [&>pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-4 text-sm leading-relaxed">
            <code className="text-zinc-300">{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
