import { getClient, TGetClientResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useClient = (id: number): UseQueryResult<TGetClientResponse, Error> => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
  })
}
