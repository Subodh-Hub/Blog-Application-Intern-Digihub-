import React from "react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoPerson, IoSettings } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ fName, lName, showProfileMenu }) => {
  const navigate = useNavigate();
  const fullName = fName.charAt(0).toUpperCase() + fName.slice(1) + " " + lName;
  return (
    <div className="fixed z-40 flex flex-col items-center w-40 top-20 bg-zinc-100 drop-shadow-lg text-[#3B3C4A] dark:text-white dark:bg-blue-950 rounded-xl">
      <div className="w-full py-5 text-center">{fullName}</div>
      <hr className="w-full h-1 bg-slate-300" />
      <div
        className="flex items-center justify-center w-full gap-2 py-5 text-center cursor-pointer hover:rounded-b-3xl hover:bg-zinc-200 hover:text-blue-500"
        onClick={() => {
          navigate("/profile/overview");
          showProfileMenu(false);
        }}
      >
        Profile
        <IoPerson />
      </div>
      <div
        className="flex items-center justify-center w-full gap-2 py-5 text-center cursor-pointer hover:rounded-3xl hover:bg-zinc-200 hover:text-blue-500"
        onClick={() => {
          navigate("/setting");
          showProfileMenu(false);
        }}
      >
        Setting
        <IoSettings />
      </div>
      <div
        className="flex items-center justify-center w-full gap-2 py-5 text-center cursor-pointer rounded-t-3xl hover:bg-zinc-200 hover:text-blue-500"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
          showProfileMenu(false);
        }}
      >
        Logout <LiaSignOutAltSolid />
      </div>
    </div>
  );
};

export default ProfileMenu;
