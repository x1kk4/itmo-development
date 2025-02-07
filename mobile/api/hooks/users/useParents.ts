import { TUsersResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useParents = (
  id: number | undefined,
  isEnabled?: boolean,
): UseQueryResult<TUsersResponse, AxiosError> => {
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
