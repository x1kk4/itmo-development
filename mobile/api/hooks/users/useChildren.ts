import { TUsersResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useChildren = (id?: number): UseQueryResult<TUsersResponse, Error> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('User ID is required')
    }
    return v2.getChildrenByUserId(id)
  }

  return useQuery({
    queryKey: ['children', id],
    queryFn,
    enabled: !!id,
  })
}
