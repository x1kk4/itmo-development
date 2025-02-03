import { useInviteChildren } from '@/api/hooks/users/useInviteChildren'
import { useInviteCoach } from '@/api/hooks/users/useInviteCoach'
import { useInviteManager } from '@/api/hooks/users/useInviteManager'
import { ROLE } from '@/api/types'
import { useAuthContext } from '@/providers/AuthContext'
import { Plus } from '@tamagui/lucide-icons'
import { FC } from 'react'
import { Platform } from 'react-native'
import { Button, Popover, View } from 'tamagui'

const Invites: FC = () => {
  const { user } = useAuthContext()

  const { mutate: inviteChildren } = useInviteChildren()
  const { mutate: inviteCoach } = useInviteCoach()
  const { mutate: inviteManager } = useInviteManager()

  if (!user || user.role === ROLE.CHILDREN) {
    return null
  }

  return (
    <View>
      <Popover placement='bottom'>
        <Popover.Trigger asChild>
          <Button
            height={'$3'}
            width={Platform.OS !== 'web' ? '$3' : 'auto'}
          >
            <Plus />
          </Button>
        </Popover.Trigger>

        <Popover.Content
          marginTop={'$2'}
          marginLeft={'$3'}
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
              Пригласить учащегося
            </Button>
          </Popover.Close>
          {[ROLE.SUPER, ROLE.MANAGER].includes(user.role) && (
            <Popover.Close asChild>
              <Button
                width={'100%'}
                onPress={inviteCoach}
              >
                Пригласить тренера
              </Button>
            </Popover.Close>
          )}
          {[ROLE.SUPER].includes(user.role) && (
            <Popover.Close asChild>
              <Button
                width={'100%'}
                onPress={inviteManager}
              >
                Пригласить менеджера
              </Button>
            </Popover.Close>
          )}
        </Popover.Content>
      </Popover>
    </View>
  )
}

export { Invites }
