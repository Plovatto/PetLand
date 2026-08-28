import { motion } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'

type ServiceCardProps = {
  image: string
  title: string
  description: string
}

function ServiceCard({ image, title, description }: ServiceCardProps) {
  return (
    <motion.div
      className="group relative -mx-6 mx-auto h-full max-w-md overflow-hidden rounded-3xl"
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="card-gradient pointer-events-none absolute inset-0 z-20" />

      <div className="bg-card relative z-10 h-full rounded-3xl shadow-md transition-shadow duration-500 ease-out group-hover:shadow-xl">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>

        <div className="bg-white p-3 text-center">
          <h3 className="text-primary font-bold">
            <AnimatedText>{title}</AnimatedText>
          </h3>
          <p className="text-muted-foreground text-xs leading-snug">
            <AnimatedText>{description}</AnimatedText>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
