import type { InferRouterInputs, InferRouterOutputs } from '@orpc/server'
import type { orpcRouter } from '@/orpc/router'
import { o } from '@/orpc/context'
import { requireAuth, requiredRole, timingMiddleware } from '@/orpc/middleware'

export type RouterInputs = InferRouterInputs<typeof orpcRouter>
export type RouterOutputs = InferRouterOutputs<typeof orpcRouter>

export const publicProcedure = o.use(timingMiddleware)

// Protected procedure (authenticated)
export const protectedProcedure = o.use(timingMiddleware).use(requireAuth)

// Admin procedure (authenticated and admin)
export const adminProcedure = o.use(timingMiddleware).use(requiredRole('admin'))

// Roles procedure (authenticated and roles)
export const rolesProcedure = o
  .use(timingMiddleware)
  .use(requiredRole(['admin', 'user']))
