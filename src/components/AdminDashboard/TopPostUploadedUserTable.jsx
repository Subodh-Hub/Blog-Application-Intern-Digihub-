import apiClient from '@/api/axiosInterceptors'
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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from "@/components/ui/separator"


const TopPostUploadedUserTable = () => {
    const mostPostContributerUserListUrl = '/admin/topUser'
    const [mostPostContributerUserList, setMostPostContributerUserList] =
        useState([])

    useEffect(() => {
        apiClient
            .get(mostPostContributerUserListUrl)
            .then((res) => {
                setMostPostContributerUserList(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    const roleColors = {
        admin: 'bg-red-100 text-red-700',
        user: 'bg-green-100 text-green-700',
    }
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center mb-7">
                Top Post Contributer User
            </h1>
            <Table>
                <TableCaption className=" mt-7">
                    Top 10 Highest Post Contributer User List
                </TableCaption>
                <TableHeader>
                <TableRow className="bg-gray-100">
                        <TableHead className="w-1/3">Full Name</TableHead>
                        <TableHead className="w-1/5">Phone</TableHead>
                        <TableHead className="w-1/5">Role</TableHead>
                        <TableHead className="w-1/5">Post Uploaded</TableHead>
                    </TableRow>
                </TableHeader>
    
                <TableBody>
                    {mostPostContributerUserList.map((el, key) => (
                        <TableRow key={key} className={` ${key%2!==0?"bg-gray-200 dark:bg-gray-800":""}`}>
                            <TableCell className={`grid items-center justify-center grid-cols-[auto_1fr] gap-3`}>
                                <Avatar className="rounded-full w-9 h-9">
                                    <AvatarImage
                                        src={
                                            el.userId.imageName
                                                ? `http://localhost:8080/user/image/${el.userId.imageName}`
                                                : 'https://github.com/shadcn.png'
                                        }
                                        className="object-cover w-full h-full rounded-full"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback className="capitalize">
                                        {el.userId.firstName.slice(0, 1) +
                                            el.userId.lastName.slice(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="text-center capitalize w-fit">
                                    {el.userId.firstName +
                                        ' ' +
                                        el.userId.middleName +
                                        ' ' +
                                        el.userId.lastName}
                                        
                                </h3>
                            </TableCell>
                            <TableCell>{el.userId.phone}</TableCell>
                            <TableCell>
                                <span  className={`${roleColors[el.userId.role.toLowerCase()]}  font-semibold px-3 py-1 rounded-full`}>{el.userId.role}</span>
                            </TableCell>
                            <TableCell>{el.occurrence}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TopPostUploadedUserTable
