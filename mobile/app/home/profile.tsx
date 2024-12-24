import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'

import Lottie from 'lottie-react-native'
import { Button } from 'tamagui'

export default function ProfileScreen() {
  const { logout } = useAuthContext()

  return (
    <Screen>
      <Lottie
        source={require('@/lottie/running-skeleton.json')}
        style={{ width: '80%', height: '80%', alignSelf: 'center' }}
        autoPlay
        loop
      />

      <Button onPress={() => logout()}>Выйти</Button>
    </Screen>
  )
}
