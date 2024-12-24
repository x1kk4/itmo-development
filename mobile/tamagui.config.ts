import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'
import * as theme from './theme-output'

export const tamaguiConfig = createTamagui({ ...config, themes: theme })

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
