import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import hero from "@/assets/images/hero.jpg";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/axiosInterceptors";

const Post = ({ post }) => {
  const {
    postId,
    title,
    content,
    imageName,
    addDate,
    category,
    user,
    comments,
  } = post;
  const navigate = useNavigate();
  const URL = `/post/image/${imageName}`;
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(URL);
        setImage(res.request.responseURL);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main
      className="w-full cursor-pointer max-w-[392px] bg-white border-[1px] border-solid border-[#E8E8EA] rounded-xl drop-shadow-sm p-3 dark:bg-[#181A2A] dark:border-gray-700 hover:scale-105 transition-hover ease-in-out duration-100 hover:shadow-xl"
      onClick={() =>
        navigate(
          `/${category?.categoryTitle}/${category?.categoryId}/${postId}`
        )
      }
    >
      <div className="w-[95%] h-[240px] object-cover object-center bg-no-repeat rounded-md m-auto overflow-hidden">
        <img src={image} alt="blog image" className="w-fit" />
      </div>
      <div className="w-[360px] h-[200px] m-auto flex flex-col gap-4 mt-5 items-start">
        <div className="bg-[#F6F8FF] rounded-md px-3 py-1 w-fit text-[#4B6BFB] font-thin text-md dark:bg-[#1B1E34] capitalize">
          {category?.categoryTitle || "No Category"}
        </div>
        <h3 className="text-2xl font-semibold leading-7 U line-clamp-3">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h3>
        <div className="flex items-center gap-3 justify-left">
          <div className="object-cover w-10 h-10 overflow-hidden rounded-full">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer capitalize">
            {user.firstName}
          </p>
          <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer">
            {addDate}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Post;
