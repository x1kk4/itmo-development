import { Lottie } from '@/ui/Lottie'
import { Screen } from '@/ui/Screen'

export default function MapScreen() {
  return (
    <Screen>
      <Lottie
        source={require('@/lottie/hussle-bear.json')}
        style={{ width: '100%', height: '100%' }}
        autoPlay
        loop
      />
    </Screen>
  )
}
