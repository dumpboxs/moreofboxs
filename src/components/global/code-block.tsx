import { Check, Copy } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'
import { useState } from 'react'

import { markdownFileIcon } from './markdown-file-icons'

import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
}

// Languages that should use plain text rendering (no syntax highlighting)
const plainTextLanguages = [
  'text',
  'plaintext',
  'txt',
  'plain',
  'tree',
  'directory',
  'dir',
  'structure',
  '',
]

export function CodeBlock({
  code,
  language = 'tsx',
  filename,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)
  const isPlainText = plainTextLanguages.includes(language.toLowerCase())

  const copyToClipboard = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div
      className={cn(
        'group/code relative my-6 overflow-hidden rounded-lg border bg-zinc-950 dark:border-zinc-800',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b bg-zinc-900 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          {markdownFileIcon(language, filename)}
          {filename ? (
            <span className="text-xs font-medium text-zinc-400">
              {filename}
            </span>
          ) : (
            <span className="text-xs font-medium text-zinc-500">
              {isPlainText ? 'text' : language}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:outline-none"
          aria-label="Copy code"
        >
          {isCopied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-zinc-400" />
          )}
        </button>
      </div>
      <div className="relative">
        {isPlainText ? (
          // Plain text rendering - preserves whitespace and formatting
          <pre className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700 overflow-x-auto bg-[#282c34] p-4 py-3 text-sm">
            {lines.map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right text-zinc-600 select-none">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre text-zinc-300">
                  {line || ' '}
                </span>
              </div>
            ))}
          </pre>
        ) : (
          // Syntax highlighted rendering
          <Highlight theme={themes.oneDark} code={code} language={language}>
            {({
              className: highlightClassName,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }) => (
              <pre
                className={cn(
                  'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700 overflow-x-auto p-4 py-3 text-sm',
                  highlightClassName,
                )}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    className="table-row"
                  >
                    {showLineNumbers && (
                      <span className="table-cell pr-4 text-right text-zinc-600 select-none">
                        {i + 1}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        )}
      </div>
    </div>
  )
}
