import { motion } from 'framer-motion'
import dog from '@/assets/dog.svg'
import { useIsLoading } from '@/context/LoadingContext'
import { scrollToSection } from '@/lib/scroll'

const TITLE = 'A felicidade do seu animal de estimação é a nossa'
const TITLE_WORDS = TITLE.split(' ')

const EXIT_TRANSITION = { duration: 0.4, ease: 'easeInOut' } as const

const containerVariants = {
  hidden: { opacity: 0, transition: EXIT_TRANSITION },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.3, rotateY: -180, rotateX: 20, transition: EXIT_TRANSITION },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    transition: { type: 'spring' as const, damping: 15, stiffness: 80, duration: 1.2 },
  },
}

const textVariants = {
  hidden: { opacity: 0, x: -100, filter: 'blur(10px)', transition: EXIT_TRANSITION },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, damping: 20, stiffness: 100, duration: 0.8 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 90, transition: EXIT_TRANSITION },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.1, type: 'spring' as const, damping: 12, stiffness: 100 },
  }),
}

const priorityVariants = {
  hidden: { opacity: 0, scale: 0, transition: EXIT_TRANSITION },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 10,
      stiffness: 100,
      delay: TITLE_WORDS.length * 0.1 + 0.3,
    },
  },
}

const paragraphVariants = {
  hidden: { opacity: 0, y: 30, transition: EXIT_TRANSITION },
  visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } },
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0, y: 50, transition: EXIT_TRANSITION },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 10, stiffness: 100, delay: 1 },
  },
  hover: {
    scale: 1.1,
    boxShadow: '0 20px 60px rgba(255, 111, 49, 0.4)',
    transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
}

function Hero() {
  const isHeld = useIsLoading()
  const revealKey = isHeld ? 'held' : 'revealed'

  return (
    <section id="home" className="relative overflow-hidden py-25 md:py-15">
      <motion.div
        key={revealKey}
        className="bg-background relative z-10 container mx-auto px-8 py-10 md:py-28"
        variants={containerVariants}
        initial="hidden"
        whileInView={isHeld ? undefined : 'visible'}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="flex flex-col items-center gap-16 md:flex-row md:gap-0">
          <motion.div className="flex flex-1 items-center justify-center" variants={imageVariants}>
            <motion.div
              className="relative flex h-64 w-64 items-end justify-center overflow-visible rounded-3xl bg-[#C6DBC1] shadow-lg md:h-80 md:w-80"
              animate={{ y: [0, -10, 0, 10, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{
                y: { duration: 6.3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 12.6, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ boxShadow: '0 25px 50px rgba(255, 111, 49, 0.3)' }}
            >
              <span className="absolute bottom-0 text-8xl">
                <img
                  src={dog}
                  alt="Dog"
                  className="h-full w-full translate-y-6 object-contain md:translate-y-8"
                />
              </span>

              <motion.div
                className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-[#FF6F31]/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>

          <motion.div className="flex-1 text-center md:text-left" variants={textVariants}>
            <h1 className="text-foreground mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              {TITLE_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView={isHeld ? undefined : 'visible'}
                  viewport={{ once: false }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block text-[#FF6F31]"
                variants={priorityVariants}
                initial="hidden"
                whileInView={isHeld ? undefined : 'visible'}
                viewport={{ once: false }}
              >
                prioridade.
              </motion.span>
            </h1>

            <motion.p
              className="text-muted-foreground mb-8 max-w-lg text-base md:text-lg"
              variants={paragraphVariants}
              initial="hidden"
              whileInView={isHeld ? undefined : 'visible'}
              viewport={{ once: false }}
            >
              O Petland petshop é uma opção conveniente e completa para os donos de animais de
              estimação, que desejam cuidar da saúde e do bem-estar dos seus pets. Com uma variedade
              de serviços, é possível encontrar tudo o que o animal precisa em um único lugar,
              garantindo comodidade e praticidade para o dono e felicidade e saúde para o animal.
            </motion.p>

            <motion.button
              onClick={() => scrollToSection('#sobre')}
              className="relative cursor-pointer overflow-hidden rounded-lg bg-[#FF6F31] px-8 py-4 font-semibold text-white shadow-md"
              variants={buttonVariants}
              initial="hidden"
              whileInView={isHeld ? undefined : 'visible'}
              viewport={{ once: false }}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%', skewX: -15 }}
                whileHover={{ x: '100%', transition: { duration: 0.6 } }}
              />
              <span className="relative z-10">Saiba mais</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
