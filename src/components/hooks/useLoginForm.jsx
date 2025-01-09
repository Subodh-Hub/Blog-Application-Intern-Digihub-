import { useFormik } from "formik";
import { loginSchema } from "./loginValidationSchema";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const URL = "/login";
const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
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
        const response = await axios.post(URL, payload);
        navigate("/dashboard");
        
      } 
      catch (error) {
        toast.error("Wrong credential!!!");
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
