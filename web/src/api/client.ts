import axios from 'axios'

export const api = axios.create({
  timeout: 10000,
  baseURL: 'https://itmo.website/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})
