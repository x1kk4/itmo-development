import { Screen } from '@/ui/Screen'

import Lottie from 'lottie-react-native'

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
