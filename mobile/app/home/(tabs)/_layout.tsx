import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Главная',
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Настройки',
        }}
      />
    </Tabs>
  )
}
