import useAuth from '@/components/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUpRight } from 'lucide-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import apiClient from '@/api/axiosInterceptors'
import { toast, ToastContainer } from 'react-toastify'

const Contact = () => {
    const { userInf } = useAuth()
    const validationSchema = Yup.object({
        topic: Yup.string()
            .min(3, 'Topic must be at least 3 characters')
            .required('Topic is required'),
        content: Yup.string()
            .min(8, 'Message must be at least 8 characters')
            .required('Message is required'),
    })

    const contactUrl = "/contact/submit"
    
    const formik = useFormik({
        initialValues: {
            topic: '',
            content: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            apiClient.post(contactUrl, values).then((res) => {
                toast.success('Message sent successfully')
                formik.resetForm()
            })
            console.log('values', values)
        },
    })

    return (
        <div className="w-screen px-8 py-6 text-black bg-white mt-9 md:px-32 xl:px-80 dark:bg-customDarkTheme">
            {userInf ? (
                <div className="lg:px-20">
                    <h1 className="text-4xl font-poppins dark:text-gray-100">
                        Love to hear from you
                    </h1>
                    <h1 className="text-4xl font-poppins dark:text-gray-100">
                        Get in touch👋
                    </h1>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="my-6">
                            <Label
                                htmlFor="topic"
                                className="block mb-2 font-medium text-gray-900 dark:text-gray-200"
                            >
                                Topic <span className='text-red-500'>*</span>
                            </Label>
                            <Input
                                type="text"
                                id="topic"
                                name="topic"
                                className="dark:bg-[#1b263b] dark:text-gray-300"
                                value={formik.values.topic}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter the subject of your inquiry"
                            />
                            {formik.touched.topic && formik.errors.topic ? (
                                <div className="text-red-500">
                                    {formik.errors.topic}
                                </div>
                            ) : null}
                        </div>
                        <div className="my-6">
                            <Label
                                htmlFor="content"
                                className="block mb-2 font-medium text-gray-900 dark:text-gray-200"
                            >
                                Content <span className='text-red-500'>*</span>
                            </Label>
                            <Textarea
                                placeholder="Write your message here... Please provide detailed information to help us assist you better."
                                id="content"
                                name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="dark:text-gray-300"
                            />
                            {formik.touched.content && formik.errors.content ? (
                                <div className="text-red-500">
                                    {formik.errors.content}
                                </div>
                            ): null}
                        </div>
                        <Button className="gap-5 px-9" type="submit">
                            Just Send <ArrowUpRight />
                        </Button>
                    </form>
                </div>
            ) : (
                <h1 className="text-4xl font-poppins dark:text-gray-400">
                    Please logged in first🙏
                </h1>
            )}
            <ToastContainer />
        </div>
    )
}

export default Contact
