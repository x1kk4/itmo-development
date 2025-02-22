import { TBranchResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useBranch = (id: number | undefined): UseQueryResult<TBranchResponse, AxiosError> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('Branch ID is required')
    }

    return v2.getBranchById(id)
  }

  return useQuery({
    queryKey: ['branch', id],
    queryFn,
    enabled: !!id,
  })
}
