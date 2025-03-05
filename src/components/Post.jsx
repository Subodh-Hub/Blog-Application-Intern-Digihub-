import apiClient from '@/api/axiosInterceptors'
import React, { useEffect, useState } from 'react'
// import hero from '@/assets/images/hero.jpg'
import { useNavigate } from 'react-router-dom'

import parse from 'html-react-parser'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Skeleton from 'react-loading-skeleton'

const Post = ({ post }) => {
    const { postId, imageName, user, category, title, addDate } = post
    const [imageLoading, setImageLoading] = useState({
        postImage: true,
        avatarImage: true,
    })
    const [image, setImage] = useState({
        postImage: '',
        avatarImage: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        apiClient
            .get(`/post/image/${imageName}`)
            .then((res) => {
                setImage((prev) => ({
                    ...prev,
                    postImage: res.request.responseURL,
                }))
                setImageLoading((prev) => ({ ...prev, postImage: false }))
            })
            .catch((err) => {
                console.log(err)
                setImage((prev) => ({ ...prev, postImage: null }))
                setImageLoading(false)
            })
        apiClient
            .get(`/user/image/${user.imageName}`)
            .then((res) => {
                setImage((prev) => ({
                    ...prev,
                    avatarImage: res.request.responseURL,
                }))
                setImageLoading((prev) => ({ ...prev, avatarImage: false }))
            })
            .catch((err) => {
                console.log(err)
                setImage((prev) => ({ ...prev, avatarImage: null }))
                setImageLoading(false)
            })
    }, [postId])

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

    const avatarSrc =
        image.avatarImage !== null
            ? `${image.avatarImage}`
            : `https://github.com/shadcn.png`
    const avatarFallback =
        user.firstName.charAt(0).toUpperCase() +
        user.middleName.charAt(0).toUpperCase() +
        user.lastName.charAt(0).toUpperCase()

    if (imageLoading.postImage) {
        return (
            <main className="w-full cursor-pointer max-w-[392px] bg-white border-[1px] border-solid border-[#E8E8EA] rounded-xl drop-shadow-sm p-3 dark:bg-[#181A2A] dark:border-gray-700 hover:scale-105 transition-hover ease-in-out duration-100 hover:shadow-xl">
                <Skeleton className="w-[95%] h-[240px] rounded-md m-auto" />
                <div className="w-[360px] h-[200px] m-auto flex flex-col gap-4 mt-5 items-start">
                <Skeleton className="bg-[#F6F8FF] rounded-md px-3 py-1 w-[40%] dark:bg-[#1B1E34] " />
                </div>
            </main>
        )
    }
    return (
        <main
            className="w-full cursor-pointer max-w-[392px] bg-white border-[1px] border-solid border-[#E8E8EA] rounded-xl drop-shadow-sm p-3 dark:bg-[#181A2A] dark:border-gray-700 hover:scale-105 transition-hover ease-in-out duration-100 hover:shadow-xl"
            onClick={() =>
                navigate(
                    `/${category?.categoryTitle}/${category?.categoryId}/${postId}`
                )
            }
        >
            <div className="w-[95%] h-[240px] object-cover object-center bg-no-repeat rounded-md m-auto overflow-hidden">
                <img
                    src={image.postImage}
                    alt="blog image"
                    className="w-[100%]"
                />
            </div>
            <div className="w-[360px] h-[200px] m-auto flex flex-col gap-4 mt-5 items-start">
                <div className="bg-[#F6F8FF] rounded-md px-3 py-1 w-fit text-[#4B6BFB] font-thin text-md dark:bg-[#1B1E34] capitalize">
                    {category?.categoryTitle || 'No Category'}
                </div>
                <h3 className="text-2xl font-semibold leading-7 U line-clamp-3">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                </h3>
                <div className="flex items-center gap-3 justify-left">
                    <Avatar className="bg-gray-200 cursor-pointer w-9 h-9">
                        <AvatarImage src={avatarSrc} className="object-cover" />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer capitalize">
                        {user.firstName}
                    </p>
                    <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer">
                        {parse(formatDate(addDate))}
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Post
