import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'
import * as theme from './theme-output'
import { createAnimations } from '@tamagui/animations-react-native'

export const tamaguiConfig = createTamagui({
  ...config,
  themes: theme,
  animations: createAnimations({
    fast: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      damping: 20,
      stiffness: 60,
    },
  }),
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
