import Post from './Post'
import { useState } from 'react'

import PropTypes from 'prop-types'

const PostList = ({ post}) => {
    const [visiblePost, setVisiblePost] = useState(6)
    

    return (
        <div className="flex flex-col items-center justify-center dark:bg-customDarkTheme">
            <div className="grid grid-cols-1 gap-10 py-5 w-[90vw] justify-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:mt-20">
                {post.slice(0, visiblePost).map((el, index) => (
                    <Post key={index} post={el} />
                ))}
            </div>

            {visiblePost < post.length ? (
                <button
                    className="px-5 py-3 w-fit mx-auto outline outline-1 my-5 font-sans text-sm text-[#696A75] outline-[#696A75] hover:outline-black dark:hover:outline-white rounded-sm dark:bg-[#181A2A]"
                    onClick={() =>
                        setVisiblePost((prev) =>
                            Math.min(prev + 3, post.length)
                        )
                    }
                >
                    Show More
                </button>
            ) : (
                post.length>6 && <button
                    className="px-5 py-3 w-fit mx-auto outline outline-1 my-5 font-sans text-sm text-[#696A75] outline-[#696A75] hover:outline-black dark:hover:outline-white rounded-sm dark:bg-[#181A2A]"
                    onClick={() => setVisiblePost(6)}
                >
                    View Less
                </button>
            )}
        </div>
    )
}

PostList.propTypes = {
    post: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostList
