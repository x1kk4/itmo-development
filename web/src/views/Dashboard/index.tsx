import { routes } from '@/router/routes'
import { useParentContext } from '@/utils/contexts/ParentContext'
import { groupLevel } from '@/utils/contexts/ParentContext/types'
import { useClient } from '@/utils/hooks/useClient'
import { useSubscription } from '@/utils/hooks/useSubscription'
import { Badge, Box, Button, Card, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard: FC = () => {
  const navigate = useNavigate()

  const { childs, isChildsLoading, parentId, selectedChildrenData, setSelectedChildren } =
    useParentContext()

  const { data: client } = useClient(parentId)
  const { data: subscription } = useSubscription(client?.subscription ?? 0)

  if (isChildsLoading) {
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
          Загрузка...
        </Box>
      </Card>
    )
  }

  return (
    <Flex
      width={'100%'}
      flexDirection={'column'}
      gap={10}
    >
      <Text
        width={'100%'}
        textAlign={'center'}
        fontSize={28}
        fontWeight={600}
      >
        Здравствуйте, {client?.name}!
      </Text>
      <Box>
        <Text
          fontSize={20}
          fontWeight={500}
          marginBottom={2}
        >
          Дети
        </Text>
        <Flex
          flexDirection={'column'}
          gap={4}
        >
          {childs.map((child) => (
            <Card
              key={child.id}
              width={'600px'}
              padding={4}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
            >
              <Text
                fontSize={18}
                fontWeight={600}
              >
                {child.name}, {child.age} лет, уровень - {groupLevel[child.group_level]}
                {child.id === selectedChildrenData?.id && (
                  <Badge
                    variant='solid'
                    colorScheme='green'
                    marginLeft={2}
                    marginBottom={1}
                  >
                    Активный
                  </Badge>
                )}
              </Text>
              {/* <Text fontSize={16}>Филиал:</Text> */}

              <Button
                width={'fit-content'}
                alignSelf={'end'}
                onClick={() => setSelectedChildren(child.id)}
              >
                Управлять
              </Button>
            </Card>
          ))}
        </Flex>
      </Box>
      <Box>
        <Text
          fontSize={20}
          fontWeight={500}
          marginBottom={2}
        >
          Абонемент
        </Text>
        <Card
          width={'600px'}
          padding={4}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text fontSize={18}>Количество занятий: {subscription?.session_count}</Text>
          <Button onClick={() => navigate(routes.subscription)}>Пополнить</Button>
        </Card>
      </Box>
    </Flex>
  )
}

export { Dashboard }
