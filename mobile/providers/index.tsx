import {
  DarkTheme,
  // DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
// import { useColorScheme } from 'react-native'
import { AuthProvider } from './AuthContext'

import { TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '../tamagui.config'
import { useColorScheme } from 'react-native'

export const queryClient = new QueryClient()

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={colorScheme!}
      >
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}

export { Providers }
