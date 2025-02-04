import apiClient from "@/api/axiosInterceptors";
import ProfileLikeDislike from "@/components/Profile/ProfileLikeDislike";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Downvoted = () => {
  const url = "/like/likesByAuthenticatedUser";
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(url);
      setFetchedData(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!fetchedData) {
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
    <>
      {fetchedData.map(
        (el, ind) =>
          el.dislike === true && <ProfileLikeDislike key={ind} post={el.post} />
      )}
    </>
  );
};

export default Downvoted;
