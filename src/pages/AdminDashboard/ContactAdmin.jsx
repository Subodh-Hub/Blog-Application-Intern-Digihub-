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

const ContactAdmin = () => {
    const [contactData, setContactData] = useState([])
    useEffect(() => {
        apiClient.get(`/contact/view`).then(
            (response) => {
                setContactData(response.data)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    const roleColors = {
        admin: 'bg-red-100 text-red-700',
        user: 'bg-green-100 text-green-700',
    }
    return (
        <div className="px-3">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-purple-100">
                        <TableHead className="w-64">Full Name</TableHead>
                        <TableHead className="w-64">Phone</TableHead>
                        <TableHead className="w-64">Role</TableHead>
                        <TableHead className="w-64">Topic</TableHead>
                        <TableHead>Content</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contactData.map((el, ind) => (
                        <TableRow
                            key={ind}
                            className={ind % 2 !== 0 ? 'bg-gray-100' : ''}
                        >
                            <TableCell>
                                {el.user.firstName} {el.user.middleName}{' '}
                                {el.user.lastName}
                            </TableCell>
                            <TableCell>{el.user.phone}</TableCell>
                            <TableCell>
                                <span
                                    className={`${roleColors[el.user.role.toLowerCase()]}  font-semibold px-3 py-1 rounded-full`}
                                >
                                    {el.user.role}
                                </span>
                            </TableCell>
                            <TableCell>{el.topic}</TableCell>
                            <TableCell>{el.content}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ContactAdmin
