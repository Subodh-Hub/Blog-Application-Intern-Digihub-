import apiClient from "@/api/axiosInterceptors";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const CreatePost = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await apiClient
        .post(`/category/${values.category}/posts`, values)
        .then((res) => {
          toast.success("Post created successfully");
          resetForm();
          console.log(res);
        })

        .catch((error) => {
          const errorMessage = error.response.data.message || error.message;
          console.log(error);
          toast.warning(errorMessage);
        });
    },
  });

  const URL = "/category";
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(URL);
        setCategory(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white mt-7 dark:bg-customDarkTheme w-[90vw] m-auto md:px-20 xl:px-60">
      <h2 className="font-semibold text-center text-8xl font-poppins">
        Create Post
      </h2>
      <form
        className="flex flex-col justify-center w-full gap-4 mt-4 items-left md:px-20 xl:px-60"
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
            className="w-full px-4 py-2 transition-all border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 dark:text-black focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-sm text-red-500">{formik.errors.title}</div>
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
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content) =>
              formik.setFieldValue("content", content)
            }
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="text-sm text-red-500">{formik.errors.content}</div>
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
            className="w-full px-4 py-2 transition-all border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="" disabled>
              Choose a category
            </option>
            {category.map((el, i) => (
              <option key={i} value={el.categoryId}>
                {el.categoryTitle}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-sm text-red-500">{formik.errors.category}</div>
          ) : null}
        </div>
        <button
          className="border-[1px] border-gray-500 text-gray-500 border-solid px-5 py-2 rounded-full w-fit m-auto dark:bg-blue-600 dark:text-white hover:bg-black hover:text-white dark:hover:bg-blue-400 transition-all ease-in-out duration-300 font-semibold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
