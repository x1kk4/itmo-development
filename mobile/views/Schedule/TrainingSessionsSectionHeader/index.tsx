import { FC } from 'react'
import { Heading, View, Text } from 'tamagui'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const getForm = (numberOfEvents: number) => {
  if (numberOfEvents.toString().endsWith('1')) {
    return 'занятие'
  }

  if (
    numberOfEvents.toString().endsWith('2') ||
    numberOfEvents.toString().endsWith('3') ||
    numberOfEvents.toString().endsWith('4')
  ) {
    return 'занятия'
  }

  return 'занятий'
}

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
        {dayjs(date).format('D MMMM')} · {numberOfEvents} {getForm(numberOfEvents)}
      </Text>
    </View>
  )
}

export { TrainingSessionsSectionHeader }
