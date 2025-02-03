import { TUsersResponse, v2 } from '@/api'
import { TQueryPagination } from '@/api/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useUsers = (data: TQueryPagination): UseQueryResult<TUsersResponse, Error> => {
  const queryFn = () => {
    return v2.getManyUsers(data)
  }

  return useQuery({
    queryKey: ['users', data.page, data.limit, data.search],
    queryFn,
  })
}
