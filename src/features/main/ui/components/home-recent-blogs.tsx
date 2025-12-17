import { motion } from 'motion/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { Variants } from 'motion/react'
import { cn } from '@/lib/utils'
import { orpc } from '@/orpc/client'
import { BlogCard } from '@/features/main/ui/components/blog-card'

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

export const HomeRecentBlogs = ({ className, ...props }: Props) => {
  const { data: recentBlogs } = useSuspenseQuery(
    orpc.blogs.list.queryOptions({ input: { limit: 4 } }),
  )

  return (
    <section {...props} className={cn('py-6 md:py-10', className)}>
      <div className="lg:pz-6 container px-4">
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
          Recent Blog posts
        </motion.h2>

        <motion.ul
          className="grid gap-4 lg:grid-cols-2 lg:grid-rows-3"
          initial="from"
          whileInView="to"
          viewport={{ once: true }}
          variants={listVariant}
        >
          {recentBlogs.items.map((blog, index) => (
            <motion.li
              key={blog.id}
              variants={itemVariant}
              className={cn(index === 0 && 'lg:row-span-3')}
            >
              <BlogCard blog={blog} size={index > 0 ? 'sm' : 'default'} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
