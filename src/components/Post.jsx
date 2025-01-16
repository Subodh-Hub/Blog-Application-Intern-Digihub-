import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import hero from "@/assets/images/hero.jpg";
const Post = () => {
  return (
    <main className="w-[392px] h-[488px] bg-white border-[1px] border-solid border-[#E8E8EA] rounded-xl drop-shadow-sm p-3">
      <div className="w-[360px] h-[240px] object-contain object-center bg-no-repeat rounded-md m-auto">
        <img src={hero} alt="blog image" />
      </div>
      <div className="w-[360px] h-[200px] m-auto flex flex-col gap-4 mt-5 items-left">
        <div className="bg-[#F6F8FF] rounded-md px-3 py-1 w-fit text-[#4B6BFB] font-thin text-sm">
          Music
        </div>
        <h1 className="font-semibold text-xl">Title of the Content</h1>
        <div className="flex  items-center justify-left gap-3">
          <div className="object-cover w-10 h-10 overflow-hidden rounded-full ">
            <Avatar className="cursor-pointer ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer">Username</p>
          <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer">August 20, 22</p>
        </div>
      </div>
    </main>
  );
};

export default Post;
