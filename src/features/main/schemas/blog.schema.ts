import * as z from 'zod'
import { BlogStatus } from '@/generated/prisma/enums'

const blogStatusSchema = z.enum([BlogStatus.draft, BlogStatus.published])

export const createBlogSchema = z.object({
  title: z
    .string()
    .nonempty({ error: 'Title is required' })
    .max(180, { error: 'Title must be less than 180 characters' }),
  content: z.string().nonempty({ error: 'Content is required' }),
  status: blogStatusSchema.default(BlogStatus.draft),
})

export const updateBlogSchema = createBlogSchema.partial()

export const newBlogSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  status: blogStatusSchema,
  viewsCount: z.number().default(0),
  likesCount: z.number().default(0),
  commentsCount: z.number().default(0),
  author: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
    username: z.string().nullable(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
})
