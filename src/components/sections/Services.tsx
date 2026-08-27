import { motion } from 'framer-motion'
import { useState } from 'react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'
import ServiceCard from '@/components/sections/ServiceCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { SERVICES } from '@/constants/services'
import { useIsLoading } from '@/context/LoadingContext'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

const AUTOPLAY_DELAY_MS = 4000
const SLIDE_TRANSITION_MS = 1200

const EXIT_TRANSITION = { duration: 0.4, ease: 'easeInOut' } as const

const carouselVariants = {
  hidden: { opacity: 0, y: 50, transition: EXIT_TRANSITION },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const paginationVariants = {
  hidden: { opacity: 0, y: 20, transition: EXIT_TRANSITION },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
}

function Services() {
  const isHeld = useIsLoading()
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const handlePaginationClick = (index: number) => {
    swiper?.slideToLoop(index)
  }

  return (
    <section id="servicos" className="bg-muted overflow-hidden py-6 md:py-8">
      <div className="container mx-auto px-2">
        <SectionTitle
          title="Conheça nossos serviços:"
          subtitle="Deslize para ver todos os nossos serviços"
        />

        <motion.div
          variants={carouselVariants}
          initial="hidden"
          whileInView={isHeld ? undefined : 'visible'}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView={3}
            spaceBetween={0}
            speed={SLIDE_TRANSITION_MS}
            autoplay={{
              delay: AUTOPLAY_DELAY_MS,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 25,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false,
            }}
            modules={[Autoplay, EffectCoverflow]}
            className="mySwiper"
            onSwiper={setSwiper}
            onSlideChange={(s) => setActiveIndex(s.realIndex % SERVICES.length)}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 0 },
              1024: { slidesPerView: 3, spaceBetween: 0 },
            }}
          >
            {SERVICES.map((service) => (
              <SwiperSlide key={service.title}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="mt-0 mb-4 flex flex-wrap justify-center gap-2"
          variants={paginationVariants}
          initial="hidden"
          whileInView={isHeld ? undefined : 'visible'}
          viewport={{ once: false }}
        >
          {SERVICES.map((service, index) => (
            <motion.button
              key={service.title}
              onClick={() => handlePaginationClick(index)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-primary h-2.5 w-2.5 shadow-lg'
                  : 'hover:bg-primary h-2 w-2 bg-gray-400'
              }`}
              aria-label={`Ir para o slide ${index + 1}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={activeIndex === index ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
