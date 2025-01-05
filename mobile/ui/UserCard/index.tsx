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
      >
        <UserAvatar
          avatarSrc={profilePicture}
          fallback={login}
        />
        <View>
          <View
            flexDirection={'row'}
            alignItems={'center'}
            gap={'$2'}
          >
            <Text
              fontSize={18}
              fontWeight={600}
            >
              {login}
            </Text>
            <RoleBadge role={role} />
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

      <ArrowRight />
    </Card>
  )
}

export { UserCard }
