import React, { useState, useEffect, useContext } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";
import { NavLink, Link } from "react-router-dom";
import apiClient from "@/api/axiosInterceptors";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ProfileMenu from "./ProfileMenu";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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
  console.log(isProfileMenuOpen);
  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between w-screen px-8 py-6 text-black bg-white md:px-32 xl:px-80 dark:bg-customDarkTheme ">
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
          <div className="w-fit">
            {isProfileMenuOpen ? (
              <ProfileMenu fName={userInf.firstName} lName={userInf.lastName} />
            ) : (
              ""
            )}
            <Avatar
              className="cursor-pointer"
              onClick={() => {
                userInf && Object.keys(userInf).length > 0
                  ? setIsProfileMenuOpen(!isProfileMenuOpen)
                  : toast.error("Please Login First");
              }}
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <ModeToggle className="cursor-pointer" />
          {userInf && Object.keys(userInf).length > 0 ? (
            ""
          ) : (
            <button className="px-3 py-2 text-sm border-[1px] border-black border-solid rounded-lg hover:bg-black hover:text-white dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white">
              <Link to="/login">Sign In</Link>
            </button>
          )}
        </div>
      </header>
      {isMenuOpen ? (
        <ul className="fixed z-40 flex flex-col items-center w-screen gap-2 bg-zinc-100 drop-shadow-lg xl:hidden dark:text-white dark:bg-blue-950 rounded-xl">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-full py-5 text-center rounded-b-3xl bg-zinc-200 text-blue-500"
                : "w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-b-3xl"
            }
            to="/"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-full py-5 text-center rounded-3xl bg-zinc-200 text-blue-500"
                : "w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-3xl"
            }
            to="/blog"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Blog
          </NavLink>
          {category.map((el, i) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "w-full py-5 text-center rounded-3xl bg-zinc-200 text-blue-500"
                  : "w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-3xl"
              }
              onClick={() => {
                setIsMenuOpen(false);
              }}
              to={`/${el.categoryTitle}/${el.categoryId}`}
              key={i}
            >
              {el.categoryTitle}
            </NavLink>
          ))}
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-full py-5 text-center rounded-t-3xl bg-zinc-200 text-blue-500"
                : "w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-t-3xl"
            }
            onClick={() => {
              setIsMenuOpen(false);
            }}
            to="/contact"
          >
            Contact
          </NavLink>
        </ul>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
};

export default Navbar;
