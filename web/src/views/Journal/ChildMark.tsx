import { TTrainingSession } from '@/api'
import { useChildren } from '@/utils/hooks/useChildren'
import { useClient } from '@/utils/hooks/useClient'
import { useSubscription } from '@/utils/hooks/useSubscription'
import { useUpdateTrainingSession } from '@/utils/hooks/useUpdaateTrainingSession'
import { useUpdateSubscription } from '@/utils/hooks/useUpdateSubscription'
import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { MdCheck } from 'react-icons/md'

type TChildMarkProps = {
  child: number
  session: TTrainingSession
}

const ChildMark: FC<TChildMarkProps> = ({ child, session }) => {
  const { data: childrenData } = useChildren(child)

  const { data: parentData } = useClient(childrenData?.parent)
  const { data: subsData } = useSubscription(parentData?.subscription)

  const { mutate: updateTrainingSession } = useUpdateTrainingSession()
  const { mutate: updateSubscription } = useUpdateSubscription()

  if (!childrenData || !parentData || !subsData) {
    return null
  }

  return (
    <Flex
      padding={4}
      border={'1px'}
      borderColor={'gray.200'}
      borderRadius={'lg'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Text>
        {childrenData?.name}, {childrenData?.age} лет
      </Text>
      {!session.attendees.includes(child) ? (
        <Button
          colorScheme={'blue'}
          onClick={() => {
            updateTrainingSession({
              id: session.id,
              data: { attendees: [...session.attendees, child] },
            })
            updateSubscription({
              id: parentData.subscription ?? 2,
              data: { session_count: subsData?.session_count - 1 },
            })
          }}
        >
          Отметить
        </Button>
      ) : (
        <Icon
          as={MdCheck}
          fontSize={24}
          color={'green.400'}
        />
      )}
    </Flex>
  )
}

export { ChildMark }
