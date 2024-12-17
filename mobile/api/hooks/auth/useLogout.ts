import { v2 } from '@/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'

export const useLogout = (): UseMutationResult<void, AxiosError> => {
  return useMutation({
    mutationFn: v2.logout,
    // onSuccess: () => {},
    // onError: (error) => {},
  })
}
