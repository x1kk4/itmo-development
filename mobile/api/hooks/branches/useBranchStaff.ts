import { TBranchesResponse, v2 } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useBranchStaff = (id?: number): UseQueryResult<TBranchesResponse, AxiosError> => {
  const queryFn = () => {
    if (!id) {
      throw new Error('Branch ID is required')
    }

    return v2.getStaffByBranchId(id)
  }

  return useQuery({
    queryKey: ['staff', id],
    queryFn,
    enabled: !!id,
  })
}
