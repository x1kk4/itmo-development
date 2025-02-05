import { useBind } from '@/api/hooks/branches/useBind'
import { useUnbind } from '@/api/hooks/branches/useUnbind'
import { useUserBranches } from '@/api/hooks/users/useUserBranches'
import { TUser } from '@/api/types'

import { useLocalSearchParams } from 'expo-router'
import { FC, useMemo } from 'react'
import { Button } from 'tamagui'

type TChildBindingProps = TUser

const ChildBinding: FC<TChildBindingProps> = ({ id: childId, login, firstname }) => {
  const { id } = useLocalSearchParams()

  const { data: childBranches } = useUserBranches(childId)

  const { mutate: bind, isPending: isBinding } = useBind()
  const { mutate: unbind, isPending: isUnbinding } = useUnbind()

  const childBranchesIds = useMemo(() => {
    if (!childBranches) {
      return []
    }

    return childBranches.map((branch) => branch.id)
  }, [childBranches])

  if (!childBranchesIds.includes(Number(id))) {
    return (
      <Button
        theme={'accent'}
        onPress={() => bind({ branchId: Number(id), userId: childId })}
        disabled={isBinding || isUnbinding}
      >
        Подписать {login} {firstname && `(${firstname})`}
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
      onPress={() => unbind({ branchId: Number(id), userId: childId })}
      disabled={isBinding || isUnbinding}
    >
      Отписать {login} {firstname && `(${firstname})`}
    </Button>
  )
}

export { ChildBinding }
