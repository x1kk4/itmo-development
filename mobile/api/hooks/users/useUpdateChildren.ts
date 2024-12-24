import { TUpdateChildrenRequest, TUpdateChildrenResponse, updateChildren } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { queryClient } from '..'

export const useUpdateChildren = (): UseMutationResult<
  TUpdateChildrenResponse,
  Error,
  { id: number; data: TUpdateChildrenRequest }
> => {
  return useMutation<TUpdateChildrenResponse, Error, { id: number; data: TUpdateChildrenRequest }>({
    mutationFn: ({ id, data }) => updateChildren(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['children', data.id] })
    },
  })
}
