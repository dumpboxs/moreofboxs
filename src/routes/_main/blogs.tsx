import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/blogs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/blogs"!</div>
}
