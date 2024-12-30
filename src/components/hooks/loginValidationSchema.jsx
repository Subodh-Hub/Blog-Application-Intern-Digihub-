import * as Yup from "yup";

export const loginSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
