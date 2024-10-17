import { TBranch } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getBranches } from '@/api'

export const useBranches = (): UseQueryResult<TBranch[], Error> => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
  })
}
