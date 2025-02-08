import { ROLE, TTrainingSession, TUser } from '@/api/types'
import { FC } from 'react'
import { Card, Text, View } from 'tamagui'

import { UserAvatar } from '@/ui/UserAvatar'
import { RoleBadge } from '@/ui/RoleBadge'
import { useAttend } from '@/api/hooks/training-sessions/useAttend'
import { useUnattend } from '@/api/hooks/training-sessions/useUnattend'
import { useRouter } from 'expo-router'
import { Check, X } from '@tamagui/lucide-icons'
import { useThemeContext } from '@/providers/ThemeContext'

type TUserCardProps = TUser & {
  session: TTrainingSession | undefined
  user: TUser
}

const AttendCard: FC<TUserCardProps> = ({ id, login, role, profilePicture, session, user }) => {
  const router = useRouter()
  const { theme } = useThemeContext()

  const { mutate: attend } = useAttend()
  const { mutate: unattend } = useUnattend()

  if (!session) {
    return null
  }

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

      {session?.attendees.map((child) => child.userId).includes(id) ? (
        <View
          padding={'$3'}
          borderRadius={'$3'}
          backgroundColor={user.role === ROLE.COACH ? '$backgroundHover' : '$background'}
          onPress={(e) => {
            if (user.role === ROLE.COACH) {
              e.stopPropagation()
              unattend({ sessionId: session.id, userId: id })
            }
          }}
        >
          <X color={theme === 'light' ? '$red10Light' : '$red10Dark'} />
        </View>
      ) : (
        <View
          padding={'$3'}
          borderRadius={'$3'}
          backgroundColor={user.role === ROLE.COACH ? '$backgroundHover' : '$background'}
          onPress={(e) => {
            if (user.role === ROLE.COACH) {
              e.stopPropagation()
              attend({ sessionId: session.id, userId: id })
            }
          }}
        >
          <Check color={theme === 'light' ? '$green10Light' : '$green10Dark'} />
        </View>
      )}
    </Card>
  )
}

export { AttendCard }
