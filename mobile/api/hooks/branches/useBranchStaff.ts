import { TUsersResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useBranchStaff = (id?: number): UseQueryResult<TUsersResponse, AxiosError> => {
  const queryFn = async () => {
    if (!id) {
      throw new Error('Branch ID is required')
    }

    return await v2.getStaffByBranchId(id).catch(() => {
      return []
    })
  }

  return useQuery({
    queryKey: ['staff', id],
    queryFn,
    enabled: !!id,
  })
}
