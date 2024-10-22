import React, { useContext, useMemo } from 'react'

import { useCoach } from '@/utils/hooks/useCoach'
import { TGetCoachResponse } from '@/api'

export type TCoachContextShape = {
  coachId: number
  coachData?: TGetCoachResponse
}
const CoachContext = React.createContext<TCoachContextShape>({} as TCoachContextShape)

export type TCoachProviderProps = {
  children: React.ReactNode
  coachId: number
}

const CoachProvider = (props: TCoachProviderProps) => {
  const { children, coachId } = props
  const { data: coachData } = useCoach(coachId)

  const value: TCoachContextShape = useMemo(() => {
    return {
      coachId,
      coachData,
    }
  }, [coachId, coachData])

  return <CoachContext.Provider value={value}>{children}</CoachContext.Provider>
}

const useCoachContext = () => {
  const context = useContext(CoachContext)

  if (!context || !Object.keys(context).length) {
    throw new Error('useCoachContext was used outside of its Provider')
  }

  return context
}

export { CoachContext, useCoachContext, CoachProvider }
