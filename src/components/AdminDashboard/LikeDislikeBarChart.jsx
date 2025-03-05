import apiClient from '@/api/axiosInterceptors'
import React, { useEffect, useState } from 'react'
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer,
} from 'recharts'

const LikeDislikeBarChart = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        apiClient
            .get('/admin/topUserWhoLikedMost')
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const chartData = data.map((el) => ({
        name: `${el.userId.firstName} ${el.userId.lastName}`,
        Upvote: el.likes,
    }))
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center mb-7">
                Top user who contributed most Upvote
            </h1>
            <ResponsiveContainer width="100%" height={500}>
            <BarChart
                width={400}
                height={250}
                data={chartData}
                className="lg:m-auto"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Upvote" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
            
        </div>
    )
}

export default LikeDislikeBarChart
