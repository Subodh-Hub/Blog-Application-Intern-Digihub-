import apiClient from '@/api/axiosInterceptors'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import useAuth from '@/components/hooks/useAuth'
import { toast, ToastContainer } from 'react-toastify'
import CommentsList from '@/components/CommentsList.jsx'
import { usePostStats } from '@/context/PostStatusContext'
import parse from 'html-react-parser'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
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
import EditPost from '@/components/EditPost'
import usePostStore from '@/components/stores/PostStore'
import EditPicture from '@/components/EditPicture'
import { Eye } from 'lucide-react'

const SinglePage = () => {
    const navigate = useNavigate()
    const { userInf } = useAuth()
    const { postId } = useParams()
    const [isDialogOpen, setIsDialogOpen] = useState({
        edit: false,
        changePicture: false,
        delete: false,
    })
    const [avatarImage, setAvatarImage] = useState('')
    const { likeCount, disLikeCount, updateLike, updateDisLike } =
        usePostStats()

    const {
        post,
        loading,
        fetchPost,
        toggleLike,
        toggleDislike,
        postImageUrl,
        userImageUrl,
    } = usePostStore()

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchPost(postId)
    }, [postId])

    const deleteURL = `/posts-delete/${postId}`

    const deletePost = () => {
        apiClient.delete(deleteURL).then((res) => {
            toast.success('Post deleted successfully!!!')
            setTimeout(() => {
                navigate('/')
            }, 500)
        })
    }

    const formatNumber = (number) => {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
        }
        return number
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

    // dialog for the edit and delete post
    const toggleDialog = (dialog, value) => {
        setIsDialogOpen((prevState) => ({
            ...prevState,
            [dialog]: value,
        }))
    }

    const handleLike = () => {
        if (userInf && Object.keys(userInf).length > 0) {
            toggleLike()
            updateLike(postId, post?.likedByUser) // Update backend
        } else {
            toast.error('Please Login first')
        }
    }
    const handleDislike = () => {
        if (userInf && Object.keys(userInf).length > 0) {
            toggleDislike()
            updateDisLike(postId, post?.disLikedByUser) // Update backend
        } else {
            toast.error('Please Login first')
        }
    }
    const avatarSrc = post?.user?.imageName
        ? `${userImageUrl}`
        : `https://github.com/shadcn.png`

    if (loading) {
        return <div>Loading...</div>
    }
    // if (!post) return <p>No post found.</p>
    return (
        <div className="items-center dark:bg-customDarkTheme">
            <main className="w-[90vw] m-auto flex flex-col gap-10 md:px-30 xl:w-[80vw] pt-10">
                <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center justify-between w-full">
                        <p className="bg-[#4B6BFB] text-white px-3 py-1 font-sans rounded-md w-fit text-sm font-semibold capitalize">
                            {post?.category?.categoryTitle}
                        </p>
                        {post?.deletable ? (
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger>
                                    <BsThreeDotsVertical className="cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="dark:bg-blue-950">
                                    <Dialog
                                        open={isDialogOpen.edit}
                                        onOpenChange={(value) =>
                                            toggleDialog('edit', value)
                                        }
                                    >
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem
                                                onSelect={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Edit Post
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Once you submit the post it
                                                    will be updated
                                                </DialogDescription>
                                                <EditPost />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <DropdownMenuSeparator />
                                    <Dialog
                                        open={isDialogOpen.changePicture}
                                        onOpenChange={(value) =>
                                            toggleDialog('changePicture', value)
                                        }
                                    >
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem
                                                onSelect={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Change the Picture
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Change Picture
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Select the picture from your
                                                    device!!!
                                                </DialogDescription>
                                                <EditPicture
                                                    postId={postId}
                                                    stateDialog={toggleDialog}
                                                />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <DropdownMenuSeparator />

                                    <AlertDialog
                                        open={isDialogOpen.delete}
                                        onOpenChange={(value) =>
                                            toggleDialog('delete', value)
                                        }
                                    >
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem
                                                onSelect={(e) =>
                                                    e.preventDefault()
                                                }
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
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete your post
                                                    and remove your data from
                                                    our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel
                                                    onClick={() =>
                                                        toggleDialog(
                                                            'delete',
                                                            false
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={deletePost}
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
                    <h2 className="text-4xl font-semibold">
                        {post?.title}
                    </h2>
                    <div className="flex items-center gap-3">
                        <Avatar className="cursor-pointer">
                            <AvatarImage
                                src={avatarSrc}
                                className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-[#97989F] text-base hover:cursor-pointer capitalize">
                            {post?.user?.firstName} {post?.user?.lastName}
                        </p>
                        <p className="text-[#97989F] text-base hover:cursor-pointer ml-5">
                            {daysAgo(post?.addDate)}
                        </p>
                    </div>
                    <div className="text-[#97989F] flex items-center gap-3 mt-3">
                        <Eye size={16} />
                        <p className="text-xs">{post?.viewCount}</p>
                    </div>
                </div>
                <div className="w-[100%] h-[80vh] m-auto rounded-2xl overflow-hidden ">
                    <img
                        src={postImageUrl}
                        alt=""
                        className="object-cover object-center w-full h-full "
                    />
                </div>
                <div className="text-lg serif text-[#3B3C4A] dark:text-[#BABABF]">
                    {post?.content ? (
                        parse(post?.content)
                    ) : (
                        <p>No content available</p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className={`flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500 ${
                            post?.likedByUser ? 'bg-slate-500 text-white' : ''
                        }`}
                    >
                        <BiUpvote
                            className={`text-2xl text-[#4B6BFB] cursor-pointer dark:text-slate-200 dark:hover:text-white ${
                                post?.likedByUser ? 'text-white' : ''
                            }`}
                            onClick={handleLike}
                        />
                        {formatNumber(likeCount)}
                    </div>
                    <div
                        className={`flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500  ${
                            post?.disLikedByUser
                                ? 'bg-slate-500 text-white font-semibold'
                                : ''
                        }`}
                    >
                        <BiDownvote
                            className={`text-2xl text-[#4B6BFB] cursor-pointer dark:text-slate-200 dark:hover:text-white  ${
                                post?.disLikedByUser
                                    ? ' text-white font-semibold'
                                    : ''
                            }`}
                            onClick={handleDislike}
                        />
                        {formatNumber(disLikeCount)}
                    </div>
                </div>
                <CommentsList postId={postId} />
            </main>
            <ToastContainer />
        </div>
    )
}

export default SinglePage
