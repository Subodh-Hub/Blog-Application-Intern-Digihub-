import { useState } from 'react'
import { useFormik } from 'formik'
import { loginSchema } from './loginValidationSchema'
import { useLogin } from './../../../hooks/auth/useAuth'

export const useLoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [showValues, setShowValues] = useState({
        password: '',
        showPassword: false,
    })

    const { mutate, isError } = useLogin({})
    const hasEmail = localStorage.getItem('dg-user')
    const formik = useFormik({
        initialValues: {
            email: hasEmail || '',
            brokerNo: '',
            password: '',
            captcha: '',
            rememberMe: Boolean(hasEmail),
            identifier: '',
            referenceNo: '',
            isMinor: false,
        },
        validationSchema: loginSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            setLoading(true)
            if (values.rememberMe) {
                localStorage.setItem('dg-user', values.email)
            }
            handleLogin(values)
        },
    })

    const handleLogin = (values) => {
        const {
            email,
            brokerNo,
            password,
            identifier,
            captcha,
            referenceNo,
            isMinor,
        } = values

        const trimmedPassword = password.trim()
        mutate(
            {
                email,
                brokerNo,
                password: trimmedPassword,
                identifier,
                captcha,
                referenceNo,
                isMinor,
            },
            { onSettled: () => setLoading(false) }
        )
    }

    const handleClickShowPassword = () => {
        setShowValues({
            ...showValues,
            showPassword: !showValues.showPassword,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return {
        handleLogin,
        formik,
        showValues,
        loading,
        handleMouseDownPassword,
        handleClickShowPassword,
        isError,
    }
}
