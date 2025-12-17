import { o } from '@/orpc/context'
import { requireAuth, requiredRole, timingMiddleware } from '@/orpc/middleware'

export const publicProcedure = o.use(timingMiddleware)

// Protected procedure (authenticated)
export const protectedProcedure = o.use(timingMiddleware).use(requireAuth)

// Admin procedure (authenticated and admin)
export const adminProcedure = o.use(timingMiddleware).use(requiredRole('admin'))
