import { Lottie } from '@/ui/Lottie'
import { Screen } from '@/ui/Screen'
import { View, Text } from 'tamagui'

export default function ScheduleScreen() {
  return (
    <Screen>
      <View>
        <Text>Карта</Text>
      </View>

      <Lottie
        source={require('@/lottie/starina-snoop.json')}
        style={{ width: '80%', height: '80%', alignSelf: 'center' }}
        autoPlay
        loop
      />
    </Screen>
  )
}
