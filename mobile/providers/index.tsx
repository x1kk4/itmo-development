import {
  // DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
// import { useColorScheme } from 'react-native'
import { AuthProvider } from './AuthContext'

export const queryClient = new QueryClient()

const Providers: FC<PropsWithChildren> = ({ children }) => {
  // const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <ThemeProvider value={DefaultTheme}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export { Providers }
