import { useBranch } from '@/utils/hooks/useBranch'
import { useTrainingSession } from '@/utils/hooks/useTrainingSession'
import { Box, Card, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { ChildMark } from './ChildMark'

const Journal: FC = () => {
  const { id } = useParams()
  const numberId = Number(id)

  const { data: trainingSessionData, isLoading: isTrainingSessionLoading } =
    useTrainingSession(numberId)

  const { data: branchData, isLoading: isBranchLoading } = useBranch(trainingSessionData?.branch)

  if (isTrainingSessionLoading || isBranchLoading) {
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
          Загрузка тренировки...
        </Box>
      </Card>
    )
  }

  return (
    <Card
      height={'calc(100% - 50px)'}
      borderRadius={'lg'}
      padding={4}
    >
      <Text
        fontSize={24}
        fontWeight={600}
      >
        Тренировка в {branchData?.name}
      </Text>
      <Text
        fontSize={18}
        fontWeight={500}
      >
        Дата: {trainingSessionData?.date}
      </Text>
      <Text
        fontSize={18}
        fontWeight={500}
      >
        Время: {trainingSessionData?.start_time} - {trainingSessionData?.end_time}
      </Text>
      <Text
        fontSize={18}
        fontWeight={500}
      >
        Тренер: Вы!
      </Text>
      <Flex marginTop={4}>
        {trainingSessionData?.children_list.map((child) => (
          <ChildMark
            key={child}
            child={child}
            session={trainingSessionData}
          />
        ))}
      </Flex>
    </Card>
  )
}

export { Journal }
