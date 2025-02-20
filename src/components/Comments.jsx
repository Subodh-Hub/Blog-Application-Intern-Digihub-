import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
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
import apiClient from '@/api/axiosInterceptors'
import { toast } from 'react-toastify'
import { usePostStats } from '@/context/PostStatusContext'
import { useState } from 'react'

const Comments = ({ comment, fetchComment }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const deleteCommentURL = `/comment/comment/${comment.id}`
    const deleteComment = () => {
        apiClient
            .delete(deleteCommentURL)
            .then((res) => {
                toast.success('Comment deleted sucessfully!!!')
                fetchComment()
                setIsDialogOpen(false)
            })
            .catch((err) => {
                console.error('err', err)
            })
    }
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

        if (diffDays < 1) {
            return 'Today'
        } else if (diffDays === 1) {
            return '1 day ago'
        } else {
            return `${Math.floor(diffDays)} days ago`
        }
    }
    return (
        <>
            <div className="flex flex-col gap-2 my-7 font-poppins">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="cursor-pointer ">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                className="rounded-full w-7 h-7"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-semibold capitalize text-slate-700">
                                {comment.user.firstName} {comment.user.lastName}
                            </h2>
                        </div>
                        <p className="ml-4 text-sm text-gray-500">
                            {daysAgo(comment.created_At)}
                        </p>
                    </div>
                    {comment.deletable ? (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger>
                                <BsThreeDotsVertical className="cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="dark:bg-blue-950">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
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
                                                This action cannot be undone.
                                                This will permanently delete
                                                your account and remove your
                                                data from our servers.
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
                                                onClick={deleteComment}
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
                    <p className="text-slate-500">{comment.content}</p>
                </div>
            </div>
        </>
    )
}

export default Comments
