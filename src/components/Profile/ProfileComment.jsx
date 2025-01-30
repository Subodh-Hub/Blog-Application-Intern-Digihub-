import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const ProfileComment = ({ comment }) => {
  console.log("comment", comment);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Avatar className="cursor-pointer ">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="rounded-full w-7 h-7"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-sm font-medium text-black capitalize hover:cursor-pointer">
          {comment.post.user.firstName} {comment.post.user.lastName}
        </h3>
        <p className="text-xs font-thin text-gray-900">{comment.post.title}</p>
      </div>
      <div className="ml-9">
        <h3 className="text-base font-medium text-black capitalize hover:cursor-pointer">
          {comment.user.firstName} {comment.user.lastName}
        </h3>
        <p className="text-sm font-thin text-gray-800 font-popins">
          {comment.content}
        </p>
      </div>
      <hr />
    </div>
  );
};

export default ProfileComment;
