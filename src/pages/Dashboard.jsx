import Hero from '@/components/Hero'
import PostList from '@/components/PostList'
import { useEffect, useState } from 'react'
import apiClient from '@/api/axiosInterceptors'
const Dashboard = () => {
    const URL = '/posts'
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get(URL)
                setData(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <Hero /> 
            <PostList post={data} />
        </>
    )
}

export default Dashboard
