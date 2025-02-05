import { TBranchesResponse, TGetBranchesRequest, v2 } from '@/api'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useBranches = (
  data: TGetBranchesRequest,
  isEnabled: boolean,
): UseQueryResult<TBranchesResponse, AxiosError> => {
  const queryFn = () => {
    return v2.getManyBranches(data)
  }

  return useQuery({
    queryKey: ['branches', data.page, data.limit, data.latitude, data.longitude, data.search],
    queryFn,
    enabled: isEnabled,
  })
}
