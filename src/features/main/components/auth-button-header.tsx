import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const AuthButtonHeader = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="max-md:hidden" asChild>
        <Link to="/sign-in" viewTransition={true}>
          Sign In
        </Link>
      </Button>

      <Button variant="default" asChild>
        <Link to="/sign-up" viewTransition={true}>
          Get Started
        </Link>
      </Button>
    </div>
  )
}
