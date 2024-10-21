import { getChildrens, TGetChildrensResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useChildrens = (ids: number[]): UseQueryResult<TGetChildrensResponse, Error> => {
  return useQuery({
    queryKey: ['childrens', ids],
    queryFn: () => getChildrens(ids),
  })
}
