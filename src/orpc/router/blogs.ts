import DOMPurify from 'isomorphic-dompurify'
import type { Prisma } from '@/generated/prisma/client'
import {
  blogsQuerySchema,
  createBlogSchema,
  newBlogSchema,
} from '@/features/main/schemas/blog.schema'
import { adminProcedure, publicProcedure } from '@/orpc'
import { createUniqueSlug } from '@/utils/slug-generator'
import { auth } from '@/lib/auth'
import { BlogStatus } from '@/generated/prisma/enums'

export const blogsRouter = {
  list: publicProcedure
    .route({
      method: 'GET',
      path: '/blogs',
      description: 'Get a list of blogs',
      summary: 'Get a list of blogs',
      tags: ['Blogs'],
    })
    .input(blogsQuerySchema)
    .handler(async ({ context, input }) => {
      const { limit, page, search, status, sortByFilter, sortOrderFilter } =
        input
      const skip = (page - 1) * limit
      const orderBy = { [sortByFilter]: sortOrderFilter }

      let canReadDraft = false

      if (context.auth?.user) {
        const hasPermission = await auth.api.userHasPermission({
          body: {
            userId: context.auth.user.id,
            permission: {
              blogs: ['read:draft'],
            },
          },
        })

        canReadDraft = hasPermission.success
      }

      // Determine allowed statuses based on permission
      const allowedStatuses = canReadDraft
        ? [BlogStatus.published, BlogStatus.draft]
        : [BlogStatus.published]

      // If status is requested, validate it against allowed statuses
      // If user requests a status they're not allowed to see, fall back to allowed statuses only
      const statusFilter = status
        ? allowedStatuses.includes(status)
          ? [status]
          : [BlogStatus.published] // Ignore invalid/unauthorized status request
        : allowedStatuses

      const whereClause: Prisma.BlogWhereInput = {
        status: { in: statusFilter },
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }),
      }

      const [totalBlogs, blogs] = await Promise.all([
        context.db.blog.count({ where: whereClause }),
        context.db.blog.findMany({
          where: whereClause,
          orderBy,
          skip,
          take: limit,
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
        }),
      ])

      return {
        items: blogs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalBlogs / limit),
          totalItems: totalBlogs,
        },
      }
    }),

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
