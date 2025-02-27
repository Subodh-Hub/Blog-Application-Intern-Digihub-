import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useOutlet, NavLink, useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import useAuth from '@/components/hooks/useAuth'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import apiClient from '@/api/axiosInterceptors'
import { toast } from 'react-toastify'
const Profile = () => {
    const navigate = useNavigate()
    const { userInf, setrefetch } = useAuth()
    const outlet = useOutlet()
    const [updateProfile, setUpdateProfile] = useState(false)
    const validationSchema = Yup.object({
        imageName: Yup.string().required('Required'),
    })
    const formik = useFormik({
        initialValues: {
            imageName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            if (values.imageName) {
                formData.append('image', values.imageName)
                console.log('check')
            }
            apiClient
                .put('/update-userImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    setrefetch((prev) => !prev)
                    toast.success('Profile Picture Updated Sucessfully!!!')
                    setUpdateProfile(false)
                })
                .catch((err) => {
                    console.error(err)
                })
            console.log('values', values.imageName)
        },
    })
    return (
        <div className="bg-white mt-7 dark:bg-customDarkTheme">
            <div className="w-[90vw] m-auto md:px-20 xl:px-60">
                <div className="flex items-center justify-start gap-2">
                    <div className="relative">
                        <Avatar className="w-16 h-16">
                            <AvatarImage
                                src={
                                    userInf.imageName
                                        ? `http://localhost:8080/user/image/${userInf.imageName}`
                                        : 'https://github.com/shadcn.png'
                                }
                                className="object-cover w-full h-full rounded-full"
                            />
                            <AvatarFallback className="capitalize">
                                {userInf?.firstName?.slice(0, 1) +
                                    userInf?.lastName?.slice(0, 1)}
                            </AvatarFallback>
                        </Avatar>

                        <FaPlus
                            className="absolute right-0 z-50 duration-200 ease-in-out cursor-pointer transition-hover -bottom-3 hover:scale-125"
                            color="black"
                            onClick={() => setUpdateProfile(!updateProfile)}
                        />
                    </div>
                    {updateProfile && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <Card className="w-[350px] bg-white p-4 shadow-lg">
                                <CardHeader>
                                    <CardTitle>
                                        Change Profile Picture
                                    </CardTitle>
                                    <CardDescription>
                                        Are you sure you want to change the
                                        profile picture?
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="imageName">
                                                Picture
                                            </Label>
                                            <Input
                                                id="imageName"
                                                type="file"
                                                name="imageName"
                                                accept="image/*"
                                                onChange={(event) =>
                                                    formik.setFieldValue(
                                                        'imageName',
                                                        event.currentTarget
                                                            .files[0]
                                                    )
                                                }
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.imageName &&
                                            formik.errors.imageName ? (
                                                <p className="text-sm text-red-500">
                                                    {formik.errors.imageName}
                                                </p>
                                            ) : null}
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button
                                        variant="outline"
                                        onClick={() => setUpdateProfile(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={() => formik.submitForm()}>
                                        Upload
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}

                    <div>
                        <h3 className="text-3xl font-semibold text-zinc-600 font-poppins dark:text-gray-300">
                            {userInf &&
                                Object.keys(userInf).length > 0 &&
                                `${
                                    userInf.firstName.charAt(0).toUpperCase() +
                                    userInf.firstName.slice(1)
                                } ${userInf.lastName}`}
                        </h3>
                    </div>
                </div>
                <ul className="flex flex-wrap items-center gap-4 mt-8 text-lg text-[#3B3C4A] dark:text-white">
                    <NavLink
                        to="/profile/overview"
                        className={({ isActive }) =>
                            isActive
                                ? 'cursor-pointer bg-gray-300 text-blue-500 dark:bg-slate-700 px-2 py-1 rounded-full'
                                : 'cursor-pointer hover:text-blue-500'
                        }
                    >
                        Overview
                    </NavLink>
                    <NavLink
                        to="/profile/submitted"
                        className={({ isActive }) =>
                            isActive
                                ? 'cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full'
                                : 'cursor-pointer  hover:text-blue-500'
                        }
                    >
                        Posts
                    </NavLink>
                    <NavLink
                        to="/profile/comments"
                        className={({ isActive }) =>
                            isActive
                                ? 'cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full'
                                : 'cursor-pointer  hover:text-blue-500'
                        }
                    >
                        Comments
                    </NavLink>
                    <NavLink
                        to="/profile/upvoted"
                        className={({ isActive }) =>
                            isActive
                                ? 'cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full'
                                : 'cursor-pointer  hover:text-blue-500'
                        }
                    >
                        Upvoted
                    </NavLink>
                    <NavLink
                        to="/profile/downvoted"
                        className={({ isActive }) =>
                            isActive
                                ? 'cursor-pointer  text-blue-500 bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-full'
                                : 'cursor-pointer hover:text-blue-500'
                        }
                    >
                        Downvoted
                    </NavLink>
                </ul>
                <div
                    className="px-3 py-1 mt-4 border-zinc-500 border-[1px] w-fit rounded-full flex gap-2 items-center justify-center cursor-pointer dark:hover:border-white"
                    onClick={() => {
                        navigate('/createPost')
                    }}
                >
                    <FaPlus />
                    Create Post
                </div>
                <hr className="my-3" />
                {outlet}
            </div>
        </div>
    )
}

export default Profile
