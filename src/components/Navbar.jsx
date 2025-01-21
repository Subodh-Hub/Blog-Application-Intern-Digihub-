import React, { useState, useEffect, useContext } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";
import { NavLink, Link } from "react-router-dom";
import apiClient from "@/api/axiosInterceptors";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInf } = useAuth();
  const URL = "/category";
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(URL);
        setCategory(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <header className="relative flex items-center justify-between w-screen px-8 py-6 text-black bg-white md:px-32 xl:px-80 dark:bg-customDarkTheme ">
        <div
          className="block cursor-pointer menu xl:hidden dark:text-white"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? <IoClose size="2rem" /> : <IoMenu size="2rem" />}
        </div>
        <div className="logo font-playwright dark:text-white">DGBlog</div>
        <ul className="hidden gap-10 font-sans text-lg text-[#3B3C4A] dark:text-white xl:flex">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-blue-500"
                : "cursor-pointer hover:text-blue-500"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-blue-500"
                : "cursor-pointer hover:text-blue-500"
            }
            to="/blog"
          >
            Blog
          </NavLink>

          {category.map((el, i) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "cursor-pointer text-blue-500"
                  : "cursor-pointer hover:text-blue-500"
              }
              to={`/${el.categoryTitle}/${el.categoryId}`}
              key={i}
            >
              {el.categoryTitle}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-blue-500"
                : "cursor-pointer hover:text-blue-500"
            }
          >
            Contact
          </NavLink>
        </ul>
        <div className="flex items-center gap-3 lg:gap-10 xl:gap-10">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userInf && Object.keys(userInf).length > 0 ? (
            <p className="hidden lg:block dark:text-white">
              {userInf.firstName}
            </p>
          ) : (
            ""
          )}

          <ModeToggle className="cursor-pointer" />
          {userInf && Object.keys(userInf).length > 0 ? (
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm border-[1px] border-black border-solid rounded-lg hover:bg-black hover:text-white dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Sign Out
              <LiaSignOutAltSolid />
            </button>
          ) : (
            <button className="px-3 py-2 text-sm border-[1px] border-black border-solid rounded-lg hover:bg-black hover:text-white dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white">
              <Link to="/login">Sign In</Link>
            </button>
          )}
        </div>
      </header>
      {isMenuOpen ? (
        <ul className="flex flex-col items-center w-screen gap-2 bg-zinc-100 drop-shadow-lg xl:hidden dark:text-white dark:bg-blue-950 rounded-xl">
          <li className="w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-b-3xl">
            Home
          </li>
          <li className="w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-3xl">
            Blog
          </li>
          {category.map((el, i) => (
            <li
              key={i}
              className="w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-3xl"
            >
              {el.categoryTitle}
            </li>
          ))}
          <li className="w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-t-3xl">
            Contact
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
