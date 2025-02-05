import { useFormik } from "formik";
import { loginSchema } from "./loginValidationSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "@/api/axiosInterceptors";
import useAuth from "./useAuth";

const useLoginForm = () => {
  const URL = "/login";
  const [loading, setLoading] = useState(false);
  const { userInf, fetchData } = useAuth();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true);
      const payload = {
        username: values.email,
        password: values.password,
      };
      apiClient
        .post(URL, payload)
        .then((response) => {
          const accessToken = response.data.accessToken;
          if (accessToken) {
            toast.success("Login Successful");
            fetchData();
            localStorage.setItem("accessToken", accessToken);
            setTimeout(() => {
              userInf.role === "ADMIN"
                ? navigate("/adminDashboard")
                : navigate("/");
            }, 1000);
          }
        })
        .catch((error) => {
          console.error("Request Error:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return {
    formik,
    loading,
  };
};

export default useLoginForm;
