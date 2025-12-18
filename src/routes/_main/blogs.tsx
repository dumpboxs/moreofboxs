import { createFileRoute } from '@tanstack/react-router'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'
import { BlogsView } from '@/features/main/ui/views/blogs-view'
import {
  sortBySchema,
  sortOrderSchema,
} from '@/features/main/schemas/blog.schema'
import { orpc } from '@/orpc/client'

const blogsSearchSchema = z.object({
  sortBy: z.optional(fallback(sortBySchema, 'createdAt')),
  sortOrder: z.optional(fallback(sortOrderSchema, 'desc')),
  search: z.optional(fallback(z.string(), '')),
})

export const Route = createFileRoute('/_main/blogs')({
  component: BlogsView,
  validateSearch: zodValidator(blogsSearchSchema),
  loaderDeps: ({ search }) => ({
    sortBy: search.sortBy,
    sortOrder: search.sortOrder,
    search: search.search,
  }),
  loader: ({ context, deps: { search, sortBy, sortOrder } }) => {
    context.queryClient.ensureInfiniteQueryData(
      orpc.blogs.list.infiniteOptions({
        input: (page: number) => ({ page, sortBy, sortOrder, search }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          if (lastPage.pagination.totalPages <= lastPageParam) {
            return undefined
          }
          return lastPageParam + 1
        },
      }),
    )
  },
})
