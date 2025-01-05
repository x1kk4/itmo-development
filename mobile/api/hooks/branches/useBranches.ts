import { TGetBranchesResponse, v2 } from '@/api'
import { TQueryPagination } from '@/api/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useBranches = (
  data: TQueryPagination,
): UseQueryResult<TGetBranchesResponse, Error> => {
  const queryFn = () => {
    return v2.getManyBranches(data)
  }

  return useQuery({
    queryKey: ['branches', data.page, data.limit],
    queryFn,
  })
}
