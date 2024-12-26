import { Lottie } from '@/ui/Lottie'
import { Screen } from '@/ui/Screen'
import { Text, View } from 'tamagui'

export default function DashboardScreen() {
  return (
    <Screen>
      <View>
        <Text>Добро пожаловать!</Text>
      </View>

      <Lottie
        source={require('@/lottie/bad-boy.json')}
        style={{ width: '80%', height: '80%', alignSelf: 'center' }}
        autoPlay
        loop
      />
    </Screen>
  )
}
