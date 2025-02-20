import { useFormik } from 'formik'
import { loginSchema } from './loginValidationSchema'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import apiClient from '@/api/axiosInterceptors'
import useAuth from './useAuth'
import { jwtDecode } from 'jwt-decode'

const useLoginForm = () => {
    const URL = '/login'
    const [loading, setLoading] = useState(false)
    const { fetchData, userInf } = useAuth()

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            setLoading(true)
            const payload = {
                username: values.email,
                password: values.password,
            }
            apiClient
                .post(URL, payload)
                .then((response) => {
                    const accessToken = response.data.accessToken
                    localStorage.setItem('accessToken', accessToken)
                    fetchData()
                    toast.success('Login Successful')
                    const decoded = jwtDecode(accessToken)
                    setTimeout(() => {
                        decoded.role[0] === 'ADMIN'
                            ? navigate('/adminDashboard')
                            : navigate('/')
                    }, 1000)
                })
                .catch((error) => {
                    console.error('Request Error:', error.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        },
    })

    return {
        formik,
        loading,
    }
}

export default useLoginForm
