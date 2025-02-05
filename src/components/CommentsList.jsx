import apiClient from "@/api/axiosInterceptors";
import Comments from "@/components/Comments";
import { usePostStats } from "@/context/PostStatusContext";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import * as Yup from "yup";

const CommentsList = ({ postId }) => {
  const [data, setData] = useState({});
  const URL = `comment/comments-post/${postId}`;
  const commentURL = `/comment/post/${postId}/comment`;

  const fetchData = async () => {
    try {
      const res = await apiClient.get(URL);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await apiClient.post(commentURL, values);
        console.log(res.data);
        fetchData();
        resetForm();
        console.log("values", values);
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment is required"),
    }),
  });

  useEffect(() => {
    fetchData();
  }, [postId]);
  const {fetchStats} = usePostStats();
  
  return (
    <div>
      Comments
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center p-1 space-x-2 overflow-hidden bg-gray-100 rounded-full shadow-md full">
          <input
            name="content"
            id="content"
            type="text"
            className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 rounded-l-full outline-none x-4 h focus:ring-2 focus:ring-blue-500"
            value={formik.values.content}
            onChange={formik.handleChange}
            placeholder="Add a comment"
          />

          <button
            type="submit"
            className="p-2 bg-gray-100 border-[1px] rounded-r-full border-solid hover:bg-gray-200 hover:scale-150 focus:outline-none"
          >
            <IoMdSend onClick={fetchStats(postId)}/>
          </button>
        </div>
        {formik.errors.content ? (
          <div className="text-red-500">{formik.errors.content}</div>
        ) : null}
      </form>
      {data.length > 0 ? (
        data.map((comment, index) => <Comments key={index} comment={comment} />)
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default CommentsList;
