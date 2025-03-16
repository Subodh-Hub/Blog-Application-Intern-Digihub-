import apiClient from '@/api/axiosInterceptors'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'
const Hero = () => {
    const [loading, setLoading] = useState(true)
    const [topViewedPost, setTopViewedPost] = useState([])
    const [heroImageUrl, setHeroImageUrl] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        apiClient
            .get(`/topViewPost`)
            .then((res) => {
                setTopViewedPost(res.data)
                apiClient
                    .get(`/post/image/${res.data[0].imageName}`)
                    .then((res) => {
                        setHeroImageUrl(res.request.responseURL)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => console.log(err))
    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()

        // Function to add the appropriate suffix to the day
        function getDayWithSuffix(day) {
            if (day > 3 && day < 21) return day + '<sup>th</sup>' // Covers 11th, 12th, 13th, etc.
            switch (day % 10) {
                case 1:
                    return day + '<sup>st</sup>'
                case 2:
                    return day + '<sup>nd</sup>'
                case 3:
                    return day + '<sup>rd</sup>'
                default:
                    return day + '<sup>th</sup>'
            }
        }

        const dayWithSuffix = getDayWithSuffix(day)

        return `${dayWithSuffix}  ${month} ${year}`
    }
    if (loading) {
        return (
            <div className="flex justify-center w-screen dark:bg-customDarkTheme">
                <div className="z-10 relative w-full max-w-[90vw] text-black bg-white h-[85vh] dark:bg-customDarkTheme bg-cover bg-center bg-no-repeat rounded-2xl">
                    <Skeleton className="absolute bottom-0 z-40 p-8 w-fit xl:bottom-0 xl:translate-y-8 xl:left-20 xl:bg-white xl:shadow-xl xl:rounded-lg xl:dark:bg-customDarkTheme dark:text-white" />
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="flex justify-center w-screen dark:bg-customDarkTheme">
                <div
                    className=" z-10 relative w-full max-w-[90vw] text-black bg-white h-[85vh] dark:bg-customDarkTheme bg-cover bg-center bg-no-repeat rounded-2xl"
                    style={{ backgroundImage: `url(${heroImageUrl})` }}
                >
                    <div className="absolute bottom-0 z-40 p-8 w-fit xl:bottom-0 xl:translate-y-8 xl:left-20 xl:bg-white xl:shadow-xl xl:rounded-lg xl:dark:bg-customDarkTheme dark:text-white">
                        <p className="bg-[#4B6BFB] text-white px-3 py-1 font-sans rounded-md w-fit text-sm font-semibold">
                            {topViewedPost[0]?.category.categoryTitle}
                        </p>
                        <h1
                            className="max-w-md mt-4 text-4xl font-bold leading-10 tracking-wide text-left text-white cursor-pointer text-sans xl:text-black xl:dark:text-white"
                            onClick={() =>
                                navigate(
                                    `${topViewedPost[0]?.category.categoryTitle}/${topViewedPost[0]?.category.categoryId}/${topViewedPost[0]?.postId}`
                                )
                            }
                        >
                            {topViewedPost[0]?.title}
                        </h1>

                        <div className="flex items-center justify-start gap-4 mt-5 profile">
                            <div className="object-cover w-10 h-10 overflow-hidden rounded-full">
                                <Avatar className="cursor-pointer ">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer">
                                {topViewedPost[0]?.user.firstName}{' '}
                                {topViewedPost[0]?.user.lastName}
                            </p>
                            <p className="text-white xl:text-[#97989F] text-base">
                                {parse(formatDate(topViewedPost[0]?.addDate))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
