import { getTrainingSessions, TTrainingSession } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useTrainingSessions = (): UseQueryResult<TTrainingSession[], Error> => {
  return useQuery({
    queryKey: ['training_sessions'],
    queryFn: getTrainingSessions,
  })
}
