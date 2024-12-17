import { useMe } from '@/api/hooks/auth/useMe'
import { TUser } from '@/api/types'
import React, { useContext, useMemo } from 'react'

export type TAuthContextShape = {
  user: TUser
}

const AuthContext = React.createContext<TAuthContextShape>({} as TAuthContextShape)

export type TAuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props

  const { data: me } = useMe()

  const value: TAuthContextShape = useMemo(() => ({}), [])

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
