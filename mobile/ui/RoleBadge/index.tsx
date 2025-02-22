import { ROLE } from '@/api/types'
import { useThemeContext } from '@/providers/ThemeContext'
import { ColorScheme, ColorTokens } from '@tamagui/core'
import { FC } from 'react'
import { View, Text } from 'tamagui'

type TRoleBadgeProps = { role: ROLE; size?: 'small' | 'large' }

const badgeTitle: Record<ROLE, string> = {
  [ROLE.CHILDREN]: 'Учащийся',
  [ROLE.PARENT]: 'Родитель',
  [ROLE.COACH]: 'Тренер',
  [ROLE.MANAGER]: 'Менеджер',
  [ROLE.SUPER]: 'Админ',
}

const badgeColor: Record<ROLE, Record<ColorScheme, ColorTokens>> = {
  [ROLE.CHILDREN]: { light: '$blue10Light', dark: '$blue10Dark' },
  [ROLE.PARENT]: { light: '$orange10Light', dark: '$orange10Dark' },
  [ROLE.COACH]: { light: '$purple10Light', dark: '$purple10Dark' },
  [ROLE.MANAGER]: { light: '$pink10Light', dark: '$pink10Dark' },
  [ROLE.SUPER]: { light: '$red10Light', dark: '$red10Dark' },
}

const RoleBadge: FC<TRoleBadgeProps> = ({ role, size = 'small' }) => {
  const { theme } = useThemeContext()

  return (
    <View
      paddingVertical={size === 'small' ? '$0.5' : '$1'}
      paddingHorizontal={size === 'small' ? '$2' : '$4'}
      borderRadius={size === 'small' ? '$1' : '$2'}
      backgroundColor={badgeColor[role][theme]}
    >
      <Text
        fontSize={size === 'small' ? 12 : 20}
        fontWeight={600}
        color={'$white1'}
      >
        {badgeTitle[role]}
      </Text>
    </View>
  )
}

export { RoleBadge }
