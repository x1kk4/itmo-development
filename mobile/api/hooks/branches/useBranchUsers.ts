import { TBranchesResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useBranchUsers = (id?: number): UseQueryResult<TBranchesResponse, AxiosError> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('Branch ID is required')
    }

    return v2.getUsersByBranchId(id)
  }

  return useQuery({
    queryKey: ['branchUsers', id],
    queryFn,
    enabled: !!id,
  })
}
