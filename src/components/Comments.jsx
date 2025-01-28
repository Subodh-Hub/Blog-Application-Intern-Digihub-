import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const Comments = ({ comment }) => {
  console.log("comment", comment);
  return (
    <>
      Comments
      <div className="flex flex-col gap-2 my-3 font-poppins">
        <div className="flex items-center gap-2">
          <Avatar className="cursor-pointer ">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="rounded-full w-7 h-7"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold capitalize text-slate-700">
              {comment.user.firstName} {comment.user.lastName}
            </h2>
          </div>
        </div>
        <div>
          <p className="text-slate-500">{comment.content}</p>
        </div>
      </div>
    </>
  );
};

export default Comments;
