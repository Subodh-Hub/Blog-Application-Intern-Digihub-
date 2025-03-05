import { create } from 'zustand'
import apiClient from '@/api/axiosInterceptors'
import { toast } from 'react-toastify'

const useCommentReplyStore = create((set, get) => ({
    commentsReply: {},
    commentsReplyCount: {},

    fetchCommentsReply: (commentId) => {
        apiClient
            .get(`/CommentReply-comment/${commentId}`)
            .then((res) => {
                set((state) => ({
                    commentsReply: {
                        ...state.commentsReply,
                        [commentId]: res.data,
                    },
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    },
    fetchCommentsReplyCounts: (commentId) => {
        apiClient
            .get(`/${commentId}/commentReplyCount`)
            .then((res) => {
                set((state) => ({
                    commentsReplyCount: {
                        ...state.commentsReplyCount,
                        [commentId]: res.data,
                    },
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    },
    addCommentsReply: (postId, commentId, updatedValue) => {
        apiClient
            .post(
                `/post/${postId}/comment/${commentId}/comment-reply`,
                updatedValue
            )
            .then((res) => {
                set((state) => ({
                    commentsReply: {
                        ...state.commentsReply,
                        [commentId]: [
                            ...(state.commentsReply[commentId] || []),
                            res.data,
                        ],
                    },
                }))

                toast.success('Comment Reply Added Successfully')
            })
            .catch((err) => {
                console.error('Error adding comment reply:', err)
                toast.error('Failed to add comment reply')
            })
    },
}))
export default useCommentReplyStore
