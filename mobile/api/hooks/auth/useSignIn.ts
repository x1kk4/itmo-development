import { TSignInRequest, TUserResponse, v2 } from '@/api'

import { useToastController } from '@tamagui/toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useSignIn = (): UseMutationResult<TUserResponse, AxiosError, TSignInRequest> => {
  const toast = useToastController()

  return useMutation({
    mutationFn: (data: TSignInRequest) => {
      return v2.signIn(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: (error) => {
      //@ts-ignore
      const friendlyError = error?.response?.data?.message[0]

      if (friendlyError) {
        toast.show('Ошибка', {
          message: friendlyError,
        })
      } else {
        toast.show('Ошибка')
      }
    },
  })
}
