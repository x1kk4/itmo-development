import { TUpdateSubscriptionRequest, TUpdateSubscriptionResponse, updateSubscription } from '@/api'

import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { queryClient } from '..'

export const useUpdateSubscription = (): UseMutationResult<
  TUpdateSubscriptionResponse,
  Error,
  { id: number; data: TUpdateSubscriptionRequest }
> => {
  return useMutation<
    TUpdateSubscriptionResponse,
    Error,
    { id: number; data: TUpdateSubscriptionRequest }
  >({
    mutationFn: ({ id, data }) => updateSubscription(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['subscription', data.id] })
    },
  })
}
