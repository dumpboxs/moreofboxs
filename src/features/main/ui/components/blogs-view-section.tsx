import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { Button } from '@/components/ui/button'
import { BlogCard } from '@/features/main/ui/components/blog-card'
import { cn } from '@/lib/utils'
import { orpc } from '@/orpc/client'

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
  const { data: allBlogs } = useSuspenseQuery(
    orpc.blogs.list.queryOptions({ input: {} }),
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
          initial="from"
          whileInView="to"
          viewport={{ once: true }}
          variants={listVariant}
        >
          {allBlogs.items.map((blog) => (
            <motion.li key={blog.id} variants={itemVariant}>
              <BlogCard blog={blog} />
            </motion.li>
          ))}
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
        <Button variant="outline" asChild>
          <Link to="/blogs" viewTransition={true}>
            Load More
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
