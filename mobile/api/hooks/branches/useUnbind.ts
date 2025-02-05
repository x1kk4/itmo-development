import { TBindRequest, v2 } from '@/api'

import { useToastController } from '@tamagui/toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'

export const useUnbind = (): UseMutationResult<void, AxiosError, TBindRequest> => {
  const toast = useToastController()

  return useMutation({
    mutationFn: (req: TBindRequest) => {
      return v2.unbindUserFromBranch(req)
    },
    onSuccess: async () => {
      toast.show('Успешно')
    },
    onError: () => {
      toast.show('Ошибка')
    },
  })
}
