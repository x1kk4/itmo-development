import { TEditProfileRequest, v2 } from '@/api'

import { useToastController } from '@tamagui/toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useEditProfile = (): UseMutationResult<void, AxiosError, TEditProfileRequest> => {
  const toast = useToastController()

  return useMutation({
    mutationFn: (data: TEditProfileRequest) => {
      return v2.editProfile(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      toast.show('Данные профиля обновлены')
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
