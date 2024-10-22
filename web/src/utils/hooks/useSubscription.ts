import { TGetSubscriptionResponse, getSubscription } from '@/api'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useSubscription = (
  id?: number | null,
): UseQueryResult<TGetSubscriptionResponse, Error> => {
  return useQuery({
    queryKey: ['subscription', id],
    queryFn: () => getSubscription(id),
  })
}
