import { TGroupedTrainingSessionsResponse, TGetTrainingSessionsRequest, v2 } from '@/api'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useGroupedTrainingSessions = (
  data: TGetTrainingSessionsRequest,
  isEnabled?: boolean,
): UseQueryResult<TGroupedTrainingSessionsResponse, AxiosError> => {
  const queryFn = () => {
    return v2.getGroupedTrainingSessions(data)
  }

  return useQuery({
    queryKey: ['grouped-training-sessions', data.page, data.limit, data.branchId],
    queryFn,
    enabled: isEnabled ?? true,
  })
}
