import { TTrainingSession } from '@/api/types'
import { FC } from 'react'
import { Card, View, Text } from 'tamagui'
import { LevelBadge } from '../LevelBadge'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { getEnrolledForm } from '@/utils/wordForms'

dayjs.locale('ru')

type TTrainingSessionCardProps = TTrainingSession

const TrainingSessionCard: FC<TTrainingSessionCardProps> = ({
  id,
  groupLevel,
  startDate,
  endDate,
  branch,
  coach,
  enrolled,
}) => {
  const router = useRouter()

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
            marginBottom={'$1.5'}
          >
            {branch && branch.name}
          </Text>
          <Text
            fontSize={14}
            fontWeight={600}
          >
            Тренер: {coach && coach.login}
          </Text>
          <Text
            fontSize={14}
            fontWeight={600}
          >
            {enrolled.length} {getEnrolledForm(enrolled.length)}
          </Text>
        </View>
      </View>
      <ArrowRight marginLeft={'$2'} />
    </Card>
  )
}

export { TrainingSessionCard }
