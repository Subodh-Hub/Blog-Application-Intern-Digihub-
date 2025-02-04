import React from "react";
import PropTypes from "prop-types";
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

ProfilePostList.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilePostList;
