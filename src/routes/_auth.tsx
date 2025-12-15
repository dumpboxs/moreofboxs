import { Outlet, createFileRoute } from '@tanstack/react-router'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import * as z from 'zod'

const redirectSearchSchema = z.object({
  redirect_to: fallback(z.string().optional(), ''),
})
export const Route = createFileRoute('/_auth')({
  validateSearch: zodValidator(redirectSearchSchema),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh py-12 md:py-24">
      <main className="mx-auto h-full w-full max-w-96">
        <Outlet />
      </main>
    </div>
  )
}
