import { os } from '@orpc/server'
import { db } from '@/configs/db'
import { auth } from '@/lib/auth'

export const createORPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  })

  return {
    auth: session,
    db,
  }
}

export const o = os.$context<Awaited<ReturnType<typeof createORPCContext>>>()
