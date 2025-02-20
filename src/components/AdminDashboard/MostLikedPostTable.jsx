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
        <div className="my-5">
            <Table>
                <TableCaption className="text-xl mt-7">
                    Most Upvoted Post
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Post Id</TableHead>
                        <TableHead className="w-64">Full Name</TableHead>
                        <TableHead className="w-96">Post Title</TableHead>
                        <TableHead className="w-48">Category</TableHead>
                        <TableHead className="w-48">Uploaded Date</TableHead>
                        <TableHead className="w-[100px]">Upvote</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topPosts.map((el, key) => (
                        <TableRow key={key}>
                            <TableCell className="font-medium">
                                {el.post.postId}
                            </TableCell>
                            <TableCell className="capitalize">
                                {el.post.user.firstName +
                                    ' ' +
                                    el.post.user.middleName +
                                    ' ' +
                                    el.post.user.lastName}
                            </TableCell>
                            <TableCell>{el.post.title}</TableCell>
                            <TableCell className="capitalize ">
                                <span
                                    className={`${categoryColors[el.post.category.categoryTitle.toLowerCase()] || ''} font-semibold px-3 py-1 rounded-full`}
                                >
                                    {el.post.category.categoryTitle}
                                </span>
                            </TableCell>
                            <TableCell>{el.post.addDate}</TableCell>

                            <TableCell className="flex items-left flex-col gap-2">
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
