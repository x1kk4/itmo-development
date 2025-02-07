import { FC } from 'react'
import { Heading, View, Text } from 'tamagui'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { getSessionForm } from '@/utils/wordForms'

dayjs.locale('ru')

type TTrainingSessionsSectionHeaderProps = {
  date: string
  numberOfEvents: number
}

const TrainingSessionsSectionHeader: FC<TTrainingSessionsSectionHeaderProps> = ({
  date,
  numberOfEvents,
}) => {
  return (
    <View backgroundColor={'$background'}>
      <Heading
        fontSize={24}
        color={'$accentColor'}
        textTransform={'capitalize'}
      >
        {dayjs(date).format('dddd')}
      </Heading>
      <Text
        fontSize={18}
        fontWeight={600}
      >
        {dayjs(date).format('D MMMM')} · {numberOfEvents} {getSessionForm(numberOfEvents)}
      </Text>
    </View>
  )
}

export { TrainingSessionsSectionHeader }
