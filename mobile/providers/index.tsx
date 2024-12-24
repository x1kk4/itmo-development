import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { AuthProvider } from './AuthContext'

import { ThemeProvider as DynamicTheme, useThemeContext } from './ThemeContext'

import { TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '../tamagui.config'

export const queryClient = new QueryClient()

const ProvidersWithoutDynamicTheme: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useThemeContext()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={theme}
      >
        <AuthProvider>{children}</AuthProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <DynamicTheme>
      <ProvidersWithoutDynamicTheme>{children}</ProvidersWithoutDynamicTheme>
    </DynamicTheme>
  )
}

export { Providers }
