import { useInviteChildren } from '@/api/hooks/users/useInviteChildren'
import { useInviteCoach } from '@/api/hooks/users/useInviteCoach'
import { useInviteManager } from '@/api/hooks/users/useInviteManager'
import { ROLE } from '@/api/types'
import { useAuthContext } from '@/providers/AuthContext'
import { FC } from 'react'
import { Button, Popover, View } from 'tamagui'

const Invites: FC = () => {
  const { user } = useAuthContext()

  const { mutate: inviteChildren } = useInviteChildren()
  const { mutate: inviteCoach } = useInviteCoach()
  const { mutate: inviteManager } = useInviteManager()

  if (!user || user.role === ROLE.CHILDREN) {
    return <View marginTop={'$1.5'} />
  }

  return (
    <View
      width={'100%'}
      marginVertical={'$1.5'}
    >
      <Popover placement='bottom'>
        <Popover.Trigger asChild>
          <Button>Пригласить</Button>
        </Popover.Trigger>

        <Popover.Content
          width={'$20'}
          borderWidth={1}
          borderColor='$borderColor'
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          elevate
          animation={'fast'}
          gap={'$2'}
        >
          <Popover.Close asChild>
            <Button
              width={'100%'}
              onPress={inviteChildren}
            >
              Учащегося
            </Button>
          </Popover.Close>
          {[ROLE.SUPER, ROLE.MANAGER].includes(user.role) && (
            <Popover.Close asChild>
              <Button
                width={'100%'}
                onPress={inviteCoach}
              >
                Тренера
              </Button>
            </Popover.Close>
          )}
          {[ROLE.SUPER].includes(user.role) && (
            <Popover.Close asChild>
              <Button
                width={'100%'}
                onPress={inviteManager}
              >
                Менеджера
              </Button>
            </Popover.Close>
          )}
        </Popover.Content>
      </Popover>
    </View>
  )
}

export { Invites }
