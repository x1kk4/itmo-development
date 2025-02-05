import { useBind } from '@/api/hooks/branches/useBind'
import { useUnbind } from '@/api/hooks/branches/useUnbind'
import { useChildren } from '@/api/hooks/users/useChildren'
import { ROLE } from '@/api/types'
import { useAuthContext } from '@/providers/AuthContext'
import { useLocalSearchParams } from 'expo-router'
import { FC } from 'react'
import { Button, View } from 'tamagui'

const ROLES_ALLOWED_SELF_BINDING = [ROLE.CHILDREN, ROLE.COACH, ROLE.MANAGER, ROLE.SUPER]

const Binding: FC = () => {
  const { id } = useLocalSearchParams()

  const { user } = useAuthContext()
  const { data: children } = useChildren(user?.id, Boolean(user && user.role === ROLE.PARENT))

  const { mutate: bind, isPending: isBinding } = useBind()
  const { mutate: unbind, isPending: isUnbinding } = useUnbind()

  if (!user) {
    return null
  }

  return (
    <View marginBottom={'$3'}>
      {ROLES_ALLOWED_SELF_BINDING.includes(user.role) ? (
        <Button>Подписаться</Button>
      ) : (
        <View gap={'$1.5'}>
          {children &&
            children.length &&
            children.map((child) => (
              <Button
                justifyContent={'flex-start'}
                key={child.id}
              >
                Подписать {child.login} {child.firstname && `(${child.firstname})`}
              </Button>
            ))}
        </View>
      )}
    </View>
  )
}

export { Binding }
