import { useUsers } from '@/api/hooks/users/useUsers'
import { TUser } from '@/api/types'
import { UserCard } from '@/ui/UserCard'
import { FC, useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Button, Input, View } from 'tamagui'
import { useDebounce } from '@uidotdev/usehooks'
import { Delete } from '@tamagui/lucide-icons'

const UsersList: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(20)
  const [search, setSearch] = useState<string>('')

  const debouncedSearch = useDebounce(search, 300)

  const [groupedData, setGroupedData] = useState<TUser[]>([])

  const { data, isLoading, refetch } = useUsers({ page, limit, search: debouncedSearch })

  useEffect(() => {
    if (data?.length) {
      if (page === 1) {
        setGroupedData(data)
      } else {
        setGroupedData((prev) => [...prev, ...data])
      }
    } else {
      if (page === 1) {
        setGroupedData([])
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
    <View minHeight={'$20'}>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        gap={'$1.5'}
      >
        <Input
          flex={1}
          placeholder='Поиск...'
          marginVertical={'$1.5'}
          value={search}
          onChangeText={(text) => {
            setPage(1)
            setSearch(text)
          }}
        />
        <Button
          onPress={() => {
            setPage(1)
            setSearch('')
          }}
        >
          <Delete />
        </Button>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
        data={groupedData}
        renderItem={({ item }) => <UserCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={incrementPage}
        ItemSeparatorComponent={() => <View paddingBottom={'$1.5'} />}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => <View style={{ marginTop: 96 }} />}
      />
    </View>
  )
}

export { UsersList }
