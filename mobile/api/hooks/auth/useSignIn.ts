import { TSignInRequest, TUserResponse, v2 } from '@/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'

export const useSignIn = (): UseMutationResult<TUserResponse, AxiosError, TSignInRequest> => {
  return useMutation({
    mutationFn: (data: TSignInRequest) => {
      return v2.signIn(data)
    },
    // onSuccess: () => {},
    // onError: (error) => {},
  })
}
