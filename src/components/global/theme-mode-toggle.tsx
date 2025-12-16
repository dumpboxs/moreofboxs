'use client'

import { CheckIcon } from 'lucide-react'

import { Moon01FreeIcons, Sun01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTheme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <HugeiconsIcon
            icon={Sun01FreeIcons}
            className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
          <HugeiconsIcon
            icon={Moon01FreeIcons}
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
          {theme === 'light' && <CheckIcon className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
          {theme === 'dark' && <CheckIcon className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
          {theme === 'system' && <CheckIcon className="ml-auto" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
