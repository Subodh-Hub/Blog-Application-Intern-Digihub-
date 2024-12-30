import { useFormik } from "formik";
import { signUpSchema } from "./signUpValidationSchema";

import React from "react";

const useSignUp = () => {
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
    onSubmit: (value) => {
      console.log("Form data", value);
    },
  });

  return {
    formik,
  };
};

export default useSignUp;
