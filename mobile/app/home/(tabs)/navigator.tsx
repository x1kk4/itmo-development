import { Screen } from '@/ui/Screen'
import { UsersList } from '@/views/UsersList'
import { Tabs, Text } from 'tamagui'

export default function NavigatorScreen() {
  return (
    <Screen>
      <Tabs
        defaultValue='schools'
        flexDirection={'column'}
      >
        <Tabs.List>
          <Tabs.Tab
            value='schools'
            flex={1}
            borderWidth={0}
          >
            <Text fontSize={16}>Школы</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='users'
            flex={1}
            borderWidth={0}
          >
            <Text fontSize={16}>Пользователи</Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value='schools'></Tabs.Content>
        <Tabs.Content value='users'>
          <UsersList />
        </Tabs.Content>
      </Tabs>
    </Screen>
  )
}
