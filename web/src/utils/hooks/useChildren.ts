import { getChildren, TGetChildrenResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useChildren = (id: number | null): UseQueryResult<TGetChildrenResponse, Error> => {
  return useQuery({
    queryKey: ['children', id],
    queryFn: () => getChildren(id),
  })
}
