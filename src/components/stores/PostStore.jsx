import { create } from 'zustand'
import apiClient from '@/api/axiosInterceptors'

const usePostStore = create((set, get) => ({
    post: null,
    loading: true,
    error: null,
    fetchPost: (postId) => {
        apiClient
            .get(`/post/${postId}`)
            .then((res) => {
                set((state) => ({
                    ...state,
                    post: res.data,
                    loading: false,
                }))
            })
            .catch((err) => {
                console.log(err)
                set({ error: err.message, loading: false })
            })
    },

    toggleLike: () => {
        set((state) => {
            if (!state.post) return state

            return {
                post: {
                    ...state.post,
                    likedByUser: !state.post.likedByUser,
                    disLikedByUser: false,
                },
            }
        })
    },

    toggleDislike: () => {
        set((state) => {
            if (!state.post) return state

            return {
                post: {
                    ...state.post,
                    disLikedByUser: !state.post.disLikedByUser,
                    likedByUser: false,
                },
            }
        })
    },

    editPost: (updatedPostData) => {
        set((state) => {
            console.log(updatedPostData)
            if (!state.post) return state

            return {
                post: {
                    ...state.post,
                    ...updatedPostData,
                },
            }
        })
    },
    isLoadingPicture: (values) => {
        set({ loading: values }) 
    },
}))
export default usePostStore
