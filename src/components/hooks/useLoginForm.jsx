import { useFormik } from "formik";
import { loginSchema } from "./loginValidationSchema";
import axios from "@/api/axios";
const URL = "/login";
const useLoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const payload = {
        username: values.email,
        password: values.password,
      }
      try {
        // console.log(values);
        const response = await axios.post(URL, payload);
        console.log("Form data", response);
      } catch (error) {
        console.error("Error submitting form", error);
      }
    },
  });

  return {
    formik,
  };
};

export default useLoginForm;
