import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"]'
const RING_SPRING = { damping: 30, stiffness: 300, mass: 0.5 }
const TRAIL_MIN_DISTANCE = 28
const TRAIL_LIFETIME_MS = 1400

type PawPrint = {
  id: number
  x: number
  y: number
  rotation: number
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="15.5" r="5" />
      <circle cx="4.5" cy="9" r="2.3" />
      <circle cx="9.5" cy="4" r="2.3" />
      <circle cx="14.5" cy="4" r="2.3" />
      <circle cx="19.5" cy="9" r="2.3" />
    </svg>
  )
}

function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<PawPrint[]>([])

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const ringX = useSpring(cursorX, RING_SPRING)
  const ringY = useSpring(cursorY, RING_SPRING)

  const lastTrailPoint = useRef({ x: 0, y: 0 })
  const nextTrailId = useRef(0)

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      setIsVisible(true)
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)

      const dx = event.clientX - lastTrailPoint.current.x
      const dy = event.clientY - lastTrailPoint.current.y
      if (Math.hypot(dx, dy) < TRAIL_MIN_DISTANCE) return

      lastTrailPoint.current = { x: event.clientX, y: event.clientY }
      const id = nextTrailId.current++
      setTrail((prev) => [
        ...prev,
        {
          id,
          x: event.clientX,
          y: event.clientY,
          rotation: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
        },
      ])
      setTimeout(() => {
        setTrail((prev) => prev.filter((paw) => paw.id !== id))
      }, TRAIL_LIFETIME_MS)
    }

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const target = event.target as HTMLElement
      setIsHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)))
    }

    const handlePointerLeave = () => setIsVisible(false)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerover', handlePointerOver)
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerover', handlePointerOver)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {trail.map((paw) => (
        <motion.div
          key={paw.id}
          className="pointer-events-none fixed top-0 left-0 z-[9999] text-[#FF6F31]"
          style={{
            x: paw.x,
            y: paw.y,
            translateX: '-50%',
            translateY: '-50%',
            rotate: paw.rotation,
          }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: TRAIL_LIFETIME_MS / 1000, ease: 'easeOut' }}
        >
          <PawIcon className="h-4 w-4" />
        </motion.div>
      ))}

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] text-[#FF6F31]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <PawIcon className="h-5 w-5" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full border-2 border-[#FF6F31]/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}

export default CustomCursor
