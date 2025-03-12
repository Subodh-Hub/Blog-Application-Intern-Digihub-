import Hero from '@/components/Hero'
import PostList from '@/components/PostList'
import { useEffect, useState } from 'react'
import apiClient from '@/api/axiosInterceptors'
import { Search } from 'lucide-react'

const Dashboard = () => {
    const URL = '/posts'
    const [data, setData] = useState([])

    useEffect(() => {
        apiClient
            .get(URL)
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <>
        
            <Hero />
            <PostList
                post={data}
            />
        </>
    )
}

export default Dashboard
