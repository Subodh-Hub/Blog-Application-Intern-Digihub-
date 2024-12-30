import { useFormik } from "formik";
import { loginSchema } from "./loginValidationSchema";
const useLoginForm = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (value) => {
      console.log("Form data", value);
    },
  });

  return {
    formik,
  };
};

export default useLoginForm;
