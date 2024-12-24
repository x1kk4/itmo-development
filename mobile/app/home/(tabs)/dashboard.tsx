import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'
import { Text, View, Button } from 'tamagui'

export default function DashboardScreen() {
  const { logout } = useAuthContext()

  return (
    <Screen
      flex={1}
      padding='$4'
    >
      <View
        backgroundColor='$card'
        padding='$4'
        borderRadius='$4'
      >
        <Text color='$color'>Добро пожаловать</Text>
      </View>

      <View marginTop='$4'>
        <Button
          backgroundColor='$button'
          color='$buttonText'
          onPress={() => logout()}
        >
          Выйти
        </Button>
      </View>
    </Screen>
  )
}
