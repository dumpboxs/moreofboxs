import { LayoutDashboardIcon, SettingsIcon } from 'lucide-react'
import { Link, useRouter } from '@tanstack/react-router'
import { LogoutIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { toast } from 'sonner'
import type { auth } from '@/lib/auth'
import { GeneratedAvatar } from '@/components/global/generate-avatar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/generated/prisma/enums'
import { signOut } from '@/lib/auth/client'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

type Props = {
  user: typeof auth.$Infer.Session.user
}

const AvatarUser = ({ user }: Props) => {
  if (!user.image) {
    return (
      <GeneratedAvatar
        seed={user.name}
        style="notionistsNeutral"
        className="size-7 rounded-sm"
      />
    )
  }

  return (
    <Avatar className="size-7 rounded-sm after:border-none">
      <AvatarImage
        src={user.image}
        alt={user.name}
        className="size-7 rounded-sm"
      />
      <AvatarFallback className="size-7 rounded-sm uppercase">
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}

export const UserDropdownMenu = ({ user }: Props) => {
  const router = useRouter()
  const isMobile = useIsMobile()

  const onSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('You have been signed out')
          router.invalidate()
        },
        onError: (ctx) => {
          toast.error('Sign out failed', {
            description: ctx.error.message,
          })
        },
      },
    })
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <AvatarUser user={user} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="font-normal">
            <div className="flex items-center gap-2 text-left text-sm">
              <AvatarUser user={user} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <DrawerTitle className="truncate font-semibold">
                  {user.name}
                </DrawerTitle>
                <DrawerDescription className="truncate text-xs">
                  {user.email}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <div className="grid gap-2 px-4">
            {user.role === UserRole.admin && (
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="." viewTransition={true}>
                    <LayoutDashboardIcon />
                    Dashboard
                  </Link>
                </Button>
              </DrawerClose>
            )}

            <DrawerClose asChild>
              <Button variant="ghost" className="w-full">
                <SettingsIcon />
                Settings
              </Button>
            </DrawerClose>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="default" onClick={onSignOut} className="w-full">
                <HugeiconsIcon icon={LogoutIcon} />
                Sign out
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <AvatarUser user={user} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={16}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <AvatarUser user={user} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.username}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {user.role === UserRole.admin && (
            <DropdownMenuItem asChild>
              <Link to=".">
                <LayoutDashboardIcon />
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onSignOut}>
            <HugeiconsIcon icon={LogoutIcon} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
