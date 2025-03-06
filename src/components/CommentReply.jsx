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

const CommentReply = ({ commentsReply }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [image, setImage] = useState('')
    
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
            try {
                const res = await apiClient.put(
                    `/CommentReply/${commentsReply.id}`,
                    values
                )
                console.log('values', values)
            } catch (error) {
                console.error(error)
            }
        },
    })

    return (
        <div className="flex flex-col gap-3 my-3">
            <div className="flex items-center justify-between">
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
                                            from this post.
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
                                        // onClick={deleteComment}
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
