import { TGetBranchResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useBranch = (id?: number): UseQueryResult<TGetBranchResponse, Error> => {
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
