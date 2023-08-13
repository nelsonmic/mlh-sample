import axios from 'axios'
import { CookiesKeys } from '../core/constants'
import { getCookie } from '../lib/cookie.lib'

// common request config
const requestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Authentication axios instance
const client = axios.create({
  ...requestConfig,
})

client.interceptors.request.use((config) => {
  const token = getCookie(CookiesKeys.AUTH_COOKIE_ID)
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// No Authentication axios request
export const noAuthClient = axios.create({
  ...requestConfig,
})

export default client
