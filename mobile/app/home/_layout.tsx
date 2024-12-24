import React from 'react'

import { Stack } from 'expo-router'
import { useAuthContext } from '@/providers/AuthContext'
import { Avatar, Header, useTheme } from 'tamagui'

export default function HomeLayout() {
  const { user } = useAuthContext()

  const theme = useTheme()

  if (!user) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{
          header: () => (
            <Header>
              <Avatar circular>
                <Avatar.Image
                  accessibilityLabel='Cam'
                  src='https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'
                />
                <Avatar.Fallback backgroundColor='$blue10' />
              </Avatar>
            </Header>
          ),
          // headerStyle: { backgroundColor: theme.background.val },
          // headerTitleStyle: { color: theme.color.val },
          // headerTitle: undefined,
          // headerRight: () => (

          // ),
        }}
      />
    </Stack>
  )
}
