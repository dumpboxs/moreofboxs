import {
  FacebookIcon,
  Link02Icon,
  ThreadsFreeIcons,
  TwitterIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props extends React.ComponentProps<typeof DropdownMenu> {
  blogTitle: string
  blogUrl: string
}

export const ShareMenuDropdown = ({
  blogTitle,
  blogUrl,
  children,
  ...props
}: Props) => {
  const SHARE_LINKS = useMemo(() => {
    return {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`,
      threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogUrl)}`,
    }
  }, [blogTitle, blogUrl])

  const onCopyClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(blogUrl)
      toast.success('Blog URL copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy blog URL to clipboard', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
      console.error('Failed to copy blog URL to clipboard', error)
    }
  }, [blogUrl])

  const shareOnSocials = useCallback((platformUrl: string) => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem onSelect={onCopyClipboard}>
          <HugeiconsIcon icon={Link02Icon} />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => shareOnSocials(SHARE_LINKS.x)}>
          <HugeiconsIcon icon={TwitterIcon} />
          Share on Twitter
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => shareOnSocials(SHARE_LINKS.facebook)}>
          <HugeiconsIcon icon={FacebookIcon} />
          Share on Facebook
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => shareOnSocials(SHARE_LINKS.threads)}>
          <HugeiconsIcon icon={ThreadsFreeIcons} />
          Share on Threads
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
