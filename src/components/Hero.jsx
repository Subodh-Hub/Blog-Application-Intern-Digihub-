import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const Hero = () => {
    return (
        <>
            <div className="flex justify-center w-screen dark:bg-customDarkTheme">
                <div className=" z-10 relative w-full max-w-[90vw] text-black bg-white h-[85vh] dark:bg-customDarkTheme bg-[url('/src/assets/images/hero.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl">
                    <div className="absolute bottom-0 z-40 p-8 w-fit xl:bottom-0 xl:translate-y-8 xl:left-20 xl:bg-white xl:shadow-xl xl:rounded-lg xl:dark:bg-customDarkTheme dark:text-white">
                        <p className="bg-[#4B6BFB] text-white px-3 py-1 font-sans rounded-md w-fit text-sm font-semibold">
                            Music
                        </p>
                        <h1 className="max-w-md mt-4 text-4xl font-bold leading-10 tracking-wide text-left text-white text-sans xl:text-black xl:dark:text-white">
                            (21 November 1852 - 15 December 1909) Classical
                            Guitar Revolutions: Francisco Tárrega
                        </h1>

                        <div className="flex items-center justify-start gap-4 mt-5 profile">
                            <div className="object-cover w-10 h-10 overflow-hidden rounded-full">
                                <Avatar className="cursor-pointer ">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <p className="text-white xl:text-[#97989F] text-base hover:cursor-pointer">
                                Subodh Rijal
                            </p>
                            <p className="text-white xl:text-[#97989F] text-base">
                                January 12, 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
