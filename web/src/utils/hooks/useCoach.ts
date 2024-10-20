import { getCoach, TGetCoachResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useCoach = (id: number): UseQueryResult<TGetCoachResponse, Error> => {
  return useQuery({
    queryKey: ['coach', id],
    queryFn: () => getCoach(id),
  })
}
