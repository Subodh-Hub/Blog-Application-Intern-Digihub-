import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Comments = ({ comment }) => {
  return (
    <>
      <div className="flex flex-col gap-2 my-7 font-poppins">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="cursor-pointer ">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full w-7 h-7"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold capitalize text-slate-700">
                {comment.user.firstName} {comment.user.lastName}
              </h2>
            </div>
          </div>
          {comment.deletable ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDotsVertical className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-blue-950">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            ""
          )}
        </div>
        <div>
          <p className="text-slate-500">{comment.content}</p>
        </div>
      </div>
    </>
  );
};

export default Comments;
