import { TUpdateChildrenRequest, TUpdateChildrenResponse, updateChildren } from '@/api'
import { queryClient } from '@/main'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

export const useUpdateChild = (): UseMutationResult<
  TUpdateChildrenResponse,
  Error,
  TUpdateChildrenRequest,
  unknown
> => {
  return useMutation<TUpdateChildrenResponse, Error, TUpdateChildrenRequest, unknown>({
    mutationFn: (updates: TUpdateChildrenRequest) => updateChildren(updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['children', data.id] })
    },
  })
}
