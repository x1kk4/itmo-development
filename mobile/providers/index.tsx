import { QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { AuthProvider } from './AuthContext'

import { ThemeProvider as DynamicTheme, useThemeContext } from './ThemeContext'

import { TamaguiProvider } from 'tamagui'
import { ToastProvider, ToastViewport } from '@tamagui/toast'

import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import { tamaguiConfig } from '../tamagui.config'
import { queryClient } from '@/api/hooks'
import { Toast } from '@/ui/Toast'

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
        <ToastProvider swipeDirection={'down'}>
          <AuthProvider>
            <Toast />
            <ToastViewport
              bottom={'$4'}
              left={'$2'}
              right={'$2'}
            />
            {children}
          </AuthProvider>
        </ToastProvider>
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
