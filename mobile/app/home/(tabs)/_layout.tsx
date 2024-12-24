import { useAuthContext } from '@/providers/AuthContext'
import { Tabs } from 'expo-router'
import React from 'react'
import { LayoutDashboard, ListCollapse, MapPin, Settings } from '@tamagui/lucide-icons'
import { Avatar, Header, Heading, useTheme } from 'tamagui'

export const TAB_NAMES = {
  dashboard: 'Главная',
  schedule: 'Расписание',
  map: 'Школы',
  settings: 'Настройки',
}

export default function TabsLayout() {
  const { user } = useAuthContext()

  const theme = useTheme()

  if (!user) {
    return null
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: theme.accentColor.val,
        animation: 'shift',

        header: ({ route }) => (
          <Header
            backgroundColor={'$background'}
            padding={'$3'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Heading>{TAB_NAMES[route.name as keyof typeof TAB_NAMES]}</Heading>
            <Avatar circular>
              <Avatar.Image
                accessibilityLabel='Segun'
                src='https://avatars.githubusercontent.com/u/6916170?v=4'
              />
              <Avatar.Fallback />
            </Avatar>
          </Header>
        ),
      }}
    >
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Главная',
          tabBarIcon: ({ focused }) => (
            <LayoutDashboard color={focused ? theme.accentColor.val : theme.color.val} />
          ),
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: 'Расписание',
          tabBarIcon: ({ focused }) => (
            <ListCollapse color={focused ? theme.accentColor.val : theme.color.val} />
          ),
        }}
      />
      <Tabs.Screen
        name='map'
        options={{
          title: 'Карта',
          tabBarIcon: ({ focused }) => (
            <MapPin color={focused ? theme.accentColor.val : theme.color.val} />
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Настройки',
          tabBarIcon: ({ focused }) => (
            <Settings color={focused ? theme.accentColor.val : theme.color.val} />
          ),
        }}
      />
    </Tabs>
  )
}
