import { TInviteResponse, v2 } from '@/api'

import { useToastController } from '@tamagui/toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'

export const useInviteChildren = (): UseMutationResult<TInviteResponse, AxiosError> => {
  const toast = useToastController()

  return useMutation({
    mutationFn: () => {
      return v2.inviteChildren()
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: () => {
      toast.show('Ошибка')
    },
  })
}
