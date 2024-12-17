import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const api = axios.create({
  timeout: 10000,
  baseURL: 'https://itmo.website/api/v2',
  // baseURL: 'http://localhost:3000/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  async (config) => {
    const authorization = await AsyncStorage.getItem('authorization')
    const refresh = await AsyncStorage.getItem('refresh')

    if (authorization && refresh) {
      config.headers.authorization = authorization
      config.headers.refresh = refresh
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
      await AsyncStorage.setItem('authorization', authorization)
      await AsyncStorage.setItem('refresh', refresh)
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
