import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { requireAuthMiddleware } from '@/middleware/auth'
import { orpc } from '@/orpc/client'

export const Route = createFileRoute('/_main/profile')({
  server: { middleware: [requireAuthMiddleware] },
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()

  return (
    <div className="pt-24 pb-10">
      <p>Welcome! {auth?.user.name}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileCard />
      </Suspense>
    </div>
  )
}

const ProfileCard = () => {
  const { data } = useSuspenseQuery(orpc.privateData.queryOptions())

  return (
    <>
      <h1>Profile</h1>
      <p>ORPC API: {data.message}</p>
      <pre>{JSON.stringify(data.user, null, 2)}</pre>
    </>
  )
}
