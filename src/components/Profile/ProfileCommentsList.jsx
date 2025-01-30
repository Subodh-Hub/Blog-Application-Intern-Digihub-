import React, { useEffect, useState } from "react";
import ProfileComment from "./ProfileComment";
import apiClient from "@/api/axiosInterceptors";

const ProfileCommentsList = () => {
  const URL = `/comment/comments-user`;
  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(URL);
        setResponseData(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {responseData.map((comment, ind) => (
        <ProfileComment key={ind} comment={comment} />
      ))}
    </div>
  );
};

export default ProfileCommentsList;
