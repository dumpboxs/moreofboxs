import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { BlogCard } from '@/features/main/ui/components/blog-card'
import { cn } from '@/lib/utils'
import { orpc } from '@/orpc/client'
import { Route } from '@/routes/_main/blogs'

const listVariant: Variants = {
  to: {
    transition: {
      delayChildren: 0.05,
    },
  },
}

const itemVariant: Variants = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'backInOut',
    },
  },
}

type Props = React.ComponentProps<'section'>

export const BlogsViewSection = ({ className, ...props }: Props) => {
  const { search, sortBy, sortOrder } = Route.useSearch()

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(
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

  return (
    <section {...props} className={cn('w-full py-6 md:py-10', className)}>
      <div className="container px-4 lg:px-6">
        <motion.h2
          className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.05,
              ease: 'easeInOut',
            },
          }}
        >
          All Blog posts
        </motion.h2>

        <motion.ul
          className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
          variants={listVariant}
        >
          {data.pages.map((page) =>
            page.items.map((blog) => (
              <motion.li
                key={blog.id}
                variants={itemVariant}
                initial="from"
                animate="to"
              >
                <BlogCard blog={blog} />
              </motion.li>
            )),
          )}
        </motion.ul>
      </div>

      <motion.div
        className="mt-8 flex justify-center md:mt-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.05,
            ease: 'backInOut',
          },
        }}
      >
        <Button
          variant="outline"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <>
              <Spinner /> Loading more
            </>
          ) : hasNextPage ? (
            'Load more'
          ) : (
            'No more blogs'
          )}
        </Button>
      </motion.div>
    </section>
  )
}
