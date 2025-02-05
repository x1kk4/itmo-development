import { useBind } from '@/api/hooks/branches/useBind'
import { useUnbind } from '@/api/hooks/branches/useUnbind'
import { useChildren } from '@/api/hooks/users/useChildren'
import { ROLE } from '@/api/types'
import { useAuthContext } from '@/providers/AuthContext'
import { useLocalSearchParams } from 'expo-router'
import { FC, useMemo } from 'react'
import { Button, View } from 'tamagui'
import { ChildBinding } from './ChildBinding'
import { useUserBranches } from '@/api/hooks/users/useUserBranches'

const ROLES_ALLOWED_SELF_BINDING = [ROLE.CHILDREN, ROLE.COACH, ROLE.MANAGER, ROLE.SUPER]

const Binding: FC = () => {
  const { id } = useLocalSearchParams()

  const { user } = useAuthContext()
  const { data: userBranches } = useUserBranches(user?.id)

  const { data: children } = useChildren(user?.id, Boolean(user && user.role === ROLE.PARENT))

  const { mutate: bind, isPending: isBinding } = useBind()
  const { mutate: unbind, isPending: isUnbinding } = useUnbind()

  const userBranchesIds = useMemo(() => {
    if (!userBranches) {
      return []
    }

    return userBranches.map((branch) => branch.id)
  }, [userBranches])

  if (!user) {
    return null
  }

  return (
    <View>
      {ROLES_ALLOWED_SELF_BINDING.includes(user.role) ? (
        !userBranchesIds.includes(Number(id)) ? (
          <Button
            theme={'accent'}
            onPress={() => bind({ branchId: Number(id), userId: user.id })}
            disabled={isBinding || isUnbinding}
            marginBottom={'$3'}
          >
            Подписаться
          </Button>
        ) : (
          <Button
            color={'$white1'}
            backgroundColor={'$red10Light'}
            pressStyle={{
              backgroundColor: '$red11Light',
              borderColor: 'none',
            }}
            onPress={() => unbind({ branchId: Number(id), userId: user.id })}
            disabled={isBinding || isUnbinding}
            marginBottom={'$3'}
          >
            Отписаться
          </Button>
        )
      ) : (
        children &&
        children?.length && (
          <View
            gap={'$1.5'}
            marginBottom={'$3'}
          >
            {children.map((child) => (
              <ChildBinding
                key={child.id}
                {...child}
              />
            ))}
          </View>
        )
      )}
    </View>
  )
}

export { Binding }
