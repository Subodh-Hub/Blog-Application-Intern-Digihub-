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
    return (
        <div className="my-5">
            <Table>
                <TableCaption className="text-xl mt-7">
                    Highest Post Contributer User List
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-40">Full Name</TableHead>
                        <TableHead className="w-20">Phone</TableHead>
                        <TableHead className="w-10">Role</TableHead>
                        <TableHead className="w-5">Post Uploaded</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mostPostContributerUserList.map((el, key) => (
                        <TableRow key={key}>
                            <TableCell className="capitalize">
                                {el.userId.firstName +
                                    ' ' +
                                    el.userId.middleName +
                                    ' ' +
                                    el.userId.lastName}
                            </TableCell>
                            <TableCell>{el.userId.phone}</TableCell>
                            <TableCell>{el.userId.role}</TableCell>
                            <TableCell>{el.occurrence}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TopPostUploadedUserTable
