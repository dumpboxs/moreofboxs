import { createFileRoute } from '@tanstack/react-router'
import { SignUpView } from '@/features/auth/ui/views/sign-up-view'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUpView,
})
