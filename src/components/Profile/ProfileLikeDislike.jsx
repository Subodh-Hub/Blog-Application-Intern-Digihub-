import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'

function ProfileLikeDislike({ post }) {
    console.log('post', post)
    const navigate = useNavigate()

    function daysAgo(dateString) {
        const givenDate = new Date(dateString)
        const currentDate = new Date()

        // Set the time of both dates to midnight to ignore time differences
        givenDate.setHours(0, 0, 0, 0)
        currentDate.setHours(0, 0, 0, 0)

        // Calculate the difference in milliseconds
        const diffTime = currentDate - givenDate

        // Convert milliseconds to days
        const diffDays = diffTime / (1000 * 60 * 60 * 24)

        if (diffDays < 1) {
            return 'Today'
        } else if (diffDays === 1) {
            return '1 day ago'
        } else {
            return `${Math.floor(diffDays)} days ago`
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between my-5 font-poppins">
                <div className="flex items-center gap-2">
                    <Avatar>
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
                <p className="text-xs text-slate-500">
                    {daysAgo(post.addDate)}
                </p>
            </div>
            <p
                className="text-2xl font-semibold cursor-pointer"
                onClick={() => {
                    navigate(
                        `/${post.category.categoryTitle}/${post.category.categoryId}/${post.postId}`
                    )
                }}
            >
                {post.title}
            </p>
            <hr className="my-5" />
        </div>
    )
}

export default ProfileLikeDislike
