import Post from "./Post";
import { useState } from "react";
import PropTypes from "prop-types";

const PostList = ({ post }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center dark:bg-customDarkTheme">
      <div className="grid grid-cols-1 gap-4 py-5 w-[90vw] justify-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:mt-20">
        {post.map((el, index) => {
          return showAll ? (
            <Post key={index} post={el} />
          ) : (
            index < 9 && <Post key={index} post={el} />
          );
        })}
      </div>

      {showAll ? (
        <button
          className="px-5 py-3 w-fit mx-auto outline outline-1 my-5 font-sans text-sm text-[#696A75] outline-[#696A75] hover:outline-black dark:hover:outline-white rounded-sm dark:bg-[#181A2A]"
          onClick={() => {
            setShowAll(false);
          }}
        >
          View Less
        </button>
      ) : post.length>9&&(
      <button
          className="px-5 py-3 w-fit mx-auto outline outline-1 my-5 font-sans text-sm text-[#696A75] outline-[#696A75] hover:outline-black dark:hover:outline-white rounded-sm dark:bg-[#181A2A]"
          onClick={() => {
            setShowAll(true);
          }}
        >
          View All Post
        </button>
      )}
    </div>
  );
};

PostList.propTypes = {
  post: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
