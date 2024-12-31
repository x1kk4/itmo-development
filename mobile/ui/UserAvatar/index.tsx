import { FC } from 'react'
import { Platform } from 'react-native'
import { Avatar, Circle, Text } from 'tamagui'

type TUserAvatarProps = {
  avatarSrc: string | null
  fallback: string
  size?: string
  onPress?: () => void
}

const UserAvatar: FC<TUserAvatarProps> = ({ avatarSrc, fallback, size = '$4', onPress }) => {
  if (Platform.OS === 'android') {
    if (avatarSrc) {
      return (
        <Avatar
          circular
          onPress={onPress}
          size={size}
        >
          <Avatar.Image
            accessibilityLabel='Avatar'
            src={avatarSrc ?? ''}
          />
        </Avatar>
      )
    }

    return (
      <Circle
        size={size}
        backgroundColor={'$accentBackground'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text
          color={'$white1'}
          fontWeight={600}
          fontSize={24}
        >
          {fallback.slice(0, 1).toUpperCase()}
        </Text>
      </Circle>
    )
  }

  return (
    <Avatar
      circular
      onPress={onPress}
      size={size}
    >
      <Avatar.Image
        accessibilityLabel='Avatar'
        src={avatarSrc ?? ''}
      />
      <Avatar.Fallback
        backgroundColor={'$accentBackground'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text
          color={'$white1'}
          fontWeight={600}
          fontSize={24}
        >
          {fallback.slice(0, 1).toUpperCase()}
        </Text>
      </Avatar.Fallback>
    </Avatar>
  )
}

export { UserAvatar }
