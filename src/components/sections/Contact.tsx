import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedText from '@/components/ui/AnimatedText'
import { ClockIcon, LocationIcon, PhoneIcon } from '@/components/ui/icons'
import { useIsLoading } from '@/context/LoadingContext'

type SubmitStatus = 'idle' | 'success' | 'error'

const STATUS_RESET_DELAY_MS = 5000

const EXIT_TRANSITION = { duration: 0.4, ease: 'easeInOut' } as const

const containerVariants = {
  hidden: { opacity: 0, transition: EXIT_TRANSITION },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, transition: EXIT_TRANSITION },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 20, stiffness: 100 },
  },
}

const inputVariants = {
  initial: { scale: 1 },
  focus: {
    scale: 1.02,
    boxShadow: '0 10px 30px rgba(255, 111, 49, 0.2)',
    transition: { type: 'spring' as const, stiffness: 300, damping: 10 },
  },
}

type ContactCardProps = {
  icon: ReactNode
  title: string
  gradientClassName: string
  hoverRotate: [number, number, number, number]
  children: ReactNode
}

function ContactCard({ icon, title, gradientClassName, hoverRotate, children }: ContactCardProps) {
  return (
    <motion.div
      data-cursor-invert
      className={`rounded-3xl p-8 text-white shadow-xl ${gradientClassName}`}
      variants={itemVariants}
      whileHover={{ scale: 1.02, rotate: hoverRotate, transition: { duration: 0.3 } }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
          whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5 } }}
        >
          {icon}
        </motion.div>
        <div>
          <h3 className="mb-2 text-xl font-bold">
            <AnimatedText>{title}</AnimatedText>
          </h3>
          <p className="opacity-90">{children}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Contact() {
  const isLoading = useIsLoading()
  const { t } = useTranslation()
  const revealed = isLoading ? undefined : 'visible'

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSubmitStatus('success')
      formRef.current?.reset()
    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), STATUS_RESET_DELAY_MS)
    }
  }

  return (
    <section
      id="contact"
      className="from-background bg-linear-to-b to-orange-50/30 py-16 md:py-24 md:pt-5"
    >
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView={revealed}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <h2 className="mb-4 bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            <AnimatedText>{t('contact.title')}</AnimatedText>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            <AnimatedText>{t('contact.subtitle')}</AnimatedText>
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div className="rounded-3xl bg-white p-8 shadow-xl" variants={itemVariants}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="user_name" className="mb-2 block text-sm font-medium text-gray-700">
                  <AnimatedText>{t('contact.nameLabel')}</AnimatedText>
                </label>
                <motion.input
                  id="user_name"
                  type="text"
                  name="user_name"
                  required
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full rounded-xl border-2 px-4 py-3 outline-none"
                  variants={inputVariants}
                  initial="initial"
                  whileFocus="focus"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="user_email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  <AnimatedText>{t('contact.emailLabel')}</AnimatedText>
                </label>
                <motion.input
                  id="user_email"
                  type="email"
                  name="user_email"
                  required
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full rounded-xl border-2 px-4 py-3 outline-none"
                  variants={inputVariants}
                  initial="initial"
                  whileFocus="focus"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  <AnimatedText>{t('contact.messageLabel')}</AnimatedText>
                </label>
                <motion.textarea
                  id="message"
                  rows={3}
                  name="message"
                  required
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full resize-none rounded-xl border-2 px-4 py-3 outline-none"
                  variants={inputVariants}
                  initial="initial"
                  whileFocus="focus"
                />
              </motion.div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700"
                >
                  <AnimatedText>{t('contact.successMessage')}</AnimatedText>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700"
                >
                  <AnimatedText>{t('contact.errorMessage')}</AnimatedText>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                data-cursor-invert
                className="relative w-full overflow-hidden rounded-xl bg-linear-to-r from-orange-500 to-orange-600 py-4 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                variants={itemVariants}
                whileHover={
                  isSubmitting
                    ? undefined
                    : { scale: 1.02, boxShadow: '0 20px 40px rgba(255, 111, 49, 0.3)' }
                }
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%', skewX: -15 }}
                  whileHover={{ x: '100%', transition: { duration: 0.6 } }}
                />
                <span className="relative z-10">
                  <AnimatedText>
                    {isSubmitting ? t('contact.submitSending') : t('contact.submitIdle')}
                  </AnimatedText>
                </span>
              </motion.button>
            </form>
          </motion.div>

          <motion.div className="space-y-6" variants={containerVariants}>
            <ContactCard
              icon={<LocationIcon className="h-7 w-7 text-white" />}
              title={t('contact.addressTitle')}
              gradientClassName="bg-linear-to-br from-orange-500 to-orange-600"
              hoverRotate={[0, -1, 1, 0]}
            >
              <AnimatedText>{t('contact.addressLine1')}</AnimatedText>
              <br />
              <AnimatedText>{t('contact.addressLine2')}</AnimatedText>
            </ContactCard>

            <ContactCard
              icon={<PhoneIcon className="h-7 w-7 text-white" />}
              title={t('contact.phoneTitle')}
              gradientClassName="bg-linear-to-br from-orange-400 to-orange-500"
              hoverRotate={[0, 1, -1, 0]}
            >
              <AnimatedText>{t('contact.phoneWhatsapp')}</AnimatedText>
              <br />
              <AnimatedText>{t('contact.phoneLandline')}</AnimatedText>
            </ContactCard>

            <ContactCard
              icon={<ClockIcon className="h-7 w-7 text-white" />}
              title={t('contact.hoursTitle')}
              gradientClassName="bg-linear-to-br from-orange-600 to-orange-700"
              hoverRotate={[0, -1, 1, 0]}
            >
              <AnimatedText>{t('contact.hoursWeek')}</AnimatedText>
              <br />
              <AnimatedText>{t('contact.hoursSaturday')}</AnimatedText>
            </ContactCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
