import apiClient from '@/api/axiosInterceptors'
import PostList from '@/components/PostList'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DynamicCategory = () => {
    const { name, id } = useParams()
    const URL = `/category/${id}/posts`
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
    }, [id])

    return (
        <div>
            <PostList post={data} />
        </div>
    )
}

export default DynamicCategory
