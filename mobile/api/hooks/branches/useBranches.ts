import { TGetBranchesRequest, TGetBranchesResponse, v2 } from '@/api'

import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useBranches = (
  data: TGetBranchesRequest,
  isEnabled: boolean,
): UseQueryResult<TGetBranchesResponse, Error> => {
  const queryFn = () => {
    return v2.getManyBranches(data)
  }

  return useQuery({
    queryKey: ['branches', data.page, data.limit, data.latitude, data.longitude, data.search],
    queryFn,
    enabled: isEnabled,
  })
}
