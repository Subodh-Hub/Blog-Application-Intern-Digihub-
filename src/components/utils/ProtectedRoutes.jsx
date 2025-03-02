import { useNavigate, useOutlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'

const ProtectedRoutes = () => {
    const navigate = useNavigate()
    const outlet = useOutlet()
    const { userInf } = useAuth()

    useEffect(() => {
        if (!userInf) {
            navigate('/')
        }
    }, [userInf, navigate])

    return userInf ? outlet : ''
}

export default ProtectedRoutes
