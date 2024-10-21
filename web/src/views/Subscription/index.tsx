import { useParentContext } from '@/utils/contexts/ParentContext'
import { useCreateSubscription } from '@/utils/hooks/useCreateSubscription'
import { useUpdateSubscription } from '@/utils/hooks/useUpdateSubscription'
import { Text, Card, Button, Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

const Subscription: FC = () => {
  const { parentId, subscriptionData, isSubscriptionDataLoading } = useParentContext()
  const { mutate: createSubscription } = useCreateSubscription()
  const { mutate: updateSubscription } = useUpdateSubscription()

  if (isSubscriptionDataLoading) {
    return (
      <Card
        height={'calc(100% - 50px)'}
        borderRadius={'lg'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          textAlign={'center'}
          fontSize={24}
          fontWeight={600}
        >
          Загрузка абонемента...
        </Box>
      </Card>
    )
  }

  if (!subscriptionData) {
    return (
      <Card
        height={'calc(100% - 50px)'}
        borderRadius={'lg'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          textAlign={'center'}
          fontSize={24}
          fontWeight={600}
          marginBottom={4}
        >
          У Вас еще нет абонемента
        </Text>
        <Button onClick={() => createSubscription(parentId)}>Выпустить абонемент</Button>
      </Card>
    )
  }

  return (
    <Card
      height={'calc(100% - 50px)'}
      borderRadius={'lg'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        width={'400px'}
        flexDirection={'column'}
      >
        <Text
          fontSize={24}
          fontWeight={500}
          marginBottom={4}
        >
          Статус абонемента: {subscriptionData?.session_count} занятий
        </Text>
        <Text
          textAlign={'start'}
          marginBottom={2}
        >
          Пополнение:
        </Text>
        <Flex
          flexDirection={'column'}
          gap={1}
        >
          <Button
            width={'fit-content'}
            onClick={() =>
              updateSubscription({
                id: subscriptionData.id,
                data: { session_count: subscriptionData.session_count + 1 },
              })
            }
          >
            1 занятие - 100р
          </Button>
          <Button
            width={'fit-content'}
            onClick={() =>
              updateSubscription({
                id: subscriptionData.id,
                data: { session_count: subscriptionData.session_count + 5 },
              })
            }
          >
            5 занятий - 450р
          </Button>
          <Button
            width={'fit-content'}
            onClick={() =>
              updateSubscription({
                id: subscriptionData.id,
                data: { session_count: subscriptionData.session_count + 10 },
              })
            }
          >
            10 занятий - 850р
          </Button>
          <Button
            width={'fit-content'}
            onClick={() =>
              updateSubscription({
                id: subscriptionData.id,
                data: { session_count: subscriptionData.session_count + 20 },
              })
            }
          >
            20 занятий - 1800р
          </Button>
          <Button
            width={'fit-content'}
            onClick={() =>
              updateSubscription({
                id: subscriptionData.id,
                data: { session_count: subscriptionData.session_count + 50 },
              })
            }
          >
            50 занятий - 4500р
          </Button>
          <Button
            width={'fit-content'}
            onClick={() =>
              updateSubscription({
                id: subscriptionData.id,
                data: { session_count: 0 },
              })
            }
          >
            Мои дети бросают спорт
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}

export { Subscription }
