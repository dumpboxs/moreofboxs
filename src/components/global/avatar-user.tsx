import type { auth } from '@/lib/auth'
import { GeneratedAvatar } from '@/components/global/generate-avatar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export const AvatarUser = ({
  user,
  className,
}: {
  user: typeof auth.$Infer.Session.user
  className?: string
}) => {
  if (!user.image) {
    return (
      <GeneratedAvatar
        seed={user.name}
        style="notionistsNeutral"
        className={cn('size-7 rounded-sm', className)}
      />
    )
  }

  return (
    <Avatar className={cn('size-7 rounded-sm after:border-none', className)}>
      <AvatarImage
        src={user.image}
        alt={user.name}
        className={cn('size-7 rounded-sm', className)}
      />
      <AvatarFallback className={cn('size-7 rounded-sm uppercase', className)}>
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
