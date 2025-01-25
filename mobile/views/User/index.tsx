import { useUser } from '@/api/hooks/users/useUser'
import { RoleBadge } from '@/ui/RoleBadge'
import { UserAvatar } from '@/ui/UserAvatar'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FC } from 'react'
import { Platform } from 'react-native'
import { Heading, View } from 'tamagui'
import { Screen } from '@/ui/Screen'

const User: FC = () => {
  const { id } = useLocalSearchParams()

  const router = useRouter()

  const { data: user } = useUser(Number(id))

  if (!user) {
    return null
  }

  return (
    <Screen
      paddingVertical={'$3'}
      gap={'$6'}
    >
      <View
        flexDirection={'column'}
        alignItems={'center'}
      >
        {Platform.OS !== 'ios' && (
          <ArrowLeft
            cursor='pointer'
            alignSelf={'flex-start'}
            onPress={() => router.back()}
          />
        )}
        <UserAvatar
          avatarSrc={user.profilePicture}
          fallback={user.login}
          size={'$12'}
        />
        <Heading>{user.login}</Heading>
        <Heading
          fontSize={20}
          marginBottom={'$1'}
          textAlign={'center'}
        >
          {user.surname ?? ''} {user.firstname ?? ''} {user.middlename ?? ''}
        </Heading>
        <RoleBadge
          role={user.role}
          size='large'
        />
      </View>
      {/* <View>
        <Text>
          
        </Text>
      </View> */}
    </Screen>
  )
}

export { User }
