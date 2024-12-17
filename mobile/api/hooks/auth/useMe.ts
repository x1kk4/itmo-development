import { TUserResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useMe = (): UseQueryResult<TUserResponse, AxiosError> => {
  // TO DO: implement enabled logic and error handling

  return useQuery({
    queryKey: ['me'],
    queryFn: v2.me,
  })
}
