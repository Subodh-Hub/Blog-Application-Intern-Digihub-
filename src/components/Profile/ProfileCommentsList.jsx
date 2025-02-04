import { useEffect, useState } from "react";
import ProfileComment from "./ProfileComment";
import apiClient from "@/api/axiosInterceptors";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileCommentsList = () => {
  const URL = `/comment/comments-user`;
  const [responseData, setResponseData] = useState(null);
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

  if (responseData === null) {
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
  }
  return (
    <div>
      {responseData.map((comment, ind) => (
        <ProfileComment key={ind} comment={comment} />
      ))}
    </div>
  );
};

export default ProfileCommentsList;
