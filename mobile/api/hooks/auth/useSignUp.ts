import { TSignUpRequest, TUserResponse, v2 } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useSignUp = (): UseMutationResult<TUserResponse, AxiosError, TSignUpRequest> => {
  return useMutation({
    mutationFn: (data: TSignUpRequest) => {
      return v2.signUp(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    // onError: (error) => {},
  })
}
