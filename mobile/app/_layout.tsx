import { useFonts } from 'expo-font'
import { Href, Stack, usePathname, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { Providers } from '@/providers'
import { useMe } from '@/api/hooks/auth/useMe'
import { SafeAreaView, Platform } from 'react-native'
import { useAuthContext } from '@/providers/AuthContext'

import { AnimatePresence, YStack, useTheme } from 'tamagui'
import { LoadingScreen } from '@/ui/LoadingScreen'
import { useMinLoadingTime } from '@/hooks/useMinLoadingTime'

export const REDIRECTS = {
  auth: '/',
  dashboard: '/home/dashboard',
} satisfies Record<string, Href>

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Providers>
      <AuthLayout />
    </Providers>
  )
}

const AuthLayout = () => {
  const { isLoading } = useMe()

  const { user } = useAuthContext()

  const router = useRouter()
  const pathname = usePathname()

  const theme = useTheme()

  const isShowLoading = useMinLoadingTime(isLoading && !user)

  // auth autoredirects logic
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (!pathname.startsWith('/home')) {
          router.replace(REDIRECTS.dashboard)
        }
      } else if (pathname !== REDIRECTS.auth) {
        router.replace(REDIRECTS.auth)
      }
    }
    //eslint-disable-next-line
  }, [isLoading, user])

  if (Platform.OS === 'ios') {
    return (
      <>
        <AnimatePresence>{isShowLoading && <LoadingScreen />}</AnimatePresence>
        <YStack
          backgroundColor={'$background'}
          flex={1}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: 'default',
                contentStyle: {
                  backgroundColor: theme.background.val,
                },
              }}
            >
              <Stack.Screen name='index' />
              <Stack.Screen name='sign-up' />
              <Stack.Screen name='home' />
            </Stack>
          </SafeAreaView>
        </YStack>
      </>
    )
  }

  return (
    <>
      <AnimatePresence>{isShowLoading && <LoadingScreen />}</AnimatePresence>
      <YStack
        backgroundColor={'$background'}
        flex={1}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'default',
            contentStyle: {
              backgroundColor: theme.background.val,
            },
          }}
        >
          <Stack.Screen name='index' />
          <Stack.Screen name='sign-up' />
          <Stack.Screen name='home' />
        </Stack>
      </YStack>
    </>
  )
}
