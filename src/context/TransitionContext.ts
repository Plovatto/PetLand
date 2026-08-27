import { createContext, useContext } from 'react'

type TransitionContextValue = {
  isTransitioning: boolean
  startTransition: (href: string) => void
}

export const TransitionContext = createContext<TransitionContextValue>({
  isTransitioning: false,
  startTransition: () => {},
})

export function useTransition() {
  return useContext(TransitionContext)
}
