import { TBindRequest, v2 } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useUnbind = (): UseMutationResult<void, AxiosError, TBindRequest> => {
  return useMutation({
    mutationFn: (req: TBindRequest) => {
      return v2.unbindUserFromBranch(req)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['userBranches'] })
      queryClient.invalidateQueries({ queryKey: ['staff'] })
    },
  })
}
