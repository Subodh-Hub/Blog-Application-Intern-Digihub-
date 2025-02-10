import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "@/api/axiosInterceptors";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const UpdateProfile = () => {
  const { userInf } = useAuth();
  const URL = "/update-user";

  const validationSchema = Yup.object({
    fName: Yup.string().required("First name is required"),
    lName: Yup.string().required("Last name required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone number must be numeric")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      fName: userInf?.firstName || "",
      mName: userInf?.middleName || "",
      lName: userInf?.lastName || "",
      phoneNumber: userInf?.phone || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
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
      console.log('values',values);
    },
  });
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col items-center w-full gap-4 lg:px-20"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            value={formik.values.fName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fName && formik.errors.fName ? (
            <p className="text-red-500">{formik.errors.fName}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="mName">Middle Name</label>
          <input
            type="text"
            name="mName"
            value={formik.values.mName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mName && formik.errors.mName ? (
            <p className="text-red-500">{formik.errors.mName}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name="lName"
            value={formik.values.lName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lName && formik.errors.lName ? (
            <p className="text-red-500">{formik.errors.lName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <p className="text-red-500">{formik.errors.phoneNumber}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-4 border-[1px] border-gray-500 text-gray-500 border-solid px-5 py-2 rounded-full w-fit m-auto dark:bg-blue-600 dark:text-white hover:bg-black hover:text-white dark:hover:bg-blue-400 transition-all ease-in-out duration-300 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
