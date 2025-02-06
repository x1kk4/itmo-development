import { TGetTrainingSessionsRequest, TTrainingSessionsResponse, v2 } from '@/api'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useTrainingSessions = (
  data: TGetTrainingSessionsRequest,
  isEnabled?: boolean,
): UseQueryResult<TTrainingSessionsResponse, AxiosError> => {
  const queryFn = () => {
    return v2.getManyTrainingSessions(data)
  }

  return useQuery({
    queryKey: ['training-sessions', data.page, data.limit, data.branchId],
    queryFn,
    enabled: isEnabled ?? true,
  })
}
