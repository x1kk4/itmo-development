import { TAttendRequest, v2 } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useUnattend = (): UseMutationResult<void, AxiosError, TAttendRequest> => {
  return useMutation({
    mutationFn: (req: TAttendRequest) => {
      return v2.unattendUser(req)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['grouped-training-sessions'] })
      queryClient.invalidateQueries({ queryKey: ['training-session'] })
    },
  })
}
