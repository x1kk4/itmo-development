import { getBranch, TGetBranchResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useBranch = (id?: number): UseQueryResult<TGetBranchResponse, Error> => {
  return useQuery({
    queryKey: ['branch', id],
    queryFn: () => getBranch(id),
  })
}
