import apiClient from "@/api/axiosInterceptors";
import Comments from "@/components/Comments";
import React, { useEffect, useState } from "react";

const CommentsList = ({ postId }) => {
  const [data, setData] = useState({});
  const URL = `comment/comments-post/${postId}`;
  const fetchData = async () => {
    try {
      const res = await apiClient.get(URL);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);
  return (
    <div>
      {data.length > 0 ? (
        data.map((comment, index) => <Comments key={index} comment={comment} />)
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default CommentsList;
