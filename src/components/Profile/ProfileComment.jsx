import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileComment = ({ comment }) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer ">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        className="rounded-full w-7 h-7"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h3 className="text-base font-medium text-black capitalize dark:text-white">
                    {comment.post.user.firstName} {comment.post.user.lastName}
                </h3>
                <p
                    className="text-sm font-thin text-gray-900 cursor-pointer dark:text-gray-200"
                    onClick={() => {
                        navigate(
                            `/${comment.post.category.categoryTitle}/${comment.post.category.categoryId}/${comment.post.postId}`
                        )
                    }}
                >
                    {comment.post.title}
                </p>
            </div>
            <div className="ml-9">
                <h3 className="text-lg font-medium text-black capitalize dark:text-white">
                    {comment.user.firstName} {comment.user.lastName}
                </h3>
                <p className="text-base font-thin text-gray-800 font-popins dark:text-gray-300">
                    {comment.content}
                </p>
            </div>
            <hr />
        </div>
    )
}

export default ProfileComment
