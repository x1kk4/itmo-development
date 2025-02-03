import { useAuthContext } from '@/providers/AuthContext'
import { Tabs, useRouter } from 'expo-router'
import React from 'react'
import { LayoutDashboard, ListCollapse, MapPinHouse, Settings, Users } from '@tamagui/lucide-icons'
import { Header, Heading, useTheme } from 'tamagui'
import { UserAvatar } from '@/ui/UserAvatar'
import { Platform } from 'react-native'

export const TAB_NAMES = {
  dashboard: 'Главная',
  schedule: 'Тренировки',
  schools: 'Школы',
  personalities: 'Люди',
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
        animation: Platform.OS !== 'android' ? 'shift' : 'none',

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
          title: 'Тренировки',
          tabBarIcon: ({ focused }) => <ListCollapse color={focused ? '$accentColor' : '$color'} />,
        }}
      />

      <Tabs.Screen
        name='schools'
        options={{
          title: 'Школы',
          tabBarIcon: ({ focused }) => <MapPinHouse color={focused ? '$accentColor' : '$color'} />,
        }}
      />

      <Tabs.Screen
        name='personalities'
        options={{
          title: 'Люди',
          tabBarIcon: ({ focused }) => <Users color={focused ? '$accentColor' : '$color'} />,
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
