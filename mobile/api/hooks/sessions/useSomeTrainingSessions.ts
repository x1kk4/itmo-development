import { getTrainingSessionsByIds, TGetTrainingSessionsByIdsResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useSomeTrainingSessions = (
  ids?: number[],
): UseQueryResult<TGetTrainingSessionsByIdsResponse, Error> => {
  return useQuery({
    queryKey: ['training_sessions', ids],
    queryFn: () => getTrainingSessionsByIds(ids),
  })
}
