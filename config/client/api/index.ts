import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_URL

const config: AxiosRequestConfig | undefined = {
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
}

export const Api = config ?? axios.create(config)
