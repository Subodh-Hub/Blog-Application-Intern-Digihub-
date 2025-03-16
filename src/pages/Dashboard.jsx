import Hero from '@/components/Hero'
import PostList from '@/components/PostList'
import { useEffect, useState } from 'react'
import apiClient from '@/api/axiosInterceptors'
import { FaPlus, FaSearch, FaFan } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/components/hooks/useAuth'

const Dashboard = () => {
    const navigate = useNavigate()
    const { userInf } = useAuth()
    const [data, setData] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [query, setQuery] = useState('')

    const fetchPosts = async () => {
        try {
            const res = query
                ? await apiClient.get(`/posts/search/${query}`)
                : await apiClient.get('/posts')
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [query])

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const inputSearchHandler = () => {
        setQuery(searchInput)
    }
    return (
        <>
            {userInf ? (
                <div className="flex justify-between w-screen px-8 my-3 md:px-32 xl:px-80">
                    <div
                        className="px-1 py-1 md:px-3 border-zinc-500 border-[1px] w-fit rounded-full flex gap-2 items-center justify-center cursor-pointer dark:hover:border-white"
                        onClick={() => {
                            navigate('/createPost')
                        }}
                    >
                        <FaPlus />
                        Create Post
                    </div>
                    <div className="flex items-center w-24 gap-2 p-2 border border-gray-300 rounded-md md:w-32 lg:w-64">
                        <input
                            type="text"
                            placeholder="Search Post..."
                            className="w-full text-sm bg-transparent outline-none"
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                        {searchInput && (
                            <FaFan
                                className="text-gray-500 transition-transform duration-200 ease-in-out rotate-45 cursor-pointer hover:scale-125"
                                onClick={() => {
                                    setQuery('')
                                    setSearchInput('')
                                }}
                            />
                        )}
                        <FaSearch
                            className="text-gray-500 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-125"
                            onClick={inputSearchHandler}
                        />
                    </div>
                </div>
            ) : null}
            {!query && <Hero />}

            <PostList post={data} />
        </>
    )
}

export default Dashboard
