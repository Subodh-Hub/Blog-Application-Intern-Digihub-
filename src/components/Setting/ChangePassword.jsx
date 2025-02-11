import { useFormik } from "formik";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import * as Yup from "yup";
import apiClient from "@/api/axiosInterceptors";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const URL = "/reset-password";

  const togglePassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Required!"),
    newPassword: Yup.string().required("Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required!"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      apiClient
        .put(URL, values)
        .then((response) => {
          toast.success("Password Changed Sucessfully");
          resetForm();
        })
        .catch((err) => {
          const errorMessage = err.response.data.message;
          toast.error(errorMessage);
        });
      // console.log('values',values);
    },
  });
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col items-center w-full gap-4 lg:px-20"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative w-full">
          <label htmlFor="oldPassword">Current password</label>
          <input
            name="oldPassword"
            type={showPassword.oldPassword ? "text" : "password"}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          <button
            type="button"
            onClick={() => togglePassword("oldPassword")}
            className="absolute text-gray-500 right-3 top-9"
          >
            {showPassword.oldPassword ? (
              <EyeClosed size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div className="text-red-500">{formik.errors.oldPassword}</div>
          ) : null}
        </div>
        <div className="relative w-full">
          <label htmlFor="newPassword">New password</label>
          <input
            name="newPassword"
            type={showPassword.newPassword ? "text" : "password"}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          <button
            type="button"
            onClick={() => togglePassword("newPassword")}
            className="absolute text-gray-500 right-3 top-9"
          >
            {showPassword.newPassword ? (
              <EyeClosed size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-red-500">{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <div className="relative w-full">
          <label htmlFor="confirmPassword">Re-type new password</label>
          <input
            name="confirmPassword"
            type={showPassword.confirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          <button
            type="button"
            onClick={() => togglePassword("confirmPassword")}
            className="absolute text-gray-500 right-3 top-9"
          >
            {showPassword.confirmPassword ? (
              <EyeClosed size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <button
          type="sumbit"
          className="mt-4 border-[1px] border-gray-500 text-gray-500 border-solid px-5 py-2 rounded-full w-fit m-auto dark:bg-blue-600 dark:text-white hover:bg-black hover:text-white dark:hover:bg-blue-400 transition-all ease-in-out duration-300 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
