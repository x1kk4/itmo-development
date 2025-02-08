import { useChildren } from '@/api/hooks/users/useChildren'
import { ROLE } from '@/api/types'
import { useAuthContext } from '@/providers/AuthContext'
import { useLocalSearchParams } from 'expo-router'
import { FC, useMemo } from 'react'
import { Button, View } from 'tamagui'
import { ChildEnrolling } from './ChildEnrolling'
import { useEnroll } from '@/api/hooks/training-sessions/useEnroll'
import { useUnenroll } from '@/api/hooks/training-sessions/useUnenroll'
import { useTrainingSession } from '@/api/hooks/training-sessions/useTrainingSession'

const Enrolling: FC = () => {
  const { id } = useLocalSearchParams()

  const { user } = useAuthContext()
  const { data: session } = useTrainingSession(Number(id))

  const { data: children } = useChildren(user?.id, Boolean(user && user.role === ROLE.PARENT))

  const { mutate: enroll, isPending: isEnrolling } = useEnroll()
  const { mutate: unenroll, isPending: isUnenrolling } = useUnenroll()

  const enrolledUsersIds = useMemo(() => {
    if (!session || session.enrolled.length === 0) {
      return []
    }

    return session.enrolled.map((child) => child.userId)
  }, [session])

  if (!user || ![ROLE.CHILDREN, ROLE.PARENT].includes(user.role)) {
    return null
  }

  return (
    <View marginTop={'$3'}>
      {user.role === ROLE.CHILDREN ? (
        !enrolledUsersIds.includes(user.id) ? (
          <Button
            theme={'accent'}
            onPress={() => enroll({ sessionId: Number(id), userId: user.id })}
            disabled={isEnrolling || isUnenrolling}
            marginBottom={'$3'}
          >
            Записаться
          </Button>
        ) : (
          <Button
            color={'$white1'}
            backgroundColor={'$red10Light'}
            pressStyle={{
              backgroundColor: '$red11Light',
              borderColor: 'none',
            }}
            onPress={() => unenroll({ sessionId: Number(id), userId: user.id })}
            disabled={isEnrolling || isUnenrolling}
            marginBottom={'$3'}
          >
            Я не приду
          </Button>
        )
      ) : (
        children &&
        (children.length ? (
          <View
            gap={'$1.5'}
            marginBottom={'$3'}
          >
            {children.map((child) => (
              <ChildEnrolling
                key={child.id}
                {...child}
              />
            ))}
          </View>
        ) : null)
      )}
    </View>
  )
}

export { Enrolling }
