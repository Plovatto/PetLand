import { useState } from 'react'
import type { ReactNode } from 'react'
import { TransitionContext } from '@/context/TransitionContext'
import { scrollToSection } from '@/lib/scroll'

const SCROLL_DELAY_MS = 400
const OVERLAY_LINGER_MS = 1000

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = (href: string) => {
    setIsTransitioning(true)

    setTimeout(() => {
      scrollToSection(href)
      setTimeout(() => setIsTransitioning(false), OVERLAY_LINGER_MS)
    }, SCROLL_DELAY_MS)
  }

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}
