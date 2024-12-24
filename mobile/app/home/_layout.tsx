import React from 'react'

import { Stack } from 'expo-router'
import { useAuthContext } from '@/providers/AuthContext'
import { Theme, useTheme } from 'tamagui'
import { useThemeContext } from '@/providers/ThemeContext'

export default function HomeLayout() {
  const { user } = useAuthContext()

  const { theme } = useThemeContext()
  const tamaguiTheme = useTheme()

  if (!user) {
    return null
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
        <Stack.Screen name='profile' />
      </Stack>
    </Theme>
  )
}
