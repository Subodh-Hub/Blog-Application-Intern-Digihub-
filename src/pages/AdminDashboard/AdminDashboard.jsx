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

const AdminDashboard = () => {
    const outlet = useOutlet()
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
        <ThemeProvider>
            <SidebarProvider defaultOpen={true}>
                <AdminSidebar />
                <main className="w-screen">
                    <SidebarTrigger />
                    {outlet ? (
                        outlet
                    ) : (
                        <main className="w-[100%] h-full px-5 m-auto">
                            <div className="bg-custom-gradient py-10 rounded-b-3xl">
                                <h1 className="mb-6 font-semibold text-center font-poppins text-7xl">
                                    Dashboard
                                </h1>
                                <Breadcrumb className="ml-20 my-7">
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/adminDashboard">
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </BreadcrumbList>
                                </Breadcrumb>
                                <div className="flex flex-col justify-around w-full gap-5 xl:px-10 lg:flex-row">
                                    <Card className="px-4 py-4 w-full lg:w-1/6 flex flex-col items-left justify-start bg-white bg-opacity-60 rounded-2xl gap-5">
                                        <CardTitle className="text-gray-800 text-xl font-thin">
                                            Total Users
                                        </CardTitle>
                                        <CardDescription className="flex items-center text-6xl text-left text-gray-800  font-semibold gap-1">
                                            {totalDetails.totalUser}{' '}
                                            <User size={50} />
                                        </CardDescription>
                                    </Card>

                                    <Card className="px-4 py-4 w-full lg:w-1/6 flex flex-col items-left justify-start bg-white bg-opacity-60 rounded-2xl gap-5">
                                        <CardTitle className="text-gray-800 text-xl font-thin">
                                            Total Post
                                        </CardTitle>
                                        <CardDescription className="flex items-center text-6xl text-left text-gray-800  font-semibold gap-1">
                                            {totalDetails.totalPost}{' '}
                                            <StickyNote size={50} />
                                        </CardDescription>
                                    </Card>

                                    <Card className="px-4 py-4 w-full lg:w-1/6 flex flex-col items-left justify-start bg-white bg-opacity-60 rounded-2xl gap-5">
                                        <CardTitle className="text-gray-800 text-xl font-thin">
                                            Total Upvotes
                                        </CardTitle>
                                        <CardDescription className=" flex text-6xl text-left text-gray-800  font-semibold gap-1">
                                            {totalDetails.totalLike}{' '}
                                            <BiSolidUpvote />
                                        </CardDescription>
                                    </Card>

                                    <Card className="px-4 py-4 w-full lg:w-1/6 flex flex-col items-left justify-start bg-white bg-opacity-60 rounded-2xl gap-5">
                                        <CardTitle className="text-gray-800 text-xl font-thin">
                                            Total Downvotes
                                        </CardTitle>
                                        <CardDescription className=" flex text-6xl text-left text-gray-800  font-semibold gap-1">
                                            {totalDetails.totalDisLike}
                                            <BiSolidDownvote />
                                        </CardDescription>
                                    </Card>

                                    <Card className="px-4 py-4 w-full lg:w-1/6 flex flex-col items-left justify-start bg-white bg-opacity-60 rounded-2xl gap-5">
                                        <CardTitle className="text-gray-800 text-xl font-thin">
                                            Total Comments
                                        </CardTitle>
                                        <CardDescription className=" flex text-6xl text-left text-gray-800  font-semibold gap-1">
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
                            <hr className="h-5 bg-gray-500 rounded-full my-20" />
                            <TopPostUploadedUserTable />
                            <hr className="h-5 bg-gray-500 rounded-full my-20" />
                            <MostLikedPostTable />
                        </main>
                    )}
                </main>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default AdminDashboard
