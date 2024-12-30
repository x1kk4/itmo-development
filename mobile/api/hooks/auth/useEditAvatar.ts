import { v2 } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { queryClient } from '..'

export const useEditAvatar = (): UseMutationResult<
  void,
  AxiosError,
  { uri: string; mimeType: string; name: string }
> => {
  return useMutation({
    mutationFn: (data) => {
      return v2.editAvatar(data.uri, data.mimeType, data.name)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      // queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
