import { v2 } from '@/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from '@/api/types'
import { queryClient } from '@/providers'

export const useLogout = (): UseMutationResult<void, AxiosError> => {
  return useMutation({
    mutationFn: v2.logout,
    onSuccess: async () => {
      await AsyncStorage.multiRemove([STORAGE_KEYS.AUTHORIZATION, STORAGE_KEYS.REFRESH])
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    // onError: (error) => {},
  })
}
