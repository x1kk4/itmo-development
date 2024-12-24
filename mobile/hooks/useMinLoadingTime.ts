import { useState, useEffect } from 'react'

export const useMinLoadingTime = (isLoading: boolean, minLoadTimeMs: number = 2000) => {
  const [isMinLoadTimeComplete, setIsMinLoadTimeComplete] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinLoadTimeComplete(true)
    }, minLoadTimeMs)

    return () => clearTimeout(timer)
  }, [minLoadTimeMs])

  return isLoading || !isMinLoadTimeComplete
}
