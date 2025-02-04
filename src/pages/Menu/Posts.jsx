import React, { useEffect, useState } from "react";
import apiClient from "@/api/axiosInterceptors";
import Skeleton from "react-loading-skeleton";
import ProfilePostList from "@/components/Profile/ProfilePostList";

const Posts = () => {
  const URL = "/authUser/posts";
  const [responseData, setResponseData] = useState(null);
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

  if (!responseData)
    return (
      <div>
        <Skeleton
          circle={true}
          width={50}
          height={50}
          highlightColor="#2B7FFF"
        />
        <Skeleton
          inline={true}
          highlightColor="#2B7FFF"
          height={30}
          className="mt-2"
        />
        <div className="mt-5">
          <Skeleton
            inline={true}
            highlightColor="#2B7FFF"
            height={10}
            count={5}
          />
        </div>
      </div>
    );

  return (
    <div>
      <ProfilePostList post={responseData} />
    </div>
  );
};

export default Posts;
