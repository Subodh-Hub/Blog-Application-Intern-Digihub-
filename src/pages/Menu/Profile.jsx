import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOutlet, NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Overview from "./Overview";
const Profile = () => {
  const outlet = useOutlet();
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
        <ul className="flex flex-wrap items-center gap-4 mt-8 text-lg text-[#3B3C4A] dark:text-white">
          <NavLink to="/profile/overview" className={({isActive})=>isActive ? "cursor-pointer bg-gray-300 text-blue-500 dark:bg-slate-700 px-2 py-1 rounded-full" : "cursor-pointer hover:text-blue-500"}>
            Overview
          </NavLink>
          <NavLink
            to="/profile/submitted"
            className={({isActive})=>isActive ? "cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full" : "cursor-pointer  hover:text-blue-500"}
          >
            Posts
          </NavLink>
          <NavLink
            to="/profile/comments"
            className={({isActive})=>isActive ? "cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full" : "cursor-pointer  hover:text-blue-500"}
          >
            Comments
          </NavLink>
          <NavLink
            to="/profile/upvoted"
            className={({isActive})=>isActive ? "cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full" : "cursor-pointer  hover:text-blue-500"}
          >
            Upvoted
          </NavLink>
          <NavLink
            to="/profile/downvoted"
            className={({isActive})=>isActive ? "cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full" : "cursor-pointer hover:text-blue-500"}
          >
            Downvoted
          </NavLink>
        </ul>
        <div className="px-3 py-1 mt-4 border-zinc-500 border-[1px] w-fit rounded-full flex gap-2 items-center justify-center cursor-pointer dark:hover:border-white">
          <FaPlus />
          Create Post
        </div>
        <hr className="my-3" />
        {outlet}
      </div>
    </div>
  );
};

export default Profile;
