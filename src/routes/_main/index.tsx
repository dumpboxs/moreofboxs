import { createFileRoute } from '@tanstack/react-router'
import { HomeView } from '@/features/main/ui/views/home-view'
import { DefaultLoadingView } from '@/components/global/default-loading-view'

export const Route = createFileRoute('/_main/')({
  pendingComponent: DefaultLoadingView,
  component: HomeView,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.orpc.blogs.list.queryOptions({ input: {} }),
    )
  },
})
