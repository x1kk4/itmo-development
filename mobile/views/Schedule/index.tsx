import { Lottie } from '@/ui/Lottie'
import { useGroupedTrainingSessions } from '@/api/hooks/training-sessions/useGroupedTrainingSessions'
import { useUserBranches } from '@/api/hooks/users/useUserBranches'
import { useAuthContext } from '@/providers/AuthContext'
import { FC, useCallback, useEffect, useState } from 'react'
import { SectionList } from 'react-native'
import { Heading, View, Text } from 'tamagui'
import { TrainingSessionsSectionHeader } from './TrainingSessionsSectionHeader'
import { TrainingSessionCard } from '@/ui/TrainingSessionCard'
import { ROLE, TTrainingSession } from '@/api/types'

const MAX_PAGE = 4

const Schedule: FC = () => {
  const { user } = useAuthContext()
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(20)

  const [groupedData, setGroupedData] = useState<{ date: string; data: TTrainingSession[] }[]>([])

  const { data: bindedBranches } = useUserBranches(user?.id)

  const { data, isLoading, refetch } = useGroupedTrainingSessions(
    {
      page,
      limit,
      branchId: bindedBranches?.map((branch) => branch.id),
    },
    !!bindedBranches?.length,
  )

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

  if (!user) {
    return null
  }

  if (bindedBranches && bindedBranches.length === 0) {
    return (
      <View
        alignItems={'center'}
        justifyContent={'center'}
      >
        <View gap={'$3'}>
          <Heading
            fontSize={24}
            textAlign={'center'}
          >
            Тренировок пока нет
          </Heading>
          <Text
            fontWeight={600}
            fontSize={16}
            textAlign={'center'}
          >
            {user?.role === ROLE.PARENT
              ? 'Подпишите учащегося на школу, чтобы увидеть её расписание'
              : 'Подпишитесь на школу, чтобы увидеть её расписание'}
          </Text>
        </View>

        <Lottie
          source={require('@/lottie/starina-snoop.json')}
          style={{ width: '70%', height: '70%', alignSelf: 'center' }}
          autoPlay
          loop
        />
      </View>
    )
  }

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
    </>
  )
}

export { Schedule }
