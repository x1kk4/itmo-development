import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEYS } from './types'

export const api = axios.create({
  timeout: 10000,
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  async (config) => {
    const [[authorizationKey, authorizationValue], [refreshKey, refreshValue]] =
      await AsyncStorage.multiGet([STORAGE_KEYS.AUTHORIZATION, STORAGE_KEYS.REFRESH])

    if (authorizationKey && refreshKey) {
      config.headers[authorizationKey] = authorizationValue
      config.headers[refreshKey] = refreshValue
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  async (response) => {
    const { authorization, refresh } = response.headers

    if (authorization && refresh) {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.AUTHORIZATION, authorization],
        [STORAGE_KEYS.REFRESH, refresh],
      ])
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
