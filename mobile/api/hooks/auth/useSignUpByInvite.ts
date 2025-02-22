import { TSignUpByInviteRequest, TUserResponse, v2 } from '@/api'

import { useToastController } from '@tamagui/toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useSignUpByInvite = (): UseMutationResult<
  TUserResponse,
  AxiosError,
  TSignUpByInviteRequest
> => {
  const toast = useToastController()

  return useMutation({
    mutationFn: (data: TSignUpByInviteRequest) => {
      return v2.signUpByInvite(data)
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
