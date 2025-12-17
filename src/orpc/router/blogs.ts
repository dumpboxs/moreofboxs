import DOMPurify from 'isomorphic-dompurify'
import {
  createBlogSchema,
  newBlogSchema,
} from '@/features/main/schemas/blog.schema'
import { adminProcedure } from '@/orpc'
import { createUniqueSlug } from '@/utils/slug-generator'

export const blogsRouter = {
  create: adminProcedure
    .route({
      method: 'POST',
      path: '/blogs',
      description: 'Create a new blog',
      summary: 'Create a new blog',
      tags: ['Blogs'],
    })
    .input(createBlogSchema)
    .output(newBlogSchema)
    .handler(async ({ context, input }) => {
      const slug = await createUniqueSlug(input.title, async (_slug) => {
        const existingSlug = await context.db.blog.findUnique({
          where: { slug: _slug },
        })

        return !!existingSlug
      })
      const sanitizedContent = DOMPurify.sanitize(input.content)

      const newBlog = await context.db.blog.create({
        data: {
          title: input.title,
          slug,
          content: sanitizedContent,
          authorId: context.auth.user.id,
          status: input.status,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
            },
          },
        },
      })

      return newBlog
    }),
}
