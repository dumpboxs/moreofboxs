import { ORPCError, os } from '@orpc/server'
import { db } from '@/configs/db'
import { auth } from '@/lib/auth'
import { env } from '@/configs/env'

export const createORPCContext = async ({ req }: { req: Request }) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  })

  return {
    auth: session,
    db,
  }
}

export const o = os.$context<Awaited<ReturnType<typeof createORPCContext>>>()

/**
 * Timing middleware
 */
const timingMiddleware = o.middleware(async ({ next, path }) => {
  const start = Date.now()

  if (env.NODE_ENV === 'development') {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  const result = await next()
  const end = Date.now()
  console.log(`[ORPC] ${path} took ${end - start}ms to execute`)

  return result
})

const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.auth) {
    throw new ORPCError('UNAUTHORIZED', {
      cause: 'Unauthorized',
      message: 'You must be authenticated to perform this action',
    })
  }

  return next({
    context: {
      ...context,
    },
  })
})

// Public procedure (unauthenticated)
export const publicProcedure = o.use(timingMiddleware)

// Protected procedure (authenticated)
export const protectedProcedure = o.use(timingMiddleware).use(requireAuth)
