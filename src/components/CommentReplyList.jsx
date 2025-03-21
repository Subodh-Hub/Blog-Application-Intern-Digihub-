import { IoMdSend } from 'react-icons/io'
import * as Yup from 'yup'
import apiClient from '@/api/axiosInterceptors'
import { useFormik } from 'formik'
import useCommentReplyStore from './stores/CommentReplyStore'
import { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import { BiUpvote, BiDownvote, BiComment } from 'react-icons/bi'
import CommentReply from './CommentReply'

const CommentReplyList = ({ postId, commentId, comment, fetchComment }) => {
    const {
        commentsReply,
        addCommentsReply,
        fetchCommentsReply,
        fetchCommentsReplyCounts,
        commentsReplyCount,
    } = useCommentReplyStore()
    const [commentReply, setCommentReply] = useState(false)
    const [commentReact, setCommentReact] = useState({
        like: 0,
        dislike: 0,
    })
    const upvoteCount = (id) => {
        apiClient
            .get(`/commentReact/${id}/likeCount`)
            .then((res) => {
                setCommentReact((prev) => ({ ...prev, like: res.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const downvoteCount = (id) => {
        apiClient
            .get(`/commentReact/${id}/dislikeCount`)
            .then((res) => {
                setCommentReact((prev) => ({ ...prev, dislike: res.data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchCommentsReplyCounts(commentId)
        fetchCommentsReply(commentId)
        upvoteCount(commentId)
        downvoteCount(commentId)
    }, [postId])

    const [visibleCommentReply, setVisibleCommentReply] = useState(3)

    const formik = useFormik({
        initialValues: {
            content: '',
        },
        onSubmit: (values) => {
            addCommentsReply(postId, commentId, values)
            console.log('test', values)
            formik.resetForm()
        },
        validationSchema: Yup.object({
            content: Yup.string().required('Comment is required'),
        }),
    })
    const handleUpvote = () => {
        const upvotePayload = {
            like: !comment.likedByUser,
            dislike: false,
        }
        apiClient
            .post(`/commentReact/likeOrDislike/${commentId}`, upvotePayload)
            .then(() => {
                upvoteCount(commentId)
                downvoteCount(commentId)
                fetchComment()

            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleDownvote = () => {
        const downvotePayload = {
            like: false,
            dislike: !comment.disLikedByUser,

        }
        apiClient
            .post(`/commentReact/likeOrDislike/${commentId}`, downvotePayload)
            .then(() => {
                upvoteCount(commentId)
                downvoteCount(commentId)
                fetchComment()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="flex items-center gap-4 text-sm text-gray-500 ">
                <div className="flex gap-4">
                    <div className={`flex items-center gap-1`}>
                        <strong>{commentReact.like}</strong>
                        <button
                            className={`px-2 py-2 hover:rounded-full hover:bg-gray-200 hover:text-blue-500 ${comment.likedByUser ? 'text-blue-500 bg-gray-200 rounded-full' : ''}`}
                            onClick={handleUpvote}
                        >
                            <BiUpvote />
                        </button>
                    </div>
                    <div className="flex items-center gap-1">
                        <strong>{commentReact.dislike}</strong>
                        <button
                            className={`px-2 py-2 hover:rounded-full hover:bg-gray-200 hover:text-blue-500 ${comment.disLikedByUser ? 'text-blue-500 bg-gray-200 rounded-full' : ''}`}
                            onClick={handleDownvote}
                        >
                            <BiDownvote />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <span>
                        Reply: <strong>{commentsReplyCount[commentId]}</strong>
                    </span>

                    <button
                        className={`px-2 py-2 hover:rounded-full hover:bg-gray-200 hover:text-blue-500 ${commentReply ? 'text-blue-500 bg-gray-200 rounded-full' : ''}`}
                        onClick={() => setCommentReply(!commentReply)}
                    >
                        <BiComment />
                    </button>
                </div>
            </div>
            {commentReply && (
                <div className="lg:ml-40 h-fit ">
                    <div className="flex h-full gap-10">
                        <Separator
                            orientation="vertical"
                            className="h-auto w-[2px] bg-gray-300"
                        />
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="flex items-center p-1 space-x-2 overflow-hidden bg-gray-100 rounded-full shadow-md full">
                                    <input
                                        name="content"
                                        id="content"
                                        type="text"
                                        className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 rounded-l-full outline-none x-4 h focus:ring-2 focus:ring-blue-500"
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        placeholder="Add a reply"
                                    />

                                    <button
                                        type="submit"
                                        className="p-2 bg-gray-100 border-[1px] rounded-r-full border-solid hover:bg-gray-200 hover:scale-150 focus:outline-none"
                                    >
                                        <IoMdSend className="text-black" />
                                    </button>
                                </div>
                                {formik.errors.content ? (
                                    <div className="text-red-500">
                                        {formik.errors.content}
                                    </div>
                                ) : null}
                            </form>
                            {commentsReply[commentId]?.length > 0 ? (
                                commentsReply[commentId]
                                    ?.slice(0, visibleCommentReply)
                                    .map((comment, index) => (
                                        <CommentReply
                                            key={index}
                                            commentsReply={comment}
                                            commentId={commentId}
                                        />
                                    ))
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No replies yet
                                </p>
                            )}
                        </div>
                    </div>
                    {commentsReply[commentId]?.length > 3 &&
                        (commentsReply[commentId].length >
                        visibleCommentReply ? (
                            <button
                                className="text-sm text-blue-500"
                                onClick={() =>
                                    setVisibleCommentReply(
                                        visibleCommentReply + 3
                                    )
                                }
                            >
                                Show more
                            </button>
                        ) : (
                            <button
                                className="text-sm text-blue-500"
                                onClick={() => setVisibleCommentReply(3)}
                            >
                                View Less
                            </button>
                        ))}
                </div>
            )}
        </>
    )
}

export default CommentReplyList
