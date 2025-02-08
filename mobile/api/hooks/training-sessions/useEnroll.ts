import { TEnrollRequest, v2 } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useEnroll = (): UseMutationResult<void, AxiosError, TEnrollRequest> => {
  return useMutation({
    mutationFn: (req: TEnrollRequest) => {
      return v2.enrollUser(req)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['grouped-training-sessions'] })
      queryClient.invalidateQueries({ queryKey: ['training-session'] })
    },
  })
}
