import { TUserResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useMe = (): UseQueryResult<TUserResponse, AxiosError> => {
  return useQuery({
    queryKey: ['me'],
    queryFn: v2.me,
  })
}
