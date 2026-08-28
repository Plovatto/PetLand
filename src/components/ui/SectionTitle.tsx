import { motion } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'
import { useIsLoading } from '@/context/LoadingContext'

type SectionTitleProps = {
  title: string
  subtitle?: string
}

const EXIT_TRANSITION = { duration: 0.4, ease: 'easeInOut' } as const

const containerVariants = {
  hidden: { opacity: 0, y: -30, transition: EXIT_TRANSITION },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const titleVariants = {
  hidden: { opacity: 0, scale: 0.8, transition: EXIT_TRANSITION },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
}

const subtitleVariants = {
  hidden: { opacity: 0, transition: EXIT_TRANSITION },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
}

function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const isHeld = useIsLoading()

  return (
    <motion.div
      key={isHeld ? 'held' : 'revealed'}
      className="mb-4 text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView={isHeld ? undefined : 'visible'}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.h2
        className="text-primary mb-1 text-4xl font-bold"
        variants={titleVariants}
        initial="hidden"
        whileInView={isHeld ? undefined : 'visible'}
        viewport={{ once: false, amount: 0.3 }}
      >
        <AnimatedText>{title}</AnimatedText>
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-muted-foreground text-xs"
          variants={subtitleVariants}
          initial="hidden"
          whileInView={isHeld ? undefined : 'visible'}
          viewport={{ once: false, amount: 0.3 }}
        >
          <AnimatedText>{subtitle}</AnimatedText>
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionTitle
