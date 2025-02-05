import { TUsersResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useUserBranches = (id?: number): UseQueryResult<TUsersResponse, AxiosError> => {
  const queryFn = async () => {
    if (!id) {
      throw new Error('User ID is required')
    }

    try {
      return await v2.getBranchesByUserId(id)
    } catch (error) {
      return []
    }
  }

  return useQuery({
    queryKey: ['userBranches', id],
    queryFn,
    enabled: !!id,
  })
}
