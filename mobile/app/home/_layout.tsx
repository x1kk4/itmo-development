import React from 'react'
import { Redirect, useRouter } from 'expo-router'

import { Stack } from 'expo-router'
import { useAuthContext } from '@/providers/AuthContext'
import { Button, Header, Heading, Theme, View, useTheme } from 'tamagui'
import { useThemeContext } from '@/providers/ThemeContext'
import { REDIRECTS } from '../_layout'
import { ArrowLeft } from '@tamagui/lucide-icons'

export default function HomeLayout() {
  const { user, logout } = useAuthContext()

  const { theme } = useThemeContext()
  const tamaguiTheme = useTheme()

  const router = useRouter()

  if (!user) {
    return <Redirect href={REDIRECTS.auth} />
  }

  return (
    <Theme key={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: tamaguiTheme.background.val,
          },
        }}
      >
        <Stack.Screen name='(tabs)' />
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => (
              <Header
                backgroundColor={tamaguiTheme.background.val}
                padding={'$3'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <View
                  flexDirection={'row'}
                  alignItems={'center'}
                  gap={'$4'}
                >
                  <ArrowLeft onPress={() => router.back()} />
                  <Heading>Профиль</Heading>
                </View>
                <Button
                  height={'$3'}
                  color={'$white1'}
                  backgroundColor={'$red10Light'}
                  pressStyle={{
                    backgroundColor: '$red11Light',
                    borderColor: 'none',
                  }}
                  onPress={() => logout()}
                >
                  Выйти
                </Button>
              </Header>
            ),
          }}
          name='profile'
        />
      </Stack>
    </Theme>
  )
}
