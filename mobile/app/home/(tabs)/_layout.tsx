import { useAuthContext } from '@/providers/AuthContext'
import { Tabs, useRouter } from 'expo-router'
import React from 'react'
import { LayoutDashboard, ListCollapse, MapPin, Settings } from '@tamagui/lucide-icons'
import { Header, Heading, useTheme } from 'tamagui'
import { UserAvatar } from '@/ui/UserAvatar'

export const TAB_NAMES = {
  dashboard: 'Главная',
  schedule: 'Расписание',
  navigator: 'Навигатор',
  settings: 'Настройки',
}

export default function TabsLayout() {
  const { user } = useAuthContext()

  const router = useRouter()

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
            backgroundColor={theme.background.val}
            padding={'$3'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Heading>{TAB_NAMES[route.name as keyof typeof TAB_NAMES]}</Heading>
            <UserAvatar
              avatarSrc={user.profilePicture}
              fallback={user.login}
              onPress={() => router.push('/home/profile')}
            />
          </Header>
        ),
      }}
    >
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Главная',
          tabBarIcon: ({ focused }) => (
            <LayoutDashboard color={focused ? '$accentColor' : '$color'} />
          ),
        }}
      />

      <Tabs.Screen
        name='schedule'
        options={{
          title: 'Расписание',
          tabBarIcon: ({ focused }) => <ListCollapse color={focused ? '$accentColor' : '$color'} />,
        }}
      />

      <Tabs.Screen
        name='navigator'
        options={{
          title: 'Навигатор',
          tabBarIcon: ({ focused }) => <MapPin color={focused ? '$accentColor' : '$color'} />,
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Настройки',
          tabBarIcon: ({ focused }) => <Settings color={focused ? '$accentColor' : '$color'} />,
        }}
      />
    </Tabs>
  )
}
