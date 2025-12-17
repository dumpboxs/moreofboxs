import type { RouterClient } from '@orpc/server'
import { protectedProcedure, publicProcedure } from '@/orpc'
import { blogsRouter } from '@/orpc/router/blogs'

export const orpcRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.auth.user,
    }
  }),
  blogs: blogsRouter,
}

export type OrpcRouter = typeof orpcRouter
export type OrpcRouterClient = RouterClient<typeof orpcRouter>
