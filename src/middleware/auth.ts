import { createMiddleware } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { auth } from '@/lib/auth'

export const authContextMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers })

    return await next({
      context: { auth: session },
    })
  },
)

export const requireAuthMiddleware = createMiddleware()
  .middleware([authContextMiddleware])
  .server(async ({ next, context, pathname }) => {
    if (!context.auth) {
      throw redirect({ to: '/sign-in', search: { redirect_to: pathname } })
    }

    return await next()
  })

export const requireGuestMiddleware = createMiddleware()
  .middleware([authContextMiddleware])
  .server(async ({ next, context }) => {
    if (context.auth) {
      throw redirect({ to: '/' })
    }

    return await next()
  })
