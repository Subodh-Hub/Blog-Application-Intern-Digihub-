import apiClient from "@/api/axiosInterceptors";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { BiUpvote, BiDownvote, BiComment, BiTrash } from "react-icons/bi";

const ProfilePost = ({ post }) => {
  console.log("post", post);
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const likeCountURL = `like/${post.postId}/likeCount`;
  const disLikeCountURL = `like/${post.postId}/disLikeCount`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await apiClient.get(likeCountURL);
        const res2 = await apiClient.get(disLikeCountURL);
        setLike(res1.data);
        setDisLike(res2.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 my-5 justify-left font-poppins">
        <Avatar className="w-10 h-10 rounded-full cursor-pointer ">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="w-10 h-10 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>
          {post.user.firstName.charAt(0).toUpperCase()}
          {post.user.firstName.slice(1)}{" "}
          {post.user.lastName.charAt(0).toUpperCase()}
          {post.user.lastName.slice(1)}
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <p className="text-2xl font-semibold">{post.title}</p>
        <p className="line-clamp-1">{post.content}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300">
            <BiUpvote className="text-2xl text-[#4B6BFB] cursor-pointer" />
            {like}
          </div>
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300">
            <BiDownvote className="text-2xl text-[#4B6BFB] cursor-pointer" />
            {disLike}
          </div>
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300">
            <BiComment className="text-2xl text-[#4B6BFB] cursor-pointer" />
            {post.comments.length}
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300">
          <BiTrash className="text-2xl text-[#4B6BFB] cursor-pointer hover:text-red-500" />
        </div>
      </div>
      <hr className="mt-1" />
    </div>
  );
};

export default ProfilePost;
