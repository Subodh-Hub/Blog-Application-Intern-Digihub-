import { useFormik } from 'formik'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import * as Yup from 'yup'
import apiClient from '@/api/axiosInterceptors'
import { toast } from 'react-toastify'
import usePostStore from './stores/PostStore'


const EditPicture = ({postId}) => {
    const {editPost,isLoadingPicture} = usePostStore()
    const formik = useFormik({
        initialValues: {
            image: '',
        },
        
        enableReinitialize: true,

        validationSchema: Yup.object({
            image: Yup.mixed()
                .required('Image is required')
                .test(
                    'fileType',
                    'Only image files are allowed',
                    (value) =>
                        value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
                ),
        }),
        
        onSubmit: async (values) => {
            isLoadingPicture:true
            console.log('values', values)
            const formData = new FormData()
            if(values.image instanceof File){
                formData.append('image', values.image)
            }
            apiClient.post(`/post/image/upload/${postId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                toast.success("Picture Updated Successfully")
                editPost({imageName:res.data.imageName})
                console.log('res',res.data.imageName);
                isLoadingPicture:false
            }).catch((err) => {
                console.error(err)
            })
        },
    })
    return (
        <div>
            <h1>EditPicture</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="image">Picture</Label>
                    <Input
                        id="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(event) =>
                            formik.setFieldValue(
                                'image',
                                event.currentTarget.files[0]
                            )
                        }
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.image && formik.errors.image ? (
                        <p className="text-sm text-red-500">
                            {formik.errors.image}
                        </p>
                    ) : null}
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default EditPicture
