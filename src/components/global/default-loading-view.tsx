import { AnimatePresence, motion } from 'motion/react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

const fadeInOut = {
  initial: { opacity: 0, translateY: -10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: -10 },
}

export const DefaultLoadingView = () => {
  return (
    <AnimatePresence>
      <motion.div
        {...fadeInOut}
        className="flex min-h-svh items-center justify-center"
      >
        <div className="container w-full max-w-md grow">
          <Empty className="mx-auto">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Spinner />
              </EmptyMedia>
              <EmptyTitle>Please wait</EmptyTitle>
              <EmptyDescription>This may take a few seconds</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
