import { TUser } from '@/api/types'
import { FC } from 'react'
import { Avatar, Card, Text, View } from 'tamagui'
import { RoleBadge } from '../RoleBadge'
import { ArrowRight } from '@tamagui/lucide-icons'

type TUserCardProps = TUser

const UserCard: FC<TUserCardProps> = ({ id, email, login, name, role }) => {
  return (
    <Card
      flexDirection={'row'}
      padding={'$2.5'}
      justifyContent={'space-between'}
      alignItems={'center'}
      cursor={'pointer'}
    >
      <View
        flexDirection={'row'}
        alignItems={'flex-start'}
        gap={'$3'}
      >
        <Avatar circular>
          <Avatar.Image
            accessibilityLabel='Segun'
            src='https://avatars.githubusercontent.com/u/6916170?v=4'
          />
          <Avatar.Fallback />
        </Avatar>
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
