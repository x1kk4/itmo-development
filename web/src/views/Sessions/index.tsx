import { useCoachContext } from '@/utils/contexts/CoachContext'
import { useSomeTrainingSessions } from '@/utils/hooks/useSomeTrainingSessions'
import { Box, Card, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { SessionCard } from './SessionCard'

const Sessions: FC = () => {
  const { coachData } = useCoachContext()

  const { data: trainingSessions, isLoading } = useSomeTrainingSessions(
    coachData?.training_sessions,
  )

  if (isLoading) {
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
          Загрузка тренировок...
        </Box>
      </Card>
    )
  }

  if (!trainingSessions || trainingSessions.length === 0) {
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
          Тренировок пока нет
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
        Здравствуйте, {coachData?.name}!
      </Text>
      <Box height='calc(100vh - 200px)'>
        <Text
          fontSize={20}
          fontWeight={500}
          marginBottom={2}
        >
          Тренировки
        </Text>
        <Flex
          height={'100%'}
          overflowY='auto'
          flexDirection={'column'}
          padding={2}
          gap={4}
        >
          {trainingSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  )
}

export { Sessions }
