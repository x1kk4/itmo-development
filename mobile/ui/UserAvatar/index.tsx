import { FC } from 'react'
import { Avatar, Text } from 'tamagui'

type TUserAvatarProps = {
  avatarSrc: string | null
  fallback: string
  onPress?: () => void
}

const UserAvatar: FC<TUserAvatarProps> = ({ avatarSrc, fallback, onPress }) => {
  return (
    <Avatar
      circular
      onPress={onPress}
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
