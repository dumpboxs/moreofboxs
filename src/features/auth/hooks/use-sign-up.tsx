import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useTransition } from 'react'
import { signUpSchema } from '@/features/auth/schemas'
import { signUp } from '@/lib/auth/client'

export const useSignUp = () => {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signUpSchema,
      onSubmit: signUpSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        await signUp.email({
          name: value.name,
          email: value.email,
          username: value.username,
          displayUsername: value.username,
          password: value.password,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Sign up successfully', {
                description: 'You can now sign in',
              })
              navigate({ to: '/sign-in' })
            },
            onError: (ctx) => {
              toast.error('Failed to sign up', {
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
