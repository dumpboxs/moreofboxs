import { Link } from '@tanstack/react-router'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { formatDistanceToNowStrict } from 'date-fns'
import type { RouterOutputs } from '@/orpc'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface BlogCardProps extends React.ComponentProps<typeof Card> {
  blog: RouterOutputs['blogs']['list']['items'][number]
  size?: 'sm' | 'default'
}

export const BlogCard = ({
  blog,
  size = 'default',
  ...props
}: BlogCardProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editable: false,
    autofocus: false,
    immediatelyRender: false,
  })

  return (
    <Card
      className={cn(
        'group @container relative h-full py-2',
        size === 'default' && 'flex flex-col-reverse justify-end',
        size === 'sm' && 'grid grid-cols-[1fr_1.15fr] items-center gap-0 py-2',
      )}
      {...props}
    >
      <CardHeader
        className={cn(
          'gap-2',
          size === 'sm' && 'order-1 content-center py-3 ps-4',
        )}
      >
        <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
          <p className="@max-xs:hidden">{blog.author.username}</p>

          <div className="bg-muted-foreground/50 size-1 rounded-full @max-3xs:hidden" />

          <Tooltip delayDuration={250}>
            <TooltipTrigger>
              {formatDistanceToNowStrict(blog.createdAt, { addSuffix: true })}
            </TooltipTrigger>

            <TooltipContent>
              {new Date(blog.createdAt).toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </TooltipContent>
          </Tooltip>
        </div>

        <Link
          to={`/blogs/$slug`}
          params={{ slug: blog.slug }}
          viewTransition={true}
        >
          <CardTitle
            className={cn(
              'line-clamp-2 leading-tight hover:underline hover:underline-offset-4',
              size === 'default' && 'text-xl @md:text-2xl',
            )}
          >
            {blog.title}
          </CardTitle>
        </Link>

        <CardDescription
          className={cn(
            'line-clamp-2 text-balance',
            size === 'sm' && '@max-2xs:hidden',
          )}
        >
          {editor?.getText()}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2">
        <Link
          to={`/blogs/$slug`}
          params={{ slug: blog.slug }}
          viewTransition={true}
        >
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
            <img
              src={'https://placehold.co/2560x1080'}
              width={2560}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </Link>
      </CardContent>
    </Card>
  )
}
