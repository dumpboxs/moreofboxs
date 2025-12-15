import {
  AtIcon,
  MailIcon,
  MultiplicationSignIcon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useSignUp } from '@/features/auth/hooks/use-sign-up'
import { InputPassword } from '@/features/auth/ui/components/input-password'
import { Spinner } from '@/components/ui/spinner'

export const SignUpForm = () => {
  const { form, isPending } = useSignUp()
  const isSubmitting = form.state.isSubmitting || isPending

  return (
    <form
      id="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-4">
        <form.Field
          name="name"
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
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />

                  <InputGroupAddon>
                    <HugeiconsIcon icon={UserIcon} />
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
          name="email"
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
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />

                  <InputGroupAddon>
                    <HugeiconsIcon icon={MailIcon} />
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
                  autoComplete="new-password"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="confirmPassword"
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
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <Button
        type="submit"
        form="sign-up-form"
        className="mt-6 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner /> Signing up
          </>
        ) : (
          'Sign Up'
        )}
      </Button>
    </form>
  )
}
