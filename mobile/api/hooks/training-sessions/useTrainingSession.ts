import { TTrainingSessionResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useTrainingSession = (
  id?: number,
): UseQueryResult<TTrainingSessionResponse, AxiosError> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('Training session ID is required')
    }

    return v2.getTrainingSessionById(id)
  }

  return useQuery({
    queryKey: ['training-session', id],
    queryFn,
    enabled: !!id,
  })
}
