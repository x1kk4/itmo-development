import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { createSubscription, TCreateSubscriptionResponse } from '@/api'
import { queryClient } from '@/main'

export const useCreateSubscription = (): UseMutationResult<
  TCreateSubscriptionResponse,
  Error,
  number
> => {
  return useMutation<TCreateSubscriptionResponse, Error, number>({
    mutationFn: (client: number) => createSubscription(client),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['client', data.client] })
    },
  })
}
