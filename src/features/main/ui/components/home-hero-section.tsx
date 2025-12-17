import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { APP_CONSTANTS } from '@/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const HERO_SECTION_WORDING = {
  headline: `${APP_CONSTANTS.name}: my space to learn, write, and grow`,
  subHeadline:
    'here, i document the things i learn, the tools i explore, and the small breakthroughs that shape my journey. hopefully these notes help someone out there — or at least future me.',
} as const

const containerVariant: Variants = {
  to: {
    transition: {
      delayChildren: 0.05,
    },
  },
}

const childVariant: Variants = {
  from: { opacity: 0, filter: 'blur(10px)' },
  to: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

type Props = React.ComponentProps<'section'>

export const HomeHeroSection = ({ className, ...props }: Props) => {
  return (
    <section {...props} className={cn('py-6 md:py-10', className)}>
      <motion.div
        className="container px-4"
        initial="from"
        whileInView="to"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <motion.h1
          className="text-center text-3xl font-semibold text-balance md:text-4xl xl:text-5xl"
          variants={childVariant}
        >
          {HERO_SECTION_WORDING.headline}
        </motion.h1>

        <motion.p
          className="text-muted-foreground mt-5 mb-8 text-center md:text-xl"
          variants={childVariant}
        >
          {HERO_SECTION_WORDING.subHeadline}
        </motion.p>

        <motion.div className="mx-auto flex max-w-md items-center gap-2">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            aria-label="Enter your email"
          />

          <Button>Subscribe</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
