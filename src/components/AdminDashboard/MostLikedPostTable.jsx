import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import apiClient from '@/api/axiosInterceptors.jsx'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function MostLikedPostTable() {
    const topPostUrl = '/admin/topPost'
    const [topPosts, setTopPosts] = useState([])

    useEffect(() => {
        apiClient.get(topPostUrl).then((response) => {
            setTopPosts(response.data)
        })
    }, [])

    const categoryColors = {
        music: 'bg-blue-100 text-blue-700',
        sports: 'bg-yellow-100 text-yellow-700',
        technology: 'bg-green-100 text-green-700',
    }
    const maxLikes = Math.max(...topPosts.map((post) => post.likeCount), 1)
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center mb-7">
                Popular Post
            </h1>
            <Table>
                <TableCaption className="mt-7">Most Upvoted Post</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="w-[150px]">Post Id</TableHead>
                        <TableHead className="w-1/4">Full Name</TableHead>
                        <TableHead className="w-1/5">Post Title</TableHead>
                        <TableHead className="w-48">Category</TableHead>
                        <TableHead className="w-48">Uploaded Date</TableHead>
                        <TableHead className="w-[100px]">Upvote</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topPosts.map((el, key) => (
                        <TableRow key={key} className={`${key % 2 !== 0 ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
                            <TableCell className="font-medium">
                                {el.post.postId}
                            </TableCell>
                            <TableCell className="">
                            <div className='flex items-center gap-2'>
                                
                                <Avatar className="rounded-full h-9 w-9">
                                    <AvatarImage
                                        src={
                                            el.post.user.imageName
                                                ? `http://localhost:8080/user/image/${el.post.user.imageName}`
                                                : 'https://github.com/shadcn.png'
                                        }
                                        className="object-cover w-full h-full rounded-full"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback className="capitalize">
                                        {el.post.user.firstName.slice(0, 1) +
                                            el.post.user.lastName.slice(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className='text-center capitalize w-fit'>
                                    {el.post.user.firstName +
                                        ' ' +
                                        el.post.user.middleName +
                                        ' ' +
                                        el.post.user.lastName}
                                </h3>
                            </div>
                            </TableCell>
                            <TableCell >
                                <div className="line-clamp-2">{el.post.title}</div></TableCell>
                            <TableCell className="capitalize ">
                                <span
                                    className={`${categoryColors[el.post.category.categoryTitle.toLowerCase()] || ''} font-semibold px-3 py-1 rounded-full`}
                                >
                                    {el.post.category.categoryTitle}
                                </span>
                            </TableCell>
                            <TableCell>{el.post.addDate}</TableCell>

                            <TableCell className="">
                                {el.likeCount}
                                <Progress
                                    value={(el.likeCount / maxLikes) * 100}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default MostLikedPostTable
