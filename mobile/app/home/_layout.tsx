import React from 'react'
import { Redirect } from 'expo-router'

import { Stack } from 'expo-router'
import { useAuthContext } from '@/providers/AuthContext'
import { Theme, useTheme } from 'tamagui'
import { useThemeContext } from '@/providers/ThemeContext'
import { REDIRECTS } from '../_layout'

export default function HomeLayout() {
  const { user } = useAuthContext()

  const { theme } = useThemeContext()
  const tamaguiTheme = useTheme()

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
            headerBackButtonDisplayMode: 'minimal',
            headerTitle: 'Профиль',
          }}
          name='profile'
        />
      </Stack>
    </Theme>
  )
}
