import { TUser } from '@/api/types'
import { FC } from 'react'
import { Card, Text, View } from 'tamagui'
import { RoleBadge } from '../RoleBadge'
import { ArrowRight } from '@tamagui/lucide-icons'
import { UserAvatar } from '../UserAvatar'
import { useRouter } from 'expo-router'

type TUserCardProps = TUser

const UserCard: FC<TUserCardProps> = ({ id, login, role, profilePicture }) => {
  const router = useRouter()

  return (
    <Card
      flexDirection={'row'}
      padding={'$2.5'}
      justifyContent={'space-between'}
      alignItems={'center'}
      cursor={'pointer'}
      onPress={() => router.push(`/home/personalities/${id}`)}
    >
      <View
        flexDirection={'row'}
        alignItems={'flex-start'}
        gap={'$3'}
        flex={1}
      >
        <View>
          <UserAvatar
            avatarSrc={profilePicture}
            fallback={login}
          />
        </View>
        <View
          flex={1}
          alignItems={'flex-start'}
          gap={'$0.5'}
        >
          <RoleBadge role={role} />

          <View
            flexDirection={'row'}
            alignItems={'center'}
            gap={'$2'}
          >
            <Text
              fontSize={18}
              fontWeight={600}
              numberOfLines={1}
              flexShrink={1}
            >
              {login}
            </Text>
          </View>
          <Text
            fontSize={14}
            fontWeight={400}
            color={'$accentColor'}
          >
            #{id}
          </Text>
        </View>
      </View>

      <ArrowRight marginLeft={'$2'} />
    </Card>
  )
}

export { UserCard }
