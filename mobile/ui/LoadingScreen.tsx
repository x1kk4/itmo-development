import Lottie from 'lottie-react-native'
import { Screen } from './Screen'

export const LoadingScreen = () => {
  return (
    <Screen
      flex={1}
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={100}
      justifyContent='center'
      alignItems='center'
      animation='fast'
      exitStyle={{ opacity: 0 }}
    >
      <Lottie
        source={require('@/lottie/hussle-bear.json')}
        style={{ width: '100%', height: '100%' }}
        autoPlay
        loop
      />
    </Screen>
  )
}
