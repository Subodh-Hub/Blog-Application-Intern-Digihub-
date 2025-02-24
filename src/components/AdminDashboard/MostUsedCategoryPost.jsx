import apiClient from '@/api/axiosInterceptors'
import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Separator } from "@/components/ui/separator"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const MostUsedCategoryPost = () => {
    const [data, setData] = useState([])
    const mostLikedCategoryUrl = '/admin/mostUsedCategory'
    useEffect(() => {
        apiClient.get(mostLikedCategoryUrl).then((res) => {
            setData(res.data)
        })
    }, [])

    const chartData = data.map((el, key) => ({
        name: el.categoryId.categoryTitle.toUpperCase(),
        value: el.occurrence,
    }))

    return (
        <div className="lg:w-2/6 w-full min-h-[300px] bg-white shadow-md rounded-lg dark:bg-customDarkTheme">
            <h2 className="mb-4 text-lg font-semibold text-center">
                Number of post uploaded on a category
            </h2>
            <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            {/*custom index for piechart*/}
            <div className="flex justify-center gap-4 pb-5 mt-4">
                {chartData.map((el, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{
                                backgroundColor: COLORS[index % COLORS.length],
                            }}
                        ></div>
                        <span className="text-sm">{el.name}: <strong>{el.value}</strong></span>
                        <Separator  orientation="vertical" />

                    </div>
                ))}
            </div>
        </div>
    )
}

export default MostUsedCategoryPost
