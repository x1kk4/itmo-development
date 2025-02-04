import { FC } from 'react'
import { Platform } from 'react-native'
import { Avatar, Square, Text } from 'tamagui'

type TBranchAvatarProps = {
  avatarSrc: string | null
  fallback: string
  size?: string
  onPress?: () => void
}

const BranchAvatar: FC<TBranchAvatarProps> = ({ avatarSrc, fallback, size = '$4', onPress }) => {
  if (Platform.OS === 'android') {
    if (avatarSrc) {
      return (
        <Avatar
          borderRadius={'$2'}
          onPress={onPress}
          size={size}
        >
          <Avatar.Image
            accessibilityLabel='Avatar'
            src={avatarSrc ?? undefined}
          />
        </Avatar>
      )
    }

    return (
      <Square
        borderRadius={'$2'}
        size={size}
        backgroundColor={'$accentBackground'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text
          color={'$white1'}
          fontWeight={600}
          fontSize={Number(size.slice(1)) * 5}
        >
          {fallback.slice(0, 1).toUpperCase()}
        </Text>
      </Square>
    )
  }

  return (
    <Avatar
      borderRadius={'$2'}
      onPress={onPress}
      size={size}
    >
      <Avatar.Image
        accessibilityLabel='Avatar'
        src={avatarSrc ?? undefined}
      />
      <Avatar.Fallback
        backgroundColor={'$accentBackground'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text
          color={'$white1'}
          fontWeight={600}
          fontSize={Number(size.slice(1)) * 5}
        >
          {fallback.slice(0, 1).toUpperCase()}
        </Text>
      </Avatar.Fallback>
    </Avatar>
  )
}

export { BranchAvatar }
