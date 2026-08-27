import { createContext, useContext } from 'react'

export const LoadingContext = createContext(true)

export function useIsLoading() {
  return useContext(LoadingContext)
}
