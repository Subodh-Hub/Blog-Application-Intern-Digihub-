import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Setting = () => {
  return (
    <div className="bg-white mt-7 dark:bg-customDarkTheme">
      <div className="w-[90vw] m-auto md:px-20 xl:px-60">
        <div className="border-2 border-solid rounded-md">
          <h3 className="py-3 text-4xl font-semibold text-center font-poppins">
            Setting
          </h3>
          <div className="relative z-10 w-full border-2 border-solid rounded-lg h-60">
            <div className="absolute bottom-0 z-20 w-40 h-40 transform -translate-x-1/2 translate-y-1/2 border-2 border-solid rounded-full left-1/2">
              <Avatar className="w-full h-full rounded-full cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" className="rounded-full"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <ul className="px-5 mt-20 xl:hidden">
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Update Profile</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            <li>
              {" "}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Change Password</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          </ul>
          <ul className="hidden w-1/4 mt-20 shadow-lg xl:block">
            <li>Update Profile</li>
            <li>Change Password</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;
