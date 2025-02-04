import { usePostStats } from "@/context/PostStatusContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { BiUpvote, BiDownvote, BiComment, BiTrash } from "react-icons/bi";

const ProfilePost = ({ post }) => {
  console.log('post',post);
  const { likeCount, disLikeCount, commentsCount, fetchStats } = usePostStats();

  useEffect(() => {
    fetchStats(post.postId);
  }, []);

  function daysAgo(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    // Set the time of both dates to midnight to ignore time differences
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const diffTime = currentDate - givenDate;

    // Convert milliseconds to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 1) {
        return "Today";
    } else if (diffDays === 1) {
        return "1 day ago";
    } else {
        return `${Math.floor(diffDays)} days ago`;
    }
}

  return (
    <div>
      <div className="flex items-center justify-between my-5">
        
      <div className="flex items-center gap-3 justify-left">
        <Avatar className="w-10 h-10 rounded-full cursor-pointer ">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="w-10 h-10 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-base capitalize">
          {post.user.firstName} {post.user.lastName}
        </p>
      </div>
      <p className="text-xs text-slate-500">
        {daysAgo(post.addDate)}
      </p>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <p className="text-2xl font-semibold">{post.title}</p>
        <p className="line-clamp-1">{post.content}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500">
            <BiUpvote className="text-2xl text-[#4B6BFB] cursor-pointer dark:text-slate-200 dark:hover:text-white" />
            {likeCount}
          </div>
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500">
            <BiDownvote className="text-2xl text-[#4B6BFB] cursor-pointer dark:text-slate-200 dark:hover:text-white" />
            {disLikeCount}
          </div>
          <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500">
            <BiComment className="text-2xl text-[#4B6BFB] cursor-pointer dark:text-slate-200 dark:hover:text-white" />
            {commentsCount}
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-500">
          <BiTrash className="text-2xl text-[#4B6BFB] cursor-pointer hover:text-red-500 dark:text-slate-200 " />
        </div>
      </div>
      <hr className="mt-1" />
    </div>
  );
};

export default ProfilePost;
