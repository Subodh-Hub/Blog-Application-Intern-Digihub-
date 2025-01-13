import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router-dom";
import axios from "@/api/axios";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const URL = "/category";
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(URL);
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
        <ul className="hidden gap-10 font-sans text-base text-[#3B3C4A] dark:text-white xl:flex">
          <li className="cursor-pointer hover:text-blue-500">Home</li>
          <li className="cursor-pointer hover:text-blue-500">Blog</li>
          {category.map((el) => (
            <li className="cursor-pointer hover:text-blue-500" key={el.id}>
              {el.categoryTitle}{" "}
              {/* Assuming each category has 'id' and 'categoryTitle' */}
            </li>
          ))}
          <li className="cursor-pointer hover:text-blue-500">Contact</li>
        </ul>
        <div className="flex gap-3 lg:gap-10 xl:gap-10">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ModeToggle className="cursor-pointer" />
          <button className="px-3 text-sm border-[1px] border-black border-solid rounded-lg hover:bg-black hover:text-white dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white">
            <Link to="/">Sign In</Link>
          </button>
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
          {category.map((el) => (
            <li className="w-full py-5 text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-blue-900 hover:rounded-3xl">
              {el.categoryTitle}{" "}
              {/* Assuming each category has 'id' and 'categoryTitle' */}
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
