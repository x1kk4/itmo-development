import {
  TUpdateTrainingSessionRequest,
  TUpdateTrainingSessionResponse,
  updateTrainingSession,
} from '@/api'
import { queryClient } from '@/main'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

export const useUpdateTrainingSession = (): UseMutationResult<
  TUpdateTrainingSessionResponse,
  Error,
  { id: number; data: TUpdateTrainingSessionRequest }
> => {
  return useMutation<
    TUpdateTrainingSessionResponse,
    Error,
    { id: number; data: TUpdateTrainingSessionRequest }
  >({
    mutationFn: ({ id, data }) => updateTrainingSession(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['training_session', data.id] })
      queryClient.invalidateQueries({ queryKey: ['training_sessions'] })
    },
  })
}
