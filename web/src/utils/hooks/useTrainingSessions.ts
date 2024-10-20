import { getTrainingSessions, TGetTrainingSessionsResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useTrainingSessions = (): UseQueryResult<TGetTrainingSessionsResponse, Error> => {
  return useQuery({
    queryKey: ['training_sessions'],
    queryFn: getTrainingSessions,
  })
}
