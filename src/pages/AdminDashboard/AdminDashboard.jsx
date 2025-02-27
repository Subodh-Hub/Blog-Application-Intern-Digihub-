import apiClient from '@/api/axiosInterceptors'
import AdminSidebar from '@/components/AdminSidebar'
import MostUsedCategoryPost from '@/components/AdminDashboard/MostUsedCategoryPost'
import PostIncreasedByMonth from '@/components/AdminDashboard/PostIncreasedByMonth'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/context/ThemeProvider'
import { useEffect, useState } from 'react'
import { useOutlet } from 'react-router-dom'
import TopPostUploadedUserTable from '@/components/AdminDashboard/TopPostUploadedUserTable'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { User, StickyNote, MessageCircle } from 'lucide-react'
import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi'
import MostLikedPostTable from '@/components/AdminDashboard/MostLikedPostTable.jsx'
import { Separator } from '@/components/ui/separator'
import LikeDislikeBarChart from '@/components/AdminDashboard/LikeDislikeBarChart'

const AdminDashboard = () => {
    const [totalDetails, setTotalDetails] = useState({})
    const totalDetailsUrl = '/admin/getAllCountData'
    useEffect(() => {
        apiClient(totalDetailsUrl)
            .then((value) => {
                setTotalDetails(value.data)
            })
            .catch((err) => {
                console.log('error', err)
            })
    }, [])

    return (
        <main className="w-[100%] h-full px-5 m-auto">
            <div className="w-[100%] px-2 py-10  bg-custom-gradient rounded-b-3xl">
                <h1 className="mb-6 text-4xl font-semibold text-center font-poppins xl:text-7xl">
                    Dashboard
                </h1>
                <Breadcrumb className="lg:ml-20 my-7">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="adminDashboard">
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col items-center w-full gap-5 lg:justify-around xl:px-10 lg:flex-row">
                    <Card className="flex flex-col justify-start w-3/4 gap-5 px-4 py-4 bg-white lg:w-1/6 items-left bg-opacity-60 rounded-2xl">
                        <CardTitle className="text-xl font-thin text-gray-800">
                            Total Users
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 text-6xl font-semibold text-left text-gray-800">
                            {totalDetails.totalUser} <User size={50} />
                        </CardDescription>
                    </Card>

                    <Card className="flex flex-col justify-start w-3/4 gap-5 px-4 py-4 bg-white lg:w-1/6 items-left bg-opacity-60 rounded-2xl">
                        <CardTitle className="text-xl font-thin text-gray-800">
                            Total Post
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 text-6xl font-semibold text-left text-gray-800">
                            {totalDetails.totalPost} <StickyNote size={50} />
                        </CardDescription>
                    </Card>

                    <Card className="flex flex-col justify-start w-3/4 gap-5 px-4 py-4 bg-white lg:w-1/6 items-left bg-opacity-60 rounded-2xl">
                        <CardTitle className="text-xl font-thin text-gray-800">
                            Total Upvotes
                        </CardTitle>
                        <CardDescription className="flex gap-1 text-6xl font-semibold text-left text-gray-800 ">
                            {totalDetails.totalLike} <BiSolidUpvote size="50" />
                        </CardDescription>
                    </Card>

                    <Card className="flex flex-col justify-start w-3/4 gap-5 px-4 py-4 bg-white lg:w-1/6 items-left bg-opacity-60 rounded-2xl">
                        <CardTitle className="text-xl font-thin text-gray-800">
                            Total Downvotes
                        </CardTitle>
                        <CardDescription className="flex gap-1 text-6xl font-semibold text-left text-gray-800 ">
                            {totalDetails.totalDisLike}
                            <BiSolidDownvote size="50" />
                        </CardDescription>
                    </Card>

                    <Card className="flex flex-col justify-start w-3/4 gap-5 px-4 py-4 bg-white lg:w-1/6 items-left bg-opacity-60 rounded-2xl">
                        <CardTitle className="text-xl font-thin text-gray-800">
                            Total Comments
                        </CardTitle>
                        <CardDescription className="flex gap-1 text-6xl font-semibold text-left text-gray-800 ">
                            {totalDetails.totalComment}
                            <MessageCircle size={50} />
                        </CardDescription>
                    </Card>
                </div>
            </div>

            <div className="flex flex-col justify-between gap-3 my-7 lg:pr-20 lg:flex-row">
                <PostIncreasedByMonth />
                <MostUsedCategoryPost />
            </div>
            <hr className="h-3 my-20 bg-gray-500 rounded-full" />
            <div className="flex flex-col  gap-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-2 lg:items-start lg:pr-2">
                <TopPostUploadedUserTable />
                <Separator
                orientation="vertical"
                className="w-[2px] bg-gray-400 h-full"
                />
                <MostLikedPostTable />
            </div>
            <hr className="h-3 my-20 bg-gray-500 rounded-full" />
            <LikeDislikeBarChart />
        </main>
    )
}

export default AdminDashboard
