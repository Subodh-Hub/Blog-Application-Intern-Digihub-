import { useFormik } from "formik";
import { signUpSchema } from "./signUpValidationSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import apiClient from "@/api/axiosInterceptors";

const useSignUp = () => {
  const URL = "/signup";
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const payload = {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      try {
        const response = await apiClient.post(URL, payload);
        if (response) {
          toast.success("Signup successfull!!!");
        } else if (response.message === "Email already exits") {
          toast.warning("Email already exist!!!");
        }
        console.log("Form data", response);
      } catch (error) {
        toast.error("Error submitting form ", error);
        setLoading(false);
      }
    },
  });
  return {
    formik,
    loading,
  };
};

export default useSignUp;
