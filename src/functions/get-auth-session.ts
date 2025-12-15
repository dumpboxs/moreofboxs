import { createServerFn } from '@tanstack/react-start'
import { authContextMiddleware } from '@/middleware/auth'

export const getAuthSession = createServerFn({ method: 'GET' })
  .middleware([authContextMiddleware])
  .handler(async ({ context }) => {
    return context.auth
  })
