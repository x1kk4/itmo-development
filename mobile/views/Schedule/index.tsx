// import { Lottie } from '@/ui/Lottie'
import { useGroupedTrainingSessions } from '@/api/hooks/training-sessions/useGroupedTrainingSessions'
import { useUserBranches } from '@/api/hooks/users/useUserBranches'
import { useAuthContext } from '@/providers/AuthContext'
import {
  FC,
  // useState
} from 'react'
import { SectionList } from 'react-native'
import {
  // Text,
  View,
} from 'tamagui'
import { TrainingSessionsSectionHeader } from './TrainingSessionsSectionHeader'
import { TrainingSessionCard } from '@/ui/TrainingSessionCard'

const Schedule: FC = () => {
  const { user } = useAuthContext()

  // const [groupedData, setGroupedData] = useState<{ date: string; data: TTrainingSession[] }[]>([])

  const { data: bindedBranches } = useUserBranches(user?.id)

  const { data: groupedTrainingSessions } = useGroupedTrainingSessions({
    page: 1,
    limit: 10,
    branchId: bindedBranches?.map((branch) => branch.id),
  })

  return (
    <>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={groupedTrainingSessions ?? []}
        renderItem={({ item }) => <TrainingSessionCard {...item} />}
        renderSectionHeader={({ section: { date, data } }) => (
          <TrainingSessionsSectionHeader
            date={date}
            numberOfEvents={data.length}
          />
        )}
        ItemSeparatorComponent={() => <View paddingBottom={'$1.5'} />}
        SectionSeparatorComponent={() => <View paddingBottom={'$3'} />}
      />
      {/* <View>
        <Text>Тренировки</Text>
      </View>

      <Lottie
        source={require('@/lottie/starina-snoop.json')}
        style={{ width: '80%', height: '80%', alignSelf: 'center' }}
        autoPlay
        loop
      /> */}
    </>
  )
}

export { Schedule }
