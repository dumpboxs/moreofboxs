import {
  ArrowLeft01FreeIcons,
  Message01Icon,
  Share01Icon,
  ThumbsUpIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, getRouteApi, useLocation } from '@tanstack/react-router'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'
import { AvatarUser } from '@/components/global/avatar-user'
import { Separator } from '@/components/ui/separator'
import { getReadTime } from '@/utils/read-time'
import { ShareMenuDropdown } from '@/features/main/components/share-menu-dropdown'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const route = getRouteApi('/_main/blogs_/$slug')

export const BlogBySlugView = () => {
  const { slug } = route.useParams()
  const { orpc, auth } = route.useRouteContext()
  const { url } = useLocation()

  const { data: blog } = useSuspenseQuery(
    orpc.blogs.getOneBySlug.queryOptions({ input: { slug } }),
  )

  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editable: false,
    autofocus: false,
    immediatelyRender: false,
  })

  return (
    <div className="pt-24 pb-10">
      <article className="relative container mx-auto max-w-[720px] px-4 pt-6 pb-12 lg:px-6">
        <Button
          variant="outline"
          size="icon"
          className="sticky top-22 -ms-16"
          asChild
        >
          <Link from="/blogs/$slug" to="/blogs" viewTransition>
            <HugeiconsIcon icon={ArrowLeft01FreeIcons} />
          </Link>
        </Button>

        <h1 className="-mt-10 text-4xl leading-tight font-semibold">
          {blog.title}
        </h1>

        <div className="my-4 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <AvatarUser user={auth.user} className="size-8 rounded-full" />

            <span>{blog.author.username}</span>
          </div>

          <div className="bg-accent size-1 rounded-full" />

          <span className="text-muted-foreground">
            {getReadTime(editor?.getText() ?? '')} min read
          </span>

          <div className="bg-accent size-1 rounded-full" />

          <span className="text-muted-foreground">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              dateStyle: 'medium',
            })}
          </span>
        </div>

        <Separator />

        <div className="my-2 flex items-center gap-2">
          <Button variant="ghost">
            <HugeiconsIcon icon={ThumbsUpIcon} />
            {blog.likesCount}
          </Button>

          <Button variant="ghost">
            <HugeiconsIcon icon={Message01Icon} />
            {blog.commentsCount}
          </Button>

          <ShareMenuDropdown blogTitle={blog.title} blogUrl={url.href}>
            <Button variant="ghost" className="ms-auto">
              <HugeiconsIcon icon={Share01Icon} />
              Share
            </Button>
          </ShareMenuDropdown>
        </div>

        <Separator />

        <div className="my-8">
          <AspectRatio
            ratio={16 / 9}
            className="bg-border overflow-hidden rounded-xl"
          >
            <img
              src={'https://placehold.co/1280x720'}
              width={1280}
              height={720}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>

        <EditorContent editor={editor} />
      </article>
    </div>
  )
}
