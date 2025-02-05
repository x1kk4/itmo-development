import { TUsersResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useParents = (
  id?: number,
  isEnabled?: boolean,
): UseQueryResult<TUsersResponse, Error> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('User ID is required')
    }
    return v2.getParentsByUserId(id)
  }

  return useQuery({
    queryKey: ['parents', id],
    queryFn,
    enabled: !!id && isEnabled,
  })
}
