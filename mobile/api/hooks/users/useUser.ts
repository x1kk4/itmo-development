import { TUserResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useUser = (id?: number): UseQueryResult<TUserResponse, Error> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('User ID is required')
    }

    return v2.getUserById(id)
  }

  return useQuery({
    queryKey: ['user', id],
    queryFn,
    enabled: !!id,
  })
}
