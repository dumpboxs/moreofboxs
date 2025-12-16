import { Menu01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useLocation } from '@tanstack/react-router'
import { AppLogo } from '@/components/global/app-logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blogs',
    label: 'Blog',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
] as const

type Props = React.ComponentProps<'nav'>

export const NavHeaderDesktop = ({ className, ...props }: Props) => {
  const { pathname } = useLocation()

  return (
    <nav className={cn('block max-md:hidden', className)} {...props}>
      <ul className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Button
              variant={
                pathname === link.href && link.href !== '/'
                  ? 'secondary'
                  : 'ghost'
              }
              asChild
            >
              <Link to={link.href} viewTransition={true}>
                {link.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const NavHeaderMobile = ({ className, ...props }: Props) => {
  const { pathname } = useLocation()

  return (
    <nav className={cn('hidden max-md:block', className)} {...props}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <HugeiconsIcon icon={Menu01FreeIcons} />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <AppLogo className="size-7" />
              <span className="text-lg">BoxsLog</span>
            </SheetTitle>
            <SheetDescription>Navigation Menu</SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 px-4">
            {NAV_LINKS.map(({ href, label }) => (
              <SheetClose key={href} asChild>
                <Button
                  variant={pathname === href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={href} viewTransition={true}>
                    {label}
                  </Link>
                </Button>
              </SheetClose>
            ))}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
