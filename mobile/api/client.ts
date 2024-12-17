import axios from 'axios'

export const api = axios.create({
  timeout: 10000,
  baseURL: 'https://itmo.website/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const headers = config.headers

    console.log(headers)
    // set headers from storage here

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    const incomingHeaders = response.headers

    console.log(incomingHeaders)
    // get headers and set them to storage here

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
