import { createFileRoute } from '@tanstack/react-router'
import { BlogsView } from '@/features/main/ui/views/blogs-view'

export const Route = createFileRoute('/_main/blogs')({
  component: BlogsView,
})
