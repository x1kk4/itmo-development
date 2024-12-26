import { useAuthContext } from '@/providers/AuthContext'
import { Lottie } from '@/ui/Lottie'
import { Screen } from '@/ui/Screen'

import { Button } from 'tamagui'

export default function ProfileScreen() {
  const { logout } = useAuthContext()

  return (
    <Screen>
      <Lottie
        source={require('@/lottie/running-skeleton.json')}
        style={{ width: '70%', height: '70%', alignSelf: 'center' }}
        autoPlay
        loop
      />

      <Button
        backgroundColor={'red'}
        onPress={() => logout()}
      >
        Выйти
      </Button>
    </Screen>
  )
}
