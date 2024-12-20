import React from 'react'

import { Stack } from 'expo-router'
import { useAuthContext } from '@/providers/AuthContext'

export default function HomeLayout() {
  const { user } = useAuthContext()

  if (!user) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
