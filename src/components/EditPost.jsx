import { useFormik } from 'formik'
import { Editor } from '@tinymce/tinymce-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import apiClient from '@/api/axiosInterceptors'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import usePostStore from './stores/PostStore'

const EditPost = () => {
    const { post, editPost } = usePostStore()
    const initialValues = {
        postId: post.postId,
        title: post.title,
        content: post.content,
        category: post.category.categoryId,
    }
    const [category, setCategory] = useState([])
    const URL = '/category'
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content cannot be empty'),
        category: Yup.string().required('Please select a category'),
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(URL)
                setCategory(response.data)
            } catch (error) {
                console.log('Error', error)
            }
        }
        fetchData()
    }, [])

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const selectedCategory = category.find(
                (cat) => cat.categoryId === parseInt(values.category)
            );
            console.log('selectedCategory', selectedCategory);
            const editValuesPayload = {
                title: values.title,
                content: values.content,
                category: selectedCategory
            }
            // formik.dirty returns true if values doesnot get changed
            if (formik.dirty) {
                console.log('payload values', editValuesPayload)
                apiClient
                    .put(`/post-update/${values.postId}`, values)
                    .then((res) => {
                        toast.success('Post updated successfully')
                        editPost(editValuesPayload)
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message)
                    })
            } else {
                toast.error('No changes made')
            }
        },
    })
    return (
        <form
            className="flex flex-col justify-center w-full gap-4 mt-4 items-left"
            onSubmit={formik.handleSubmit}
        >
            <div>
                <label
                    htmlFor="title"
                    className="block mb-1 font-medium text-gray-700 text-md dark:text-white"
                >
                    Title
                </label>
                <input
                    name="title"
                    id="title"
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 transition-all border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 dark:text-black focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="text-sm text-red-500">
                        {formik.errors.title}
                    </div>
                ) : null}
            </div>

            <div>
                <label
                    htmlFor="content"
                    className="block mb-1 font-medium text-gray-700 text-md dark:text-white"
                >
                    Content
                </label>
                <Editor
                    apiKey="u7038p4mhwnn5b23g58f080sbij9bx1rdz4r05u9z9stl1tq"
                    value={formik.values.content}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste help wordcount',
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                    }}
                    onEditorChange={(content) =>
                        formik.setFieldValue('content', content)
                    }
                />
                {formik.touched.content && formik.errors.content ? (
                    <div className="text-sm text-red-500">
                        {formik.errors.content}
                    </div>
                ) : null}
            </div>

            <div>
                <label
                    htmlFor="category"
                    className="block mb-1 font-medium text-gray-700 text-md dark:text-white"
                >
                    Select a category
                </label>
                <select
                    name="category"
                    id="category"
                    className="w-full px-4 py-2 capitalize transition-all border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                >
                    <option value="" disabled>
                        Choose a category
                    </option>
                    {category.map((el, i) => (
                        <option
                            key={i}
                            value={el.categoryId}
                            className="capitalize"
                        >
                            {el.categoryTitle}
                        </option>
                    ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                    <div className="text-sm text-red-500">
                        {formik.errors.category}
                    </div>
                ) : null}
            </div>
            <button
                className="border-[1px] border-gray-500 text-gray-500 border-solid px-5 py-2 rounded-full w-fit m-auto dark:bg-blue-600 dark:text-white hover:bg-black hover:text-white dark:hover:bg-blue-400 transition-all ease-in-out duration-300 font-semibold"
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}

export default EditPost
