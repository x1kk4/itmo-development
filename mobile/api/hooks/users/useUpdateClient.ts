import { TUpdateClientRequest, TUpdateClientResponse, updateClient } from '@/api'
import { queryClient } from '@/main'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

export const useUpdateClient = (): UseMutationResult<
  TUpdateClientResponse,
  Error,
  { id: number; data: TUpdateClientRequest }
> => {
  return useMutation<TUpdateClientResponse, Error, { id: number; data: TUpdateClientRequest }>({
    mutationFn: ({ id, data }) => updateClient(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['client', data.id] })
    },
  })
}
