import apiClient from '@/api/axiosInterceptors'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi'
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
const SinglePage = () => {
    const navigate = useNavigate()
    const { userInf } = useAuth()
    const { postId } = useParams()
    const [isDialogOpen, setIsDialogOpen] = useState({
        edit: false,
        delete: false,
    })
    const { likeCount, disLikeCount, fetchStats, updateLike, updateDisLike } =
        usePostStats()

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState('')

    useEffect(() => {
        const fetchData = () => {
            fetchStats(postId)
            setLoading(true)

            apiClient
                .get(`/post/${postId}`)
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                    return apiClient.get(`/post/image/${res.data.imageName}`)
                })
                .then((imageRes) => {
                    setImage(imageRes.request.responseURL)
                })
                .catch((error) => {
                    console.error('Error fetching post data or image:', error)
                    setLoading(false)
                })
        }

        fetchData()
    }, [postId, likeCount, disLikeCount])

    const deleteURL = `/posts-delete/${data.postId}`
    const deletePost = () => {
        apiClient.delete(deleteURL).then((res) => {
            toast.success('Post deleted successfully!!!')
            setTimeout(() => {
                navigate('/')
            }, 500)
        })
    }

    const { category, title, user, content, addDate, deletable } = data

    if (loading) {
        return <div>Loading...</div>
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

        if (diffDays < 1) {
            return 'Today'
        } else if (diffDays === 1) {
            return '1 day ago'
        } else {
            return `${Math.floor(diffDays)} days ago`
        }
    }

    const toggleDialog = (dialog, value) => {
        setIsDialogOpen((prevState) => ({
            ...prevState,
            [dialog]: value, // Toggle the dialog state
        }))
    }


    return (
        <div className="items-center dark:bg-customDarkTheme">
            <main className="w-[90vw] m-auto flex flex-col gap-10 md:px-30 xl:w-[80vw] pt-10">
                <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center justify-between w-full">
                        <p className="bg-[#4B6BFB] text-white px-3 py-1 font-sans rounded-md w-fit text-sm font-semibold capitalize">
                            {category.categoryTitle}
                        </p>
                        {deletable ? (
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
                                                
                                                   <EditPost data={data}/>
                                            
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
                                                    permanently delete your
                                                    account and remove your data
                                                    from our servers.
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
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                    </h2>
                    <div className="flex items-center gap-3">
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-[#97989F] text-base hover:cursor-pointer capitalize">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-[#97989F] text-base hover:cursor-pointer ml-5">
                            {daysAgo(addDate)}
                        </p>
                    </div>
                </div>
                <div className="w-[100%] h-[80vh] m-auto rounded-2xl overflow-hidden ">
                    <img
                        src={image}
                        alt=""
                        className="object-cover object-center w-full h-full "
                    />
                </div>
                <div className="text-lg serif text-[#3B3C4A] dark:text-[#BABABF]">
                    {content ? parse(content) : <p>No content available</p>}
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className={`flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500 ${
                            data.likedByUser ? 'bg-slate-500 text-white' : ''
                        }`}
                    >
                        <BiUpvote
                            className={`text-2xl text-[#4B6BFB] cursor-pointer dark:text-slate-200 dark:hover:text-white ${
                                data.likedByUser ? 'text-white' : ''
                            }`}
                            onClick={async () => {
                                userInf && Object.keys(userInf).length > 0
                                    ? (await updateLike(
                                          postId,
                                          data.likedByUser
                                      ),
                                      fetchStats(postId))
                                    : toast.error('Please Login first')
                            }}
                        />
                        {formatNumber(likeCount)}
                    </div>
                    <div
                        className={`flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500  ${
                            data.disLikedByUser
                                ? 'bg-slate-500 text-white font-semibold'
                                : ''
                        }`}
                    >
                        <BiDownvote
                            className={`text-2xl text-[#4B6BFB] cursor-pointer dark:text-slate-200 dark:hover:text-white  ${
                                data.disLikedByUser
                                    ? ' text-white font-semibold'
                                    : ''
                            }`}
                            onClick={async () => {
                                userInf && Object.keys(userInf).length > 0
                                    ? (await updateDisLike(
                                          postId,
                                          data.disLikedByUser
                                      ),
                                      fetchStats(postId))
                                    : toast.error('Please Login first')
                            }}
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
