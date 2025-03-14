import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignUp from '../components/hooks/useSignUp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Form } from '@/components/ui/form'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '../components/ui/card'
import signupPic from '@/assets/images/signup.png'
import { ToastContainer } from 'react-toastify'
import { Eye, EyeClosed, Loader2 } from 'lucide-react'
const SignUp = () => {
    const { formik, loading } = useSignUp()
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    })

    const togglePassword = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field],
        })
    }
    return (
        <div className="flex items-center justify-center w-screen py-14 h-fit bg-custom-gradient">
            <div className="flex justify-center bg-white w-[75vw] h-fit rounded-3xl overflow-hidden">
                <div className="relative z-10 hidden lg:w-1/3 h-100 lg:block bg-customPink">
                    <img
                        src={signupPic}
                        alt=""
                        className="absolute bottom-3 right-[-40px] z-20"
                    />
                </div>

                <Card className="items-center border-none md:w-2/3 p-7 lg:px-20 dark:bg-white">
                    <CardHeader className="xl:w-2/3">
                        <CardTitle className="text-[#d885a3] font-poppins text-3xl text-left dark:text-[#d885a3]">
                            Sign Up
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="xl:w-2/3">
                        <Form>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="flex flex-col justify-center gap-4 item-center dark:text-black"
                            >
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="bg-[#c0dbea] border-none"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.firstName &&
                                    formik.errors.firstName ? (
                                        <p className="text-sm text-red-500">
                                            {formik.errors.firstName}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="middleName">
                                        Middle Name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="middleName"
                                        name="middleName"
                                        className="bg-[#c0dbea] border-none"
                                        value={formik.values.middleName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="bg-[#c0dbea] border-none"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.lastName &&
                                    formik.errors.lastName ? (
                                        <p className="text-sm text-red-500">
                                            {formik.errors.lastName}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield] bg-[#c0dbea] border-none"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.phone &&
                                    formik.errors.phone ? (
                                        <p className="text-sm text-red-500">
                                            {formik.errors.phone}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="bg-[#c0dbea] border-none"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email &&
                                    formik.errors.email ? (
                                        <p className="text-sm text-red-500">
                                            {formik.errors.email}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex flex-col space-y-1.5 relative">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        type={showPassword.password ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="bg-[#c0dbea] border-none"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            togglePassword('password')
                                        }
                                        className="absolute z-50 text-black right-3 top-9"
                                    >
                                        {showPassword.password ? (
                                            <EyeClosed size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                    {formik.touched.password &&
                                    formik.errors.password ? (
                                        <p className="text-sm text-red-500">
                                            {formik.errors.password}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex flex-col space-y-1.5 relative">
                                    <Label htmlFor="confirmPassword">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        type={showPassword.confirmPassword?"text":"password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="bg-[#c0dbea] border-none"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            togglePassword('confirmPassword')
                                        }
                                        className="absolute z-50 text-black right-3 top-9"
                                    >
                                        {showPassword.confirmPassword ? (
                                            <EyeClosed size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                    {formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword ? (
                                        <p className="text-sm text-red-500">
                                            {formik.errors.confirmPassword}
                                        </p>
                                    ) : null}
                                </div>
                                <Button
                                    type="submit"
                                    className="items-center m-auto mt-3 bg-[#d885a3] w-fit uppercase font-semibold font-poppins rounded-full dark:text-white"
                                >
                                    Sign Up
                                    {loading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        ''
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="justify-center xl:w-2/3">
                        <p className="text-center dark:text-black">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-[#d885a3] font-semibold"
                            >
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
                <ToastContainer position="top-right" />
            </div>
        </div>
    )
}

export default SignUp
