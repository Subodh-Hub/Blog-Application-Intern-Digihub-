import React, { useState } from "react";
import profile from "@/assets/images/profile.jpeg";
import {
  IoHomeOutline,
  IoDiamond,
  IoPeople,
  IoMenu,
  IoClose,
} from "react-icons/io5";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="relative flex items-center justify-between w-screen px-8 py-6 text-black bg-white md:px-32 drop-shadow-md">
      <div
        className="block cursor-pointer menu xl:hidden"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? <IoClose size="2rem" /> : <IoMenu size="2rem" />}
      </div>

      <div
        className={`absolute shadow-lg border border-black-100 shadow-lg xl:hidden top-[142px] left-0 w-[50%] bg-white flex flex-col items-center gap-6 text-lg transform transition-transform ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "transform 0.3s ease,opacity 0.3s ease" }}
      >
        <li className="list-none cursor-pointer flex items-center gap-2">
          Home
          <IoHomeOutline />
        </li>
        <li className="list-none cursor-pointer flex items-center gap-2">
          Popular
          <IoDiamond />
        </li>
        <li className="list-none cursor-pointer flex items-center gap-2">
          About
          <IoPeople />
        </li>
      </div>

      <div className="text-xl transition ease-in delay-150 cursor-pointer logo font-playwright hover:scale-105">
        DGBlog
      </div>
      <ul className="items-center hidden gap-12 text-base uppercase xl:flex ">
        <li className="flex items-center transition-all ease-in-out cursor-pointer delay-125 hover:scale-110 hover:text-sky-500">
          Home
          <IoHomeOutline />
        </li>
        <li className="flex items-center transition-all ease-in-out cursor-pointer delay-125 hover:scale-110 hover:text-sky-500">
          Popular
          <IoDiamond />
        </li>
        <li className="flex items-center transition-all ease-in-out cursor-pointer delay-125 hover:scale-110 hover:text-sky-500">
          About
          <IoPeople />
        </li>
      </ul>
      <div className="h-[95px] w-[95px] object-fill overflow-hidden rounded-full cursor-pointer">
        <img src={profile} alt="" className="relative top-[-17px]" />
      </div>
    </header>
  );
};

export default Navbar;
