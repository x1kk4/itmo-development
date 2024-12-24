import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'
import { Text, View, Button } from 'tamagui'

export default function DashboardScreen() {
  const { logout } = useAuthContext()

  return (
    <Screen>
      <View>
        <Text>Добро пожаловать</Text>
      </View>

      <View>
        <Button onPress={() => logout()}>Выйти</Button>
      </View>
    </Screen>
  )
}
