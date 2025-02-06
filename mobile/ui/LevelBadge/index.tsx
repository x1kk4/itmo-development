import { GROUP_LEVEL } from '@/api/types'
import { useThemeContext } from '@/providers/ThemeContext'
import { ColorScheme, ColorTokens } from '@tamagui/core'
import { FC } from 'react'
import { View, Text } from 'tamagui'

type TLevelBadgeProps = { level: GROUP_LEVEL; size?: 'small' | 'large' }

const badgeTitle: Record<GROUP_LEVEL, string> = {
  [GROUP_LEVEL.BEGINNER]: 'Новички',
  [GROUP_LEVEL.INTERMEDIATE]: 'Средние',
  [GROUP_LEVEL.ADVANCED]: 'Про',
}

const badgeColor: Record<GROUP_LEVEL, Record<ColorScheme, ColorTokens>> = {
  [GROUP_LEVEL.BEGINNER]: { light: '$green10Light', dark: '$green10Dark' },
  [GROUP_LEVEL.INTERMEDIATE]: { light: '$orange10Light', dark: '$orange10Dark' },
  [GROUP_LEVEL.ADVANCED]: { light: '$red10Light', dark: '$red10Dark' },
}

const LevelBadge: FC<TLevelBadgeProps> = ({ level, size = 'small' }) => {
  const { theme } = useThemeContext()

  return (
    <View
      paddingVertical={size === 'small' ? '$0.5' : '$1'}
      paddingHorizontal={size === 'small' ? '$2' : '$4'}
      borderRadius={size === 'small' ? '$1' : '$2'}
      backgroundColor={badgeColor[level][theme]}
    >
      <Text
        fontSize={size === 'small' ? 12 : 20}
        fontWeight={600}
        color={'$white1'}
      >
        {badgeTitle[level]}
      </Text>
    </View>
  )
}

export { LevelBadge }
