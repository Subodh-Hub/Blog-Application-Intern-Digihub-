import Post from "./Post";

const PostList = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="lg:grid grid-cols-3 gap-4 w-[90vw] m-auto align-center items- justify-center">
        <Post className="flex items-center justify-center" />
        <Post className="flex items-center justify-center" />
        <Post className="flex items-center justify-center" />
        <Post className="flex items-center justify-center" />
        <Post className="flex items-center justify-center" />
      </div>
    </div>
  );
};

export default PostList;
