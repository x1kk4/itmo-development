import { useUsers } from '@/api/hooks/users/useUsers'
import { TUser } from '@/api/types'
import { Screen } from '@/ui/Screen'
import { UserCard } from '@/ui/UserCard'
import { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View } from 'tamagui'

export default function NavigatorScreen() {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(20)

  const [groupedData, setGroupedData] = useState<TUser[]>([])

  // const [refreshing, setRefreshing] = useState(false)
  const { data, isLoading } = useUsers({ page, limit })

  useEffect(() => {
    if (data?.length) {
      setGroupedData((prev) => [...prev, ...data])
    }
  }, [data])

  const incrementPage = useCallback(() => {
    if (!isLoading && data?.length === limit) {
      setPage((prev) => prev + 1)
    }
  }, [isLoading, limit, data])

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true)
  //   setTimeout(() => {
  //     setRefreshing(false)
  //   }, 2000)
  // }, [])

  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
        data={groupedData}
        renderItem={({ item }) => <UserCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={incrementPage}
        onEndReachedThreshold={0.8}
        ItemSeparatorComponent={() => <View height={'$0.5'} />}
      />
    </Screen>
  )
}
