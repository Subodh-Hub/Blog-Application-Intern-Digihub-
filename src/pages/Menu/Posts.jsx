import React, { useEffect, useState } from "react";
import apiClient from "@/api/axiosInterceptors";
import ProfilePostList from "@/components/ProfilePostList";

const Posts = () => {
  const URL = "/authUser/posts";
  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(URL);
        setResponseData(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <ProfilePostList post={responseData}/>
    </div>
  );
};

export default Posts;
