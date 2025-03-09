import { create } from 'zustand'
import apiClient from '@/api/axiosInterceptors'
import { toast } from 'react-toastify'
import { comment } from 'postcss'

const useCommentReplyStore = create((set, get) => ({
    commentsReply: {},
    commentsReplyCount: {},
    commentsReplyUserImage: {},

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

                toast.success('Reply Added Successfully')
            })
            .catch((err) => {
                console.error('Error adding comment reply:', err)
                toast.error('Failed to add comment reply')
            })
    },

    editCommentsReply: (commentId,commentReplyId , values) => {
        apiClient
            .put(`/update-commentReply/${commentReplyId}`, values)
            .then((res) => {
                set((state) => ({
                    commentsReply: {
                        ...state.commentsReply,
                        [commentId]: state.commentsReply[commentId].map(
                            (reply) =>
                                reply.id === commentReplyId ? res.data : reply
                        ),
                    },
                }))
                toast.success('Reply Updated Successfully')
            })
            .catch((err) => {
                console.error('Error updating comment reply:', err)
                toast.error('Failed to update comment reply')
            })
    },
    deleteCommentsReply: (commentId, commentReplyId) => {
        apiClient
            .delete(`/Comment-Reply/${commentReplyId}`)
            .then((res) => {
                set((state) => ({
                    commentsReply: {
                        ...state.commentsReply,
                        [commentId]: state.commentsReply[commentId].filter(
                            (reply) => reply.id !== commentReplyId
                        ),
                    },
                }))
                toast.success('Reply Deleted Successfully')
            })
            .catch((err) => {
                console.error('Error deleting comment reply:', err)
                toast.error('Failed to delete comment reply')
            })
    },
}))
export default useCommentReplyStore
