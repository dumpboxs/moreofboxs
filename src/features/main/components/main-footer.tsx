import {
  GithubIcon,
  InstagramIcon,
  SpotifyIcon,
  TwitterIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { AppLogo } from '@/components/global/app-logo'
import { Button } from '@/components/ui/button'
import { APP_CONSTANTS } from '@/constants'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const resources = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/blogs',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
]

const socialLinks = [
  {
    icon: GithubIcon,
    name: 'Github',
    link: 'https://github.com/mrboxs',
  },
  {
    icon: InstagramIcon,
    name: 'Instagram',
    link: 'https://instagram.com/mrboxs',
  },
  {
    icon: TwitterIcon,
    name: 'Twitter',
    link: 'https://twitter.com/isntboxs',
  },
  {
    icon: SpotifyIcon,
    name: 'Spotify',
    link: 'https://open.spotify.com/artist/1Urv81hjLZGr0B1VhKEbG6?si=wLT27pR6SaGUUwG3k-k8vQ',
  },
]

export function MainFooter() {
  return (
    <footer className="relative w-full">
      <div className={cn('container mx-auto border-dashed px-2 lg:border-x')}>
        <div className="absolute inset-x-0 h-px w-full border-t border-dashed" />

        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <AppLogo className="size-7" />

            <p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
              {APP_CONSTANTS.description}
            </p>
          </div>

          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Resources</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <Link
                  key={title}
                  to={href}
                  viewTransition={true}
                  className="w-max text-sm hover:underline"
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Company</span>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {socialLinks.map((item, index) => (
                <Tooltip key={`social-${item.link}-${index}`}>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <HugeiconsIcon icon={item.icon} />
                      </a>
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 h-px w-full border-t border-dashed" />

        <div className="flex w-full flex-col justify-between gap-2 py-4">
          <p className="text-muted-foreground text-center text-sm font-light">
            &copy; {new Date().getFullYear()} {APP_CONSTANTS.name}, All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
