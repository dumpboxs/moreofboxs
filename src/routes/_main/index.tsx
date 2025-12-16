import { createFileRoute } from '@tanstack/react-router'
import { HomeView } from '@/features/main/ui/views/home-view'

export const Route = createFileRoute('/_main/')({
  component: HomeView,
})
