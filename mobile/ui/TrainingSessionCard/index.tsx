import { TTrainingSession } from '@/api/types'
import { FC } from 'react'
import { Card, View, Text } from 'tamagui'
import { LevelBadge } from '../LevelBadge'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useUser } from '@/api/hooks/users/useUser'
import { useBranch } from '@/api/hooks/branches/useBranch'
import { ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'

dayjs.locale('ru')

type TTrainingSessionCardProps = TTrainingSession

const TrainingSessionCard: FC<TTrainingSessionCardProps> = ({
  id,
  groupLevel,
  startDate,
  endDate,
  branchId,
  coachId,
}) => {
  const router = useRouter()

  const { data: coach } = useUser(coachId)
  const { data: branch } = useBranch(branchId)

  console.log(startDate)

  return (
    <Card
      padding={'$2.5'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      cursor={'pointer'}
      onPress={() => router.push(`/home/training-sessions/${id}`)}
    >
      <View
        flexDirection={'row'}
        alignItems={'flex-start'}
        gap={'$3'}
        flex={1}
      >
        <View alignItems={'flex-end'}>
          <Text
            fontSize={17}
            fontWeight={600}
          >
            {dayjs(startDate).format('HH:mm')}
          </Text>
          <Text
            fontSize={13}
            fontWeight={500}
          >
            {dayjs(endDate).format('HH:mm')}
          </Text>
        </View>
        <View
          alignItems={'flex-start'}
          gap={'$1.5'}
        >
          <LevelBadge level={groupLevel} />
          <Text
            fontSize={17}
            fontWeight={600}
          >
            {branch && branch.name}
          </Text>
          <Text
            fontSize={17}
            fontWeight={600}
          >
            {coach && coach.login}
          </Text>
        </View>
      </View>
      <ArrowRight marginLeft={'$2'} />
    </Card>
  )
}

export { TrainingSessionCard }
