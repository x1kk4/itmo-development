import { TInviteResponse, v2 } from '@/api'
import * as Clipboard from 'expo-clipboard'

import { useToastController } from '@tamagui/toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getInviteString } from '@/utils/invite'

export const useInviteManager = (): UseMutationResult<TInviteResponse, AxiosError> => {
  const toast = useToastController()

  return useMutation({
    mutationFn: () => {
      return v2.inviteManager()
    },
    onSuccess: async (code) => {
      await Clipboard.setStringAsync(getInviteString(code))
      toast.show('Приглашение скопировано в буфер обмена')
    },
    onError: () => {
      toast.show('Ошибка')
    },
  })
}
