import { config } from '@tamagui/config/v3'
import { createFont, createTamagui } from 'tamagui'
import * as theme from './theme-output'
import { createAnimations } from '@tamagui/animations-react-native'

const interFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 28,
    9: 32,
    10: 48,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 22,
    4: 24,
    5: 26,
    6: 28,
    7: 32,
    8: 36,
    9: 40,
    10: 56,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    9: '900',
  },
  letterSpacing: {
    4: 0,
    5: -0.2,
    6: -0.3,
    7: -0.4,
    9: -0.5,
  },
})

export const tamaguiConfig = createTamagui({
  ...config,
  themes: theme,
  fonts: {
    heading: interFont,
    body: interFont,
  },
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
  defaultProps: {
    Button: {
      fontWeight: '600',
    },
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
