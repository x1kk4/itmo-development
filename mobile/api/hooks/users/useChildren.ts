import { TUsersResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useChildren = (
  id?: number,
  isEnabled?: boolean,
): UseQueryResult<TUsersResponse, AxiosError> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('User ID is required')
    }
    return v2.getChildrenByUserId(id)
  }

  return useQuery({
    queryKey: ['children', id],
    queryFn,
    enabled: !!id && isEnabled,
  })
}
