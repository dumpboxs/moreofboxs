import { Outlet, createFileRoute } from '@tanstack/react-router'
import { MainHeader } from '@/features/main/components/main-header'
import { MainFooter } from '@/features/main/components/main-footer'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center">
      <MainHeader />
      <main className="flex w-full grow flex-col">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}
