import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import logo from '@/assets/logo.svg'
import AnimatedText from '@/components/ui/AnimatedText'
import { useIsLoading } from '@/context/LoadingContext'

const containerVariants: Variants = {
  initial: { opacity: 1 },
  exit: {
    opacity: 0,
    scale: 1.2,
    filter: 'blur(20px)',
    transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
  },
}

const textVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [20, 0, 0, -20],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

function PageLoader() {
  const isLoading = useIsLoading()
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-linear-to-br from-white via-orange-50 to-orange-100"
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 -m-8 rounded-full bg-linear-to-r from-orange-400 to-orange-600"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-orange-500"
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={logo} alt="PetLand Logo" className="h-16 w-16" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="mt-15 text-center"
          >
            <h2 className="mb-2 text-3xl font-bold text-orange-600">
              <AnimatedText>{t('loader.welcome')}</AnimatedText>
            </h2>
            <motion.div
              className="flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 0.2, 0.4].map((delay) => (
                <motion.span
                  key={delay}
                  className="h-3 w-3 rounded-full bg-orange-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
