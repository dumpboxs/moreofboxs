import { Activity } from 'react'
import { useRouteContext } from '@tanstack/react-router'
import { AppLogo } from '@/components/global/app-logo'
import { ThemeModeToggle } from '@/components/global/theme-mode-toggle'
import {
  NavHeaderDesktop,
  NavHeaderMobile,
} from '@/features/main/components/nav-header'
import { AuthButtonHeader } from '@/features/main/components/auth-button-header'
import { UserDropdownMenu } from '@/features/main/components/user-dropdown-menu'
import { Separator } from '@/components/ui/separator'

export const MainHeader = () => {
  const { auth } = useRouteContext({ from: '__root__' })

  return (
    <header className="bg-background/65 supports-backdrop-filter:bg-background/65 fixed top-0 right-0 left-0 z-50 h-16 w-full border-b border-dashed backdrop-blur-sm">
      <div className="container flex h-full items-center justify-between border-dashed p-4 lg:border-x">
        <div className="flex items-center gap-4">
          <AppLogo className="size-7" />
          <NavHeaderDesktop />
        </div>

        <div className="flex items-center gap-2">
          <Activity mode={auth?.user ? 'hidden' : 'visible'}>
            <AuthButtonHeader />
            <Separator orientation="vertical" />
          </Activity>

          <ThemeModeToggle />

          <Activity mode={auth?.user ? 'visible' : 'hidden'}>
            <Separator orientation="vertical" />
          </Activity>

          {/* Desktop user menu */}
          {auth?.user && <UserDropdownMenu user={auth.user} />}
          <NavHeaderMobile />
        </div>
      </div>
    </header>
  )
}
