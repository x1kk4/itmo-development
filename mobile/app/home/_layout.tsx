import React from 'react'

import { Stack } from 'expo-router'
import { useAuthContext } from '@/providers/AuthContext'
import { useTheme } from 'tamagui'

export default function HomeLayout() {
  const { user } = useAuthContext()
  const theme = useTheme()

  if (!user) {
    return null
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}
