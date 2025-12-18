import { createFileRoute, redirect } from '@tanstack/react-router'
import { BlogBySlugView } from '@/features/main/ui/views/blog-by-slug-view'

export const Route = createFileRoute('/_main/blogs_/$slug')({
  component: BlogBySlugView,
  beforeLoad: ({ context, location }) => {
    if (!context.auth) {
      throw redirect({
        to: '/sign-in',
        search: { redirect_to: location.pathname },
      })
    }

    return { auth: context.auth }
  },
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      context.orpc.blogs.getOneBySlug.queryOptions({
        input: { slug: params.slug },
      }),
    )
  },
})
