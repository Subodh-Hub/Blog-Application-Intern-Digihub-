import React from "react";
import ProfilePost from "./ProfilePost";

const ProfilePostList = ({ post }) => {
  return (
    <div>
      {post.map((el, key) => (
        <ProfilePost key={key} post={el} />
      ))}
    </div>
  );
};

export default ProfilePostList;
