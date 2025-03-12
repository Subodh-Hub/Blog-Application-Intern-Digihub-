import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import apiClient from '@/api/axiosInterceptors'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useFormik } from 'formik'
import useCommentReplyStore from './stores/CommentReplyStore'

const CommentReply = ({ commentsReply, commentId }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [image, setImage] = useState('')
    const { deleteCommentsReply, editCommentsReply } = useCommentReplyStore()
    console.log('Comments reply', commentsReply)
    useEffect(() => {
        apiClient
            .get(`/user/image/${commentsReply.user.imageName}`)
            .then((res) => {
                setImage(res.request.responseURL)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [commentsReply])

    const formik = useFormik({
        initialValues: {
            commentReply: commentsReply.content,
        },
        onSubmit: async (values) => {
            const commentReplyPayload = {
                content: values.commentReply,
            }
            editCommentsReply(commentId, commentsReply.id, commentReplyPayload)
            setIsEditing(false)
        },
    })

    function daysAgo(dateString) {
        const givenDate = new Date(dateString)
        const currentDate = new Date()

        // Set the time of both dates to midnight to ignore time differences
        givenDate.setHours(0, 0, 0, 0)
        currentDate.setHours(0, 0, 0, 0)

        // Calculate the difference in milliseconds
        const diffTime = currentDate - givenDate

        // Convert milliseconds to days
        const diffDays = diffTime / (1000 * 60 * 60 * 24)
        const diffMonths = diffDays / 30
        const diffYears = diffMonths / 12

        if (diffDays < 1) {
            return 'Today'
        } else if (diffDays < 2) {
            return '1 day ago'
        } else if (diffDays < 30) {
            return `${Math.floor(diffDays)} days ago`
        } else if (diffMonths < 2) {
            return '1 month ago'
        } else if (diffMonths < 12) {
            return `${Math.floor(diffMonths)} months ago`
        } else if (diffYears < 2) {
            return '1 year ago'
        } else {
            return `${Math.floor(diffYears)} years ago`
        }
    }

    return (
        <div className="flex flex-col gap-3 my-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3">
                        <Avatar className="rounded-full w-7 h-7">
                            <AvatarImage
                                src={image}
                                className="object-cover w-full h-full rounded-full"
                            />
                            <AvatarFallback>
                                {commentsReply.user.firstName.slice(0, 1)}
                                {commentsReply.user.lastName.slice(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium text-gray-700">
                            {commentsReply.user.firstName}{' '}
                            {commentsReply.user.lastName}
                        </p>
                    </div>

                    <p className="text-xs text-gray-500">
                        {daysAgo(commentsReply.created_At)}
                    </p>
                </div>

                {commentsReply.deletable ? (
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dark:bg-blue-950">
                            <DropdownMenuItem
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                            >
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your comment
                                            reply from this post.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                            onClick={() =>
                                                setIsDialogOpen(false)
                                            }
                                        >
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => {
                                                deleteCommentsReply(
                                                    commentId,
                                                    commentsReply.id
                                                )
                                                setIsDialogOpen(false)
                                            }}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    ''
                )}
            </div>

            <div>
                {isEditing ? (
                    <form>
                        <div className="flex flex-col gap-2">
                            <input
                                className="w-full p-2 border rounded-md"
                                name="commentReply"
                                value={formik.values.commentReply}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                    className="px-3 py-1 text-white bg-blue-500 rounded-md"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-3 py-1 bg-gray-300 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="flex items-center -translate-x-9">
                        <Separator className="w-20  h-[2px]" />
                        <p className="text-sm text-gray-500">
                            {commentsReply.content}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentReply
