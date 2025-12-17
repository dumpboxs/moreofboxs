import { ORPCError } from '@orpc/server'
import type { UserRole } from '@/generated/prisma/enums'
import { o } from '@/orpc/context'
import { env } from '@/configs/env'

/**
 * Timing middleware
 */
export const timingMiddleware = o.middleware(async ({ next, path }) => {
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

export const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.auth) {
    throw new ORPCError('UNAUTHORIZED', {
      cause: 'Unauthorized',
      message: 'You must be authenticated to perform this action',
    })
  }

  return next({
    context: {
      ...context,
      auth: {
        ...context.auth,
      },
    },
  })
})

export const requiredRole = (allowedRoles: UserRole | Array<UserRole>) =>
  o.middleware(async ({ context, next }) => {
    if (!context.auth) {
      throw new ORPCError('UNAUTHORIZED', {
        cause: 'Unauthorized',
        message: 'You must be authenticated to perform this action',
      })
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
    const userRole =
      typeof context.auth.user.role === 'string'
        ? context.auth.user.role.split(',')
        : Array.isArray(context.auth.user.role)
          ? context.auth.user.role
          : ['user']

    const hasRole = roles.some((role) => userRole.includes(role))

    if (!hasRole) {
      throw new ORPCError('FORBIDDEN', {
        cause: 'Forbidden',
        message: 'Access denied, insufficient permissions',
      })
    }

    return next({
      context: {
        ...context,
        auth: {
          ...context.auth,
        },
      },
    })
  })
