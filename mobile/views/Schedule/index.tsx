// import { Lottie } from '@/ui/Lottie'
import { useGroupedTrainingSessions } from '@/api/hooks/training-sessions/useGroupedTrainingSessions'
import { useUserBranches } from '@/api/hooks/users/useUserBranches'
import { useAuthContext } from '@/providers/AuthContext'
import { FC, useCallback, useEffect, useState } from 'react'
import { SectionList } from 'react-native'
import {
  // Text,
  View,
} from 'tamagui'
import { TrainingSessionsSectionHeader } from './TrainingSessionsSectionHeader'
import { TrainingSessionCard } from '@/ui/TrainingSessionCard'
import { TTrainingSession } from '@/api/types'

const MAX_PAGE = 3

const Schedule: FC = () => {
  const { user } = useAuthContext()
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(20)

  const [groupedData, setGroupedData] = useState<{ date: string; data: TTrainingSession[] }[]>([])

  const { data: bindedBranches } = useUserBranches(user?.id)

  const { data, isLoading, refetch } = useGroupedTrainingSessions({
    page,
    limit,
    branchId: bindedBranches?.map((branch) => branch.id),
  })

  useEffect(() => {
    if (data?.length) {
      if (page === 1) {
        setGroupedData(data)
      } else {
        setGroupedData((prev) => {
          if (prev[prev.length - 1].date === data[0].date) {
            return [
              ...prev.slice(0, prev.length - 1),
              {
                date: prev[prev.length - 1].date,
                data: [...prev[prev.length - 1].data, ...data[0].data],
              },
              ...data.slice(1),
            ]
          }
          return [...prev, ...data]
        })
      }
    } else {
      if (page === 1) {
        setGroupedData([])
      }
    }
  }, [data, page])

  const incrementPage = useCallback(() => {
    if (
      !isLoading &&
      data &&
      data?.reduce((acc, item) => acc + Number(item.data.length), 0) === limit
    ) {
      setPage((prev) => prev + 1)
    }
  }, [isLoading, limit, data])

  const handleRefresh = useCallback(async () => {
    setPage(1)
    await refetch()
  }, [refetch])

  return (
    <>
      <SectionList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
        sections={groupedData}
        renderItem={({ item }) => <TrainingSessionCard {...item} />}
        renderSectionHeader={({ section: { date, data } }) => (
          <TrainingSessionsSectionHeader
            date={date}
            numberOfEvents={data.length}
          />
        )}
        onEndReached={() => {
          if (MAX_PAGE > page) incrementPage()
        }}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={handleRefresh}
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
