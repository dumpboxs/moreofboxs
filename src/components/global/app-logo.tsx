import { motion } from 'motion/react'

import { Link } from '@tanstack/react-router'
import { BoxsIcon } from '@/components/global/boxs-icon'

import { cn } from '@/lib/utils'

const MotionLink = motion.create(Link)

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <MotionLink
      to="/"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      viewTransition={true}
      className="size-fit"
    >
      <BoxsIcon className={cn(className)} />
      <span className="sr-only">Go to homepage</span>
    </MotionLink>
  )
}
