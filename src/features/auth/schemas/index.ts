import * as z from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().nonempty({ error: 'Name is required' }).max(255, {
      error: 'Name must be at most 255 characters long',
    }),
    username: z.string().nonempty({ error: 'Username is required' }).max(255, {
      error: 'Username must be at most 255 characters long',
    }),
    email: z
      .email({ error: 'Invalid email format' })
      .nonempty({ error: 'Email is required' })
      .max(255, {
        error: 'Email must be at most 255 characters long',
      }),
    password: z
      .string()
      .nonempty({ error: 'Password is required' })
      .min(8, {
        error: 'Password must be at least 8 characters long',
      })
      .max(128, {
        error: 'Password must be at most 128 characters long',
      }),
    confirmPassword: z
      .string()
      .nonempty({ error: 'Confirm password is required' })
      .min(1, {
        error: 'Confirm password is required',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const signInSchema = signUpSchema.pick({
  username: true,
  password: true,
})

export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>
