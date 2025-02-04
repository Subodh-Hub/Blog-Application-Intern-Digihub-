import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

function ProfileLikeDislike({post}) {

    function daysAgo(dateString) {
        const givenDate = new Date(dateString);
        const currentDate = new Date();

        // Set the time of both dates to midnight to ignore time differences
        givenDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds
        const diffTime = currentDate - givenDate;

        // Convert milliseconds to days
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 1) {
            return "Today";
        } else if (diffDays === 1) {
            return "1 day ago";
        } else {
            return `${Math.floor(diffDays)} days ago`;
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between my-5 font-poppins">
                <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer ">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        className="rounded-full w-9 h-9"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="capitalize">
                    {post.user.firstName} {post.user.lastName}
                </p>
                </div>
                <p className="text-xs text-slate-500">{daysAgo(post.addDate)}</p>
            </div>
            <p className="text-2xl font-semibold">{post.title}</p>
            <hr className="my-5"/>
        </div>
    );
}

export default ProfileLikeDislike;