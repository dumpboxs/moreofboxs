import * as z from 'zod'
import { BlogStatus } from '@/generated/prisma/enums'

const MIN_DEFAULT_LIMIT = 10
const MAX_DEFAULT_LIMIT = 100
const MIN_DEFAULT_PAGE = 1

const blogStatusSchema = z.enum([BlogStatus.published, BlogStatus.draft])
const sortBySchema = z.enum([
  'createdAt',
  'updatedAt',
  'viewsCount',
  'likesCount',
])
const sortOrderSchema = z.enum(['asc', 'desc'])

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

export const blogsQuerySchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .positive()
    .min(MIN_DEFAULT_LIMIT)
    .max(MAX_DEFAULT_LIMIT)
    .default(MIN_DEFAULT_LIMIT),
  page: z.coerce
    .number()
    .int()
    .positive()
    .min(MIN_DEFAULT_PAGE)
    .default(MIN_DEFAULT_PAGE),
  search: z.string().max(100).optional(),
  status: blogStatusSchema.optional(),
  sortByFilter: sortBySchema.default('createdAt'),
  sortOrderFilter: sortOrderSchema.default('desc'),
})
