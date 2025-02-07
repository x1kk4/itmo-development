import { TBranchesResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useUserBranches = (
  id: number | undefined,
  isEnabled?: boolean,
): UseQueryResult<TBranchesResponse, AxiosError> => {
  const queryFn = async () => {
    if (!id) {
      throw new Error('User ID is required')
    }

    return await v2.getBranchesByUserId(id).catch(() => {
      return []
    })
  }

  return useQuery({
    queryKey: ['userBranches', id],
    queryFn,
    enabled: !!id && isEnabled,
  })
}
