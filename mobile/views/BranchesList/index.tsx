import { useBranches } from '@/api/hooks/branches/useBranches'
import { TBranch } from '@/api/types'
import { BranchCard } from '@/ui/BranchCard'
import { FC, useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View } from 'tamagui'

const BranchesList: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(20)

  const [groupedData, setGroupedData] = useState<TBranch[]>([])

  const { data, isLoading, refetch } = useBranches({ page, limit })

  useEffect(() => {
    if (data?.length) {
      if (page === 1) {
        setGroupedData(data)
      } else {
        setGroupedData((prev) => [...prev, ...data])
      }
    }
  }, [data, page])

  const incrementPage = useCallback(() => {
    if (!isLoading && data?.length === limit) {
      setPage((prev) => prev + 1)
    }
  }, [isLoading, limit, data])

  const handleRefresh = useCallback(async () => {
    setPage(1)
    await refetch()
  }, [refetch])

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={false}
      data={groupedData}
      renderItem={({ item }) => <BranchCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={incrementPage}
      ItemSeparatorComponent={() => <View height={'$0.5'} />}
      refreshing={isLoading}
      onRefresh={handleRefresh}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => <View style={{ marginTop: 4 }} />}
      ListFooterComponent={() => <View style={{ marginTop: 16 }} />}
    />
  )
}

export { BranchesList }
