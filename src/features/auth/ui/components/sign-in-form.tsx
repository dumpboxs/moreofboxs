import { AtIcon, MultiplicationSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { useSignIn } from '@/features/auth/hooks/use-sign-in'
import { InputPassword } from '@/features/auth/ui/components/input-password'

export const SignInForm = () => {
  const { form, isPending } = useSignIn()
  const isSubmitting = form.state.isSubmitting || isPending

  return (
    <form
      id="sign-in-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-4">
        <form.Field
          name="username"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending}
                    type="text"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />

                  <InputGroupAddon>
                    <HugeiconsIcon icon={AtIcon} />
                  </InputGroupAddon>
                  {isInvalid && (
                    <InputGroupAddon
                      align="inline-end"
                      className="text-destructive"
                    >
                      <HugeiconsIcon icon={MultiplicationSignIcon} />
                    </InputGroupAddon>
                  )}
                </InputGroup>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <InputPassword
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  disabled={isPending}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <Button
        type="submit"
        form="sign-in-form"
        className="mt-6 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner /> Signing in
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  )
}
