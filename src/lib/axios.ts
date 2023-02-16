import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { AUTH_API_ROOT_URL, BEER_API_ROOT_URL } from '@/config'

export const authApiClient = axios.create({
  baseURL: AUTH_API_ROOT_URL,
})

export const punkApiClient = axios.create({
  baseURL: BEER_API_ROOT_URL,
})
punkApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error as AxiosError
    // TODO: Notification
    return Promise.reject(err.response?.data || err.message)
  }
)

export const punkApiAxiosBaseQuery =
(): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  },
  unknown,
  unknown
> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await punkApiClient({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }