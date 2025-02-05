import { TBindRequest, v2 } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useBind = (): UseMutationResult<void, AxiosError, TBindRequest> => {
  return useMutation({
    mutationFn: (req: TBindRequest) => {
      return v2.bindUserToBranch(req)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['userBranches'] })
      queryClient.invalidateQueries({ queryKey: ['staff'] })
    },
  })
}
