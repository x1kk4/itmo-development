import { v2 } from '@/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from '@/api/types'
import { queryClient } from '..'

export const useLogout = (): UseMutationResult<void, AxiosError, void> => {
  return useMutation({
    mutationFn: v2.logout,
    onSuccess: async () => {
      await AsyncStorage.multiRemove([STORAGE_KEYS.AUTHORIZATION, STORAGE_KEYS.REFRESH])
      queryClient.resetQueries({ queryKey: ['me'] })
    },
    // onError: (error) => {},
  })
}
