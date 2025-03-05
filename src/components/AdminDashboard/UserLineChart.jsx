import apiClient from '@/api/axiosInterceptors'
import { useEffect, useState } from 'react'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts'
import { date } from 'yup'

const UserLineChart = () => {
    const userIncreasedByMonth = '/admin/userByMonth'
    const [userByMonth, setUserByMonth] = useState([])
    useEffect(() => {
        apiClient
            .get(userIncreasedByMonth)
            .then((res) => {
                setUserByMonth(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    })
    const chartData = userByMonth.map((el, key) => {
        return {
            date: el.addDate,
            user: el.userId,
        }
    })
    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold text-center">
                User By Month
            </h2>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart
                    width={600}
                    height={300}
                    data={chartData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <Line type="monotone" dataKey="user" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default UserLineChart
