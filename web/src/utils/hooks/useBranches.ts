import { TGetBranchesResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getBranches } from '@/api'

export const useBranches = (): UseQueryResult<TGetBranchesResponse, Error> => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
  })
}
