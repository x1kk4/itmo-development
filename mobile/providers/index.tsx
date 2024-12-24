import { QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { AuthProvider } from './AuthContext'

import { ThemeProvider as DynamicTheme, useThemeContext } from './ThemeContext'

import { TamaguiProvider } from 'tamagui'

import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import { tamaguiConfig } from '../tamagui.config'
import { queryClient } from '@/api/hooks'

const ProvidersWithoutDynamicTheme: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useThemeContext()

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        style={theme === 'dark' ? 'light' : 'dark'}
        animated={true}
        // backgroundColor={theme === 'dark' ? 'black' : 'white'} // android
        translucent={Platform.OS === 'android'}
      />
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={theme}
        // key={theme}
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
