import React, { useCallback, useContext, useMemo, useState } from 'react'
import { TUser } from './types'
import { ROLE } from '@/router/types'
import { produce } from 'immer'

export type TAuthContextShape = {
  user: TUser
  changeRole: (role: ROLE) => void
}
const AuthContext = React.createContext<TAuthContextShape>({} as TAuthContextShape)

export type TAuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props

  const [userData, setUserData] = useState<TUser>({
    role: ROLE.UNAUTHORIZED,
    username: 'mama azazina',
    email: 'angular@gmail.com',
  })

  const changeRole = useCallback(
    (role: ROLE) =>
      setUserData(
        produce((draft) => {
          draft.role = role
        }),
      ),
    [setUserData],
  )

  const value: TAuthContextShape = useMemo(
    () => ({
      user: userData,
      changeRole,
    }),
    [userData, changeRole],
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
