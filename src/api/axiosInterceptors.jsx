import axios from 'axios'
import { toast } from 'react-toastify'

const apiClient = axios.create({
    //baseURL: 'http://172.17.17.34:9090',
    baseURL: "http://localhost:8080",
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error?.response?.status === 401) {
            toast.error('Unauthorized! Redirecting to login...')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default apiClient
