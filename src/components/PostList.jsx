import Post from "./Post";

const PostList = () => {
  return (
    <div className="flex flex-col items-center justify-center dark:bg-customDarkTheme">
      <div className="grid grid-cols-1 gap-4 py-5 w-[90vw] mt-5 justify-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:mt-20">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <button className="px-5 py-3 outline outline-1 my-5 font-sans text-sm text-[#696A75] outline-[#696A75] rounded-sm dark:bg-[#181A2A]">
        View All Post
      </button>
    </div>
  );
};

export default PostList;
