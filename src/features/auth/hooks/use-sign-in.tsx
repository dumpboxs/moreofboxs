import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useTransition } from 'react'
import { signInSchema } from '@/features/auth/schemas'
import { signIn } from '@/lib/auth/client'
import { Route } from '@/routes/_auth'

export const useSignIn = () => {
  const [isPending, startTransition] = useTransition()

  const { redirect_to } = Route.useSearch()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onChange: signInSchema,
      onSubmit: signInSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        await signIn.username({
          username: value.username,
          password: value.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Sign in successfully', {
                description: 'You can now sign in',
              })
              navigate({ to: redirect_to ?? '/' })
            },
            onError: (ctx) => {
              toast.error('Failed to sign in', {
                description: ctx.error.message,
              })
            },
          },
        })
      })
    },
  })

  return {
    form,
    isPending,
  }
}
