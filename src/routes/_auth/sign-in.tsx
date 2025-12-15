import { createFileRoute } from '@tanstack/react-router'
import { SignInView } from '@/features/auth/ui/views/sign-in-view'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInView,
})
