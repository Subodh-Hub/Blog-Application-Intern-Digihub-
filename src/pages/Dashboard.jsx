import Hero from '@/components/Hero'
import PostList from '@/components/PostList'
import { useEffect, useState } from 'react'
import apiClient from '@/api/axiosInterceptors'
const Dashboard = () => {
    const URL = '/posts'
    const [data, setData] = useState([])

    useEffect(() => {
        apiClient
            .get(URL)
            .then((res) => {setData(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Hero />
            <PostList post={data} />
        </>
    )
}

export default Dashboard
