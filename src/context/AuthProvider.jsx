import apiClient from '@/api/axiosInterceptors'
import { createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [userInf, setUserInf] = useState(null)
    const URL = '/getUser-auth'
    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    const [refetch, setRefetch] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const fetchData = async () => {
        try {
            const response = await apiClient.get(URL)
            setUserInf(response.data)
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error('Unauthorized. Please log in.')
                localStorage.removeItem('accessToken')
                setUserInf(null)
            } else {
                toast.error('Failed to fetch user data.')
            }
        }
    }

    const loginAuth = (token) => {
        localStorage.setItem('accessToken', token)
        setIsAuthenticated(true)
        setToken(token)
        setRefetch((prev) => !prev) //update the ui for refetching
        toast.success('Logged in sucessfully!!!!')
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        setIsAuthenticated(false)
        setToken(null)
        setUserInf(null)
        toast.success('Logged out sucessfully!!!!')
        return <Navigate to="/" />
    }

    useEffect(() => {
        if (token) {
            fetchData()
        } else {
            setUserInf(null)
        }
    }, [token, refetch])

    return (
        <AuthContext.Provider
            value={{
                userInf,
                setUserInf,
                fetchData,
                setRefetch,
                loginAuth,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
