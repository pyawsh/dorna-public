import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from 'config/client'
import axios from 'axios'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

const setParam = (filters: any) => {
    const params: any = {}
    Object.keys(filters).forEach((key) => {
        if (filters[key]) {
            params[key] = filters[key]
        }
    })
    return params
}

export const createThunk = (
    typePrefix: string,
    method: HttpMethod,
    url: string
) =>
    createAsyncThunk(
        typePrefix,
        async ({
            data = undefined,
            query = undefined,
        }: {
            data?: Object
            query?: {
                id?: string
                type?: string
                pageNumber?: number
                pageSize?: number
                userId?: string
                filters?: Object
            }
        }) => {
            try {
                const newUrl =
                    url +
                    (query?.type ? '/' + query.type : '') +
                    (query?.id ? '/' + query.id : '') +
                    (query?.userId ? '/' + query.userId : '') +
                    (query?.pageSize ? '/' + query.pageSize : '') +
                    (query?.pageNumber ? '/' + query.pageNumber : '')
                const headers = url.includes('media/upload')
                    ? { 'Content-Type': 'multipart/form-data' }
                    : {}

                const params = query
                    ? query.filters
                        ? setParam(query.filters)
                        : null
                    : null
                const response =
                    method !== 'get' && method !== 'delete'
                        ? await axios[method](newUrl, data, {
                              ...Api,
                              params,
                              headers,
                          })
                        : await axios[method](newUrl, {
                              ...Api,
                              params,
                              headers,
                          })

                // check if response is successful and return the data
                if (response.status >= 200 && response.status < 300) {
                    return response.data
                }

                // if the response status is not successful, reject with the error message
                return Promise.reject(response.data.errors.toString())
            } catch (error: any) {
                return Promise.reject(error.response?.data?.errors.toString())
            }
        }
    )
