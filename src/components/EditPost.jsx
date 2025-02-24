import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { useFormik } from 'formik'
import { AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog'

const EditPost = ({ isDialogOpen, setIsDialogOpen, postId, data }) => {
    const initialValues = {
        title: data.title,
        content: data.content,
        imageName: data.imageName,
        categoryId: data.categoryId,
    }

    const formik = useFormik({})
    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='px-2 hover:bg-gray-200 hover:border-0'>
                    Edit
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Update Post
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <form action="">
                            <div>
                                <label htmlFor="">Title:</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Content:</label>
                                <input type="text" />
                            </div>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EditPost
