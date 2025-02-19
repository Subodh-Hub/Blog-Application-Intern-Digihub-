import { createContext, useContext, useState } from "react";
import apiClient from "@/api/axiosInterceptors";

const PostStatsContext = createContext();

export const PostStatsProvider = ({ children }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  const fetchStats = async (postId) => {
    try {
      const likeRes = await apiClient.get(`like/${postId}/likeCount`);
      const dislikeRes = await apiClient.get(`like/${postId}/disLikeCount`);
      const commentRes = await apiClient.get(`comment/${postId}/commentCount`);

      setLikeCount(likeRes.data);
      setDisLikeCount(dislikeRes.data);
      setCommentsCount(commentRes.data);
    } catch (error) {
      console.error("Error fetching post stats:", error);
    }
  };

  const updateLike = async (postId,likedByUser ) => {

    try {
      const res = await apiClient.post(`like/likeOrDislike/${postId}`, {
        like: !likedByUser,
        postId,
      });
      if (res.data) {
        const likeRes = await apiClient.get(`like/${postId}/likeCount`);
        setLikeCount(likeRes.data);
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const updateDisLike = async (postId,disLikedByUser) => {
    try {
      const res = await apiClient.post(`like/likeOrDislike/${postId}`, {
        disLike: !disLikedByUser,
        postId,
      });
      if (res.data) {
        const dislikeRes = await apiClient.get(`like/${postId}/disLikeCount`);
        setDisLikeCount(dislikeRes.data);
      }
    } catch (error) {
      console.error("Error updating dislike count:", error);
    }
  };

  return (
    <PostStatsContext.Provider
      value={{
        likeCount,
        disLikeCount,
        commentsCount,
        fetchStats,
        updateLike,
        updateDisLike,
      }}
    >
      {children}
    </PostStatsContext.Provider>
  );
};

export const usePostStats = () => useContext(PostStatsContext);
