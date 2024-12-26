import { TSignInRequest, TSignUpRequest } from '@/api'
import { useLogout } from '@/api/hooks/auth/useLogout'
import { useMe } from '@/api/hooks/auth/useMe'
import { useSignIn } from '@/api/hooks/auth/useSignIn'
import { useSignUp } from '@/api/hooks/auth/useSignUp'
import { TUser } from '@/api/types'
import React, { useContext, useMemo } from 'react'

export type TAuthContextShape = {
  user: TUser | null
  signIn: (data: TSignInRequest) => void
  signUp: (data: TSignUpRequest) => void
  logout: () => void
  isLoading: boolean
  isFetched: boolean
}

const AuthContext = React.createContext<TAuthContextShape>({} as TAuthContextShape)

export type TAuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props

  const { data: me, isLoading, isFetched } = useMe()
  const { mutate: signIn } = useSignIn()
  const { mutate: signUp } = useSignUp()
  const { mutate: logout } = useLogout()

  const value: TAuthContextShape = useMemo(
    () => ({
      user: me ?? null,
      signIn,
      signUp,
      logout,
      isLoading,
      isFetched,
    }),
    [me, signIn, signUp, logout, isLoading, isFetched],
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
