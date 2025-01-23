import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { FaPlus } from "react-icons/fa";
const Profile = () => {
  return (
    <div className="bg-white mt-7 dark:bg-customDarkTheme">
      <div className="w-[90vw] m-auto md:px-20 xl:px-60">
        <div className="flex items-center justify-start gap-2">
          <Avatar className="w-16 h-16 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-3xl font-semibold text-zinc-600 font-poppins dark:text-gray-300">
              Subodh Rijal
            </h3>
            <p></p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-4 mt-8 text-lg text-[#3B3C4A] dark:text-white">
          <li className="cursor-pointer hover:text-blue-500">Overview</li>
          <li className="cursor-pointer hover:text-blue-500">Posts</li>
          <li className="cursor-pointer hover:text-blue-500">Comments</li>
          <li className="cursor-pointer hover:text-blue-500">Upvoted</li>
          <li className="cursor-pointer hover:text-blue-500">Downvoted</li>
        </ul>
        <div className="px-3 py-1 mt-4 border-zinc-500 border-[1px] w-fit rounded-full flex gap-2 items-center justify-center cursor-pointer dark:hover:border-white">
          <FaPlus />
          Create Post
        </div>
      <hr className="my-3"/>
      </div>
    </div>
  );
};

export default Profile;
