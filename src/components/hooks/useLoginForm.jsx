import { useFormik } from "formik";
import { loginSchema } from "./loginValidationSchema";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "@/api/axiosInterceptors";
import AuthContext from "@/context/AuthProvider";
const URL = "/login";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { setUserInf } = useContext(AuthContext);
  const getUserURL = "/getUser-auth";

  const fetchData = async () => {
    try {
      const response = await apiClient.get(getUserURL);
      setUserInf(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in.");
      } else {
        toast.error("Failed to fetch user data.");
      }
    }
  };

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        username: values.email,
        password: values.password,
      };
      try {
        const response = await apiClient.post(URL, payload);
        const accessToken = response.data.accessToken;
        if (response.data?.accessToken) {
          localStorage.setItem("accessToken", accessToken);
          fetchData();
          toast.success("Login Successfull");
          navigate("/");
        }
      } catch (error) {
        {
          console.error("Request Error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    formik,
    loading,
  };
};

export default useLoginForm;
