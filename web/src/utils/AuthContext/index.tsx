import React, { useContext, useMemo } from 'react'
import { TUser } from './types'
import { ROLE } from '@/router/types'

export type TAuthContextShape = {
  user: TUser
}
const AuthContext = React.createContext<TAuthContextShape>({} as TAuthContextShape)

export type TAuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props

  const value: TAuthContextShape = useMemo(
    () => ({
      user: {
        role: ROLE.PARENT,
        username: 'mama azazina',
        email: 'angular@gmail.com',
      },
    }),
    [],
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
