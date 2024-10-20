import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TUser } from './types'
import { ROLE } from '@/router/types'
import { useClient } from '@/utils/hooks/useClient'
import { useCoach } from '@/utils/hooks/useCoach'
import { useLocalStorage } from '@uidotdev/usehooks'

const DEFAULT_PARENT_ID = 1

const DEFAULT_COACH_ID = 1

export type TAuthContextShape = {
  user: TUser | null
  authGuest: () => void
  authParent: () => void
  authCoach: () => void
  isLoading: boolean
}
const AuthContext = React.createContext<TAuthContextShape>({} as TAuthContextShape)

export type TAuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props

  const [persistRole, setPersistRole] = useLocalStorage<ROLE>('role', ROLE.UNAUTHORIZED)

  const { data: client, isLoading: isClientLoading } = useClient(DEFAULT_PARENT_ID)
  const { data: coach, isLoading: isCoachLoading } = useCoach(DEFAULT_COACH_ID)

  const [userData, setUserData] = useState<TUser | null>(null)

  const authGuest = useCallback(() => {
    setUserData({
      role: ROLE.UNAUTHORIZED,
    })
    setPersistRole(ROLE.UNAUTHORIZED)
  }, [setPersistRole])

  const authParent = useCallback(() => {
    if (client) {
      setUserData({
        role: ROLE.PARENT,
        ...client,
      })
      setPersistRole(ROLE.PARENT)
    }
  }, [client, setPersistRole])

  const authCoach = useCallback(() => {
    if (coach) {
      setUserData({
        role: ROLE.COACH,
        ...coach,
      })
      setPersistRole(ROLE.COACH)
    }
  }, [coach, setPersistRole])

  useEffect(() => {
    if (persistRole === ROLE.PARENT) {
      authParent()
      return
    }

    if (persistRole === ROLE.COACH) {
      authCoach()
      return
    }

    authGuest()
  }, [authGuest, authParent, authCoach, persistRole])

  const value: TAuthContextShape = useMemo(
    () => ({
      user: userData,
      authGuest,
      authParent,
      authCoach,
      isLoading: isClientLoading || isCoachLoading,
    }),
    [userData, authGuest, authParent, authCoach, isClientLoading, isCoachLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context || !Object.keys(context).length) {
    throw new Error('useAuthContext was used outside of its Provider')
  }

  return context
}

export { AuthContext, useAuthContext, AuthProvider }
