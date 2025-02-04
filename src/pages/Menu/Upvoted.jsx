import { useEffect, useState } from "react";
import apiClient from "@/api/axiosInterceptors.jsx";
import ProfileLikeDislike from "@/components/Profile/ProfileLikeDislike.jsx";
import Skeleton from "react-loading-skeleton";

const Upvoted = () => {
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
          el.isLike === true && <ProfileLikeDislike key={ind} post={el.post} />
      )}
    </>
  );
};

export default Upvoted;
