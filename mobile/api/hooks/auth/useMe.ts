import { TUserResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useMe = (): UseQueryResult<TUserResponse, AxiosError> => {
  // TO DO: implement enabled logic and error handling

  const queryFn = async () => {
    try {
      return await v2.me()
      //eslint-disable-next-line
    } catch (error) {
      return null
    }
  }

  return useQuery({
    queryKey: ['me'],
    queryFn: queryFn,
    retry: 3,
    enabled: true,
  })
}
