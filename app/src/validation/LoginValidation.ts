import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must have at least 3 characters.")
    .max(20, "Please enter a valid username.")
    .required("Please enter a valid username"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .max(100, "Please enter a valid password.")
    .required("Please enter a valid password"),
});
