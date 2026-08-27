import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import cat from '@/assets/cat.svg'
import { ClockIcon, LocationIcon, PhoneIcon } from '@/components/ui/icons'
import { useIsLoading } from '@/context/LoadingContext'

const EXIT_TRANSITION = { duration: 0.4, ease: 'easeInOut' } as const
const EASE_OUT_EXPO = [0.6, -0.05, 0.01, 0.99] as const

const headingVariants = {
  hidden: { opacity: 0, y: 60, transition: EXIT_TRANSITION },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -60, transition: EXIT_TRANSITION },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const slideInRightVariants = {
  hidden: { opacity: 0, x: 60, transition: EXIT_TRANSITION },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const staggerContainerVariants = {
  hidden: { opacity: 0, transition: EXIT_TRANSITION },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

const infoItemVariants = {
  hidden: { opacity: 0, y: 60, transition: EXIT_TRANSITION },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180, transition: EXIT_TRANSITION },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, damping: 12, stiffness: 100 },
  },
}

const catDesktopVariants = {
  hidden: { opacity: 0, y: -30, transition: EXIT_TRANSITION },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
}

const catMobileVariants = {
  hidden: { opacity: 0, scale: 0.8, transition: EXIT_TRANSITION },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.6 } },
}

function fadeVariants(delay: number) {
  return {
    hidden: { opacity: 0, transition: EXIT_TRANSITION },
    visible: { opacity: 1, transition: { delay, duration: 0.6 } },
  }
}

type InfoItemProps = {
  icon: ReactNode
  children: ReactNode
}

function InfoItem({ icon, children }: InfoItemProps) {
  return (
    <motion.div className="flex items-start gap-4" variants={infoItemVariants}>
      <motion.div
        className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        variants={iconVariants}
        whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
      >
        {icon}
      </motion.div>
      <div>{children}</div>
    </motion.div>
  )
}

function About() {
  const isLoading = useIsLoading()
  const revealed = isLoading ? undefined : 'visible'

  return (
    <section id="sobre" className="bg-background py-10 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-4 pl-2 text-start md:pl-10 lg:mb-8"
          variants={headingVariants}
          initial="hidden"
          whileInView={revealed}
          viewport={{ once: false }}
        >
          <h2 className="text-primary pb-2 text-3xl font-bold">Sobre nós:</h2>
        </motion.div>

        <div className="flex flex-col-reverse gap-4 lg:grid lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="rounded-2xl p-6 md:p-8"
            variants={slideInLeftVariants}
            initial="hidden"
            whileInView={revealed}
            viewport={{ once: false }}
          >
            <motion.div
              className="space-y-6"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView={revealed}
              viewport={{ once: false }}
            >
              <InfoItem icon={<LocationIcon className="h-5 w-5 text-white" />}>
                <p className="text-foreground font-medium">
                  Atendemos na Rua dos Animais, 123 - Centro, Cidade - Taquara
                </p>
              </InfoItem>

              <InfoItem icon={<PhoneIcon className="h-5 w-5 text-white" />}>
                <p className="text-foreground mb-1 font-medium">
                  Serviço de tele busca e agendamento pelo telefone:
                </p>
                <p className="text-muted-foreground">WhatsApp: 51 994487156</p>
                <p className="text-muted-foreground">Telefone: 51 3542 7544</p>
              </InfoItem>

              <InfoItem icon={<ClockIcon className="h-5 w-5 text-white" />}>
                <p className="text-foreground mb-1 font-medium">Horário de funcionamento:</p>
                <p className="text-muted-foreground">De segunda a sexta, das 8h às 18h;</p>
                <p className="text-muted-foreground">Sábados, das 9h às 13h</p>
              </InfoItem>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex flex-col items-center justify-center"
            variants={slideInRightVariants}
            initial="hidden"
            whileInView={revealed}
            viewport={{ once: false }}
          >
            <div className="relative w-full">
              <motion.div
                className="absolute -top-28 left-2/3 z-10 hidden -translate-x-1/4 lg:block"
                variants={catDesktopVariants}
                initial="hidden"
                whileInView={revealed}
                viewport={{ once: false }}
              >
                <img src={cat} alt="Cat" className="h-40 w-40 object-contain drop-shadow-2xl" />
              </motion.div>

              <motion.div
                className="absolute -top-18 right-8 z-10 lg:hidden"
                variants={catMobileVariants}
                initial="hidden"
                whileInView={revealed}
                viewport={{ once: false }}
              >
                <img src={cat} alt="Cat" className="h-28 w-28 object-contain drop-shadow-2xl" />
              </motion.div>

              <div className="mt-4 rounded-3xl border-2 p-6 shadow-md md:p-8 lg:pt-8">
                <motion.p
                  className="text-muted-foreground mt-6 mb-4 text-xs leading-relaxed md:text-base"
                  variants={fadeVariants(0.3)}
                  initial="hidden"
                  whileInView={revealed}
                  viewport={{ once: false }}
                >
                  Ao escolher o PetLand, você pode ter certeza de que todos os aspectos serão
                  cuidadosamente avaliados e levados em consideração. Nós trabalhamos apenas com
                  produtos de alta qualidade e marcas reconhecidas no mercado, garantindo que seu
                  animal de estimação receba os melhores cuidados possíveis. Além disso, nossa
                  equipe é formada apenas por profissionais qualificados e experientes.
                </motion.p>
                <motion.p
                  className="text-muted-foreground text-xs leading-relaxed md:text-base"
                  variants={fadeVariants(0.5)}
                  initial="hidden"
                  whileInView={revealed}
                  viewport={{ once: false }}
                >
                  Por tudo isso, estamos confiantes de que escolher o nosso petshop é a escolha
                  certa para garantir o bem-estar e a felicidade do seu animal de estimação. Venha
                  nos visitar e conhecer nossos espaços, nossos produtos e nossa equipe de
                  profissionais. Estamos ansiosos para recebê-lo e para cuidar do seu animal com
                  todo o carinho e dedicação que ele merece.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
