import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { LoadingContext } from '@/context/LoadingContext'

const LOADING_DURATION_MS = 2000

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  return <LoadingContext.Provider value={isLoading}>{children}</LoadingContext.Provider>
}
