import { Link } from '@tanstack/react-router'

import { AppLogo } from '@/components/global/app-logo'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SIGN_UP_FORM } from '@/features/auth/constants'
import { SignUpForm } from '@/features/auth/ui/components/sign-up-form'
import { HasAccountLink } from '@/features/auth/ui/components/has-account-link'

export const SignUpView = () => {
  return (
    <>
      <Card className="bg-transparent shadow-none ring-0">
        <CardHeader className="gap-0">
          <AppLogo className="size-8" />

          <CardTitle className="mt-4 mb-1 text-xl font-semibold">
            {SIGN_UP_FORM.title}
          </CardTitle>
          <CardDescription>{SIGN_UP_FORM.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter>
          <HasAccountLink type="sign-up" />
        </CardFooter>
      </Card>

      <div className="text-muted-foreground px-4 text-center text-xs text-balance">
        By Signing Up, you agree to our{' '}
        <Button
          variant="link"
          size="sm"
          className="p-0 text-xs text-balance"
          asChild
        >
          <Link to=".">Terms of Service</Link>
        </Button>{' '}
        and{' '}
        <Button
          variant="link"
          size="sm"
          className="p-0 text-xs text-balance"
          asChild
        >
          <Link to=".">Privacy Policy</Link>
        </Button>
      </div>
    </>
  )
}
