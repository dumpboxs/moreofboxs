import Markdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { CodeBlock } from '@/components/global/code-block'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export const MarkdownRenderer = ({
  content,
  className,
}: MarkdownRendererProps) => {
  return (
    <div
      className={cn('prose prose-zinc dark:prose-invert max-w-none', className)}
    >
      <Markdown
        remarkPlugins={[
          remarkGfm,
          remarkMath,
          remarkBreaks,
          // Custom plugin to handle code block titles
          () => (tree: any) => {
            const visit = (node: any, callback: (node: any) => void) => {
              callback(node)
              if (node.children) {
                node.children.forEach((child: any) => visit(child, callback))
              }
            }

            visit(tree, (node: any) => {
              if (node.type === 'code' && node.meta) {
                // Extract title from meta string like 'title="auth.ts"'
                const titleMatch = node.meta.match(/title="([^"]*)"/)
                if (titleMatch) {
                  node.data = node.data ?? {}
                  node.data.hProperties = node.data.hProperties ?? {}
                  node.data.hProperties.title = titleMatch[1]
                }
              }
            })
          },
        ]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
              },
            },
          ],
          rehypeKatex,
        ]}
        components={{
          code: ({
            node,
            className: langClassName,
            children,
            ...props
          }: any) => {
            const match = /language-(\w+)/.exec(langClassName || '')
            // Check if this is a code block or inline code by checking for newlines
            const hasMultipleLines =
              typeof children === 'string' && children.includes('\n')
            const isInline = !match && !hasMultipleLines

            // The custom plugin puts the title in hProperties, which react-markdown passes as props
            const title = props.title as string | undefined

            if (isInline) {
              return (
                <code
                  className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm font-medium"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            return (
              <CodeBlock
                code={String(children).replace(/\n$/, '')}
                language={match?.[1] || 'text'}
                filename={title}
              />
            )
          },
          h1: ({ node, ...props }) => (
            <h1
              className="text-foreground mt-8 mb-4 scroll-mt-20 text-3xl font-bold tracking-tight"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-foreground mt-8 mb-4 scroll-mt-20 border-b pb-2 text-2xl font-semibold tracking-tight"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-foreground mt-6 mb-3 scroll-mt-20 text-xl font-semibold tracking-tight"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="text-foreground mt-4 mb-2 scroll-mt-20 text-lg font-semibold tracking-tight"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              className="text-foreground mb-4 leading-7 not-first:mt-4"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="text-foreground my-4 ml-6 list-disc [&>li]:mt-2"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="text-foreground my-4 ml-6 list-decimal [&>li]:mt-2"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="leading-7" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-zinc-300 pl-4 text-zinc-600 italic dark:border-zinc-700 dark:text-zinc-400 [&>p]:mb-0"
              {...props}
            />
          ),
          a: ({ node, href, ...props }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            />
          ),
          img: ({ node, alt, src, ...props }) => (
            <span className="my-6 block overflow-hidden rounded-lg">
              <img
                alt={alt}
                src={src}
                className="mx-auto rounded-lg border dark:border-zinc-800"
                loading="lazy"
                {...props}
              />
              {alt && (
                <span className="mt-2 block text-center text-sm text-zinc-500">
                  {alt}
                </span>
              )}
            </span>
          ),
          hr: ({ node, ...props }) => (
            <hr
              className="my-8 border-zinc-200 dark:border-zinc-800"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="my-6 w-full overflow-x-auto rounded-lg border dark:border-zinc-800">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-zinc-100 dark:bg-zinc-900" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody
              className="divide-y divide-zinc-200 dark:divide-zinc-800"
              {...props}
            />
          ),
          tr: ({ node, ...props }) => (
            <tr
              className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-3 text-zinc-700 dark:text-zinc-300"
              {...props}
            />
          ),
          pre: ({ children }) => (
            // Let the code component handle pre blocks with syntax highlighting
            <>{children}</>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
