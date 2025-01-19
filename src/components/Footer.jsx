import React from "react";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialYoutube,
  SlSocialLinkedin,
} from "react-icons/sl";

const Footer = () => {
  return (
    <div className="py-20 bg-white dark:bg-customDarkTheme">
      <footer className=" w-[90vw] m-auto flex flex-col gap-5 px-4 lg:px-20">
        <div className="flex flex-col flex-wrap items-center justify-center gap-5 md:flex-row lg:justify-between lg:px-20">
          <div className="text-3xl logo font-playwright dark:text-white">
            DGBlog
          </div>
          <div className="font-sans logo dark:text-white md:w-[30vw] text-lg">
            This is the Blogging site which was develop during the intern. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Officiis enim
            quos repudiandae quibusdam magnam rerum non quisquam veniam dolore
            eligendi, dignissimos quod perferendis illo ipsum facere cum. Totam,
            perferendis iusto?
          </div>
          <div className="font-sans text-center logo dark:text-white">
            <h2 className="text-xl font-semibold">Office</h2>
            <div className="mt-4 text-lg">
              <p>Naxal, Bhatbhateni</p>
              <p>P89J+GPM, Kathmandu 44600</p>
            </div>
          </div>
          <div className="font-sans text-center logo dark:text-white">
            <h2 className="text-xl font-semibold">Contact</h2>
            <div className="mt-4 text-lg">
              <p>contact@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 mt-20 lg:justify-between lg:px-20">
          <p className="text-lg">&copy; 2025 All Right Reserved</p>

          <div className="flex gap-10">
            <SlSocialFacebook size="1.6rem" />
            <SlSocialInstagram size="1.6rem" />
            <SlSocialYoutube size="1.6rem" />
            <SlSocialLinkedin size="1.6rem" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
