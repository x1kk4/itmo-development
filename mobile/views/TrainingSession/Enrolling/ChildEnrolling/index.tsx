import { useEnroll } from '@/api/hooks/training-sessions/useEnroll'
import { useTrainingSession } from '@/api/hooks/training-sessions/useTrainingSession'
import { useUnenroll } from '@/api/hooks/training-sessions/useUnenroll'
import { TUser } from '@/api/types'

import { useLocalSearchParams } from 'expo-router'
import { FC, useMemo } from 'react'
import { Button } from 'tamagui'

type TChildBindingProps = TUser

const ChildEnrolling: FC<TChildBindingProps> = ({ id: childId, login, firstname }) => {
  const { id } = useLocalSearchParams()

  const { data: session } = useTrainingSession(Number(id))

  const { mutate: enroll, isPending: isEnrolling } = useEnroll()
  const { mutate: unenroll, isPending: isUnenrolling } = useUnenroll()

  const enrolledUsersIds = useMemo(() => {
    if (!session || session.enrolled.length === 0) {
      return []
    }

    return session.enrolled.map((child) => child.userId)
  }, [session])

  if (!enrolledUsersIds.includes(childId)) {
    return (
      <Button
        theme={'accent'}
        onPress={() => enroll({ sessionId: Number(id), userId: childId })}
        disabled={isEnrolling || isUnenrolling}
      >
        Записать {login} {firstname && `(${firstname})`}
      </Button>
    )
  }

  return (
    <Button
      color={'$white1'}
      backgroundColor={'$red10Light'}
      pressStyle={{
        backgroundColor: '$red11Light',
        borderColor: 'none',
      }}
      onPress={() => unenroll({ sessionId: Number(id), userId: childId })}
      disabled={isEnrolling || isUnenrolling}
    >
      {login} {firstname && `(${firstname})`} не придет
    </Button>
  )
}

export { ChildEnrolling }
