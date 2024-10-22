import { TTrainingSession } from '@/api'
import { useBranch } from '@/utils/hooks/useBranch'
import { Card, Text, Badge, Button } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type TSessionCardProps = {
  session: TTrainingSession
}

const SessionCard: FC<TSessionCardProps> = ({ session }) => {
  const navigate = useNavigate()

  const { data: branchData } = useBranch(session.branch)

  return (
    <Card
      key={session.id}
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
        {branchData?.name}
        <Badge
          variant='solid'
          colorScheme={
            session.group_level === 'Beginner'
              ? 'green'
              : session.group_level === 'Intermediate'
              ? 'yellow'
              : 'red'
          }
          marginLeft={2}
          marginBottom={1}
        >
          {session.group_level === 'Beginner'
            ? 'Новички'
            : session.group_level === 'Intermediate'
            ? 'Средние'
            : 'Профессионалы'}
        </Badge>
      </Text>
      <Text fontSize={16}>Дата: {session.date}</Text>
      <Text fontSize={16}>
        Время: {session.start_time} - {session.end_time}
      </Text>
      <Text fontSize={16}>Участники: {session.children_list.length}</Text>

      <Button
        width={'fit-content'}
        alignSelf={'end'}
        onClick={() => navigate(`/journal/${session.id}`)}
      >
        Журнал
      </Button>
    </Card>
  )
}

export { SessionCard }
