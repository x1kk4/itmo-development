import { getTrainingSession, TGetTrainingSessionResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useTrainingSession = (
  id?: number,
): UseQueryResult<TGetTrainingSessionResponse, Error> => {
  return useQuery({
    queryKey: ['training_session', id],
    queryFn: () => getTrainingSession(id),
  })
}
