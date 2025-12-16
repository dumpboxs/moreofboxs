import { Outlet, createFileRoute } from '@tanstack/react-router'
import { MainHeader } from '@/features/main/components/main-header'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center">
      <MainHeader />
      <main className="flex grow flex-col">
        <Outlet />
      </main>
    </div>
  )
}
