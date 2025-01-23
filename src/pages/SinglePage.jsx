import apiClient from "@/api/axiosInterceptors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hero from "@/assets/images/hero.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";

const SinglePage = () => {
  const { postId } = useParams();
  const URL = `/post/${postId}`;

  const likeCountURL = `like/${postId}/likeCount`;
  const disLikeCountURL = `like/${postId}/disLikeCount`;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(URL);
        const res1 = await apiClient.get(likeCountURL);
        const res2 = await apiClient.get(disLikeCountURL);
        setData(res.data);
        setLikeCount(res1.data);
        setDisLikeCount(res2.data);
        console.log("likeDislikeCount", res1.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return number;
  };

  const { category, title, user, content, addDate } = data;
  console.log(user);
  return (
    <div className="items-center dark:bg-customDarkTheme">
      <main className="w-[90vw] m-auto flex flex-col gap-10 md:px-30 xl:w-[80vw] pt-10">
        <div className="flex flex-col items-start gap-3">
          <p className="bg-[#4B6BFB] text-white px-3 py-1 font-sans rounded-md w-fit text-sm font-semibold">
            {category.categoryTitle}
          </p>
          <h2 className="text-4xl font-semibold">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h2>
          <div className="flex items-center gap-3">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[#97989F] text-base hover:cursor-pointer">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[#97989F] text-base hover:cursor-pointer ml-5">
              {addDate}
            </p>
          </div>
        </div>
        <div className="w-[100%] m-auto rounded-2xl overflow-hidden ">
          <img src={hero} alt="" className="object-cover w-full h-full" />
        </div>
        <p className="text-lg serif text-[#3B3C4A] dark:text-[#BABABF]">
          {content}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300">
            <BiUpvote className="text-2xl text-[#4B6BFB] cursor-pointer" />
            {formatNumber(likeCount)}
          </div>
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300">
            <BiDownvote className="text-2xl text-[#4B6BFB] cursor-pointer" />
            {formatNumber(disLikeCount)}
          </div>
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300">
            <BiComment className="text-2xl text-[#4B6BFB] cursor-pointer" />
          </div>
        </div>
      </main>
      <hr className="mt-10 w-[95vw] m-auto" />
    </div>
  );
};

export default SinglePage;
