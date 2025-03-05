import { create } from 'zustand'
import apiClient from '@/api/axiosInterceptors'

const usePostStore = create((set, get) => ({
    post: null,
    postImageUrl: null,
    userImageUrl: null,
    loading: true,
    error: null,
    fetchPost: (postId) => {
        set({ loading: true,error: null,postImageUrl: null,userImageUrl: null })
        apiClient
            .get(`/post/${postId}`)
            .then((res) => {
                set((state) => ({
                    ...state,
                    post: res.data,
                }))
                apiClient
                    .get(`/post/image/${res.data.imageName}`)
                    .then((res) => {
                        set({ postImageUrl: res.request.responseURL })
                    })
                    .catch((err) => {
                        console.log(err)
                        set({ postImageUrl: null })
                    })

                apiClient
                    .get(`/user/image/${res.data.user.imageName}`)
                    .then((res) => {
                        set({ userImageUrl: res.request.responseURL })
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                
            })
            .catch((err) => {
                console.log(err)
                set({ error: err.message, loading: false })
            })
        set({ loading: false })
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
