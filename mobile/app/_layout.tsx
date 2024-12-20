import { useFonts } from 'expo-font'
import { Href, Slot, usePathname, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { Providers } from '@/providers'
import { useMe } from '@/api/hooks/auth/useMe'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { useAuthContext } from '@/providers/AuthContext'

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size='large'
          color='#6200EE'
        />
        <Text>Loading...</Text>
      </View>
    )
  }

  return <Slot />
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
