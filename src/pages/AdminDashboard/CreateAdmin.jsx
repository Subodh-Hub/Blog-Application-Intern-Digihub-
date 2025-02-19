import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import * as Yup from "yup";
import { useFormik } from "formik";
import apiClient from "@/api/axiosInterceptors";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const CreateAdmin = () => {
  const createAdminURL = "/admin/createAdmin";
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: "",
    image: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be at most 50 characters")
      .required("First name is required"),

    middleName: Yup.string()
      .max(50, "Middle name must be at most 50 characters")
      .nullable(),

    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be at most 50 characters")
      .required("Last name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("middleName", values.middleName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }
      else {
        console.error("Invalid image file:", values.image);
      }

      await apiClient
        .post(createAdminURL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success("Admin Created Sucessfully!!!");
          resetForm();
        })
        .catch((err) => {
          console.log('err',err.response.data.message);
          toast.error(err.response?.data?.message || "Something went wrong");
        });
    },
  });

  return (
    <div className="my-5">
      <h1 className="font-semibold text-center text-7xl">Create Admin</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="lg:w-[50%] px-5 m-auto flex flex-col gap-5"
      >
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-sm text-red-500">{formik.errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="middleName">Middle Name: </label>
          <input
            type="text"
            name="middleName"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-sm text-red-500">{formik.errors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone">Phone Number: </label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        <div className="relative w-full">
          <label htmlFor="password">Password: </label>
          <input
            type={showPassword.password ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          <button
            type="button"
            onClick={() => togglePassword("password")}
            className="absolute text-gray-500 right-3 top-7 xl:top-9"
          >
            {showPassword.password ? (
              <EyeClosed size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div className="relative w-full">
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 pr-10 border rounded-md dark:text-black"
          />
          <button
            type="button"
            onClick={() => togglePassword("confirmPassword")}
            className="absolute text-gray-500 right-3 top-7 xl:top-9"
          >
            {showPassword.confirmPassword ? (
              <EyeClosed size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Picture</Label>
          <Input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              if (event.currentTarget.files.length > 0) {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-sm text-red-500">{formik.errors.image}</p>
          )}
        </div>
        <Button type="submit" className="m-auto w-fit">
          Create Admin
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateAdmin;
