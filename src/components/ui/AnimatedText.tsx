import { AnimatePresence, motion } from 'framer-motion'

type AnimatedTextProps = {
  className?: string
  children: string
}

const TRANSITION = { duration: 0.45, ease: 'easeInOut' } as const

function AnimatedText({ className, children }: AnimatedTextProps) {
  return (
    <span className={className} style={{ display: 'inline-grid' }}>
      <AnimatePresence initial={false}>
        <motion.span
          key={children}
          initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
          transition={TRANSITION}
          style={{ gridArea: '1 / 1' }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default AnimatedText
