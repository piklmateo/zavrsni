import * as Yup from "yup";

const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^(\+?1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$|^\d{10}$/;

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegex, "Plase enter a valid name").min(2).max(100, "Please enter a valid name."),
  surname: Yup.string().matches(nameRegex, "Plase enter a valid name").min(2).max(100, "Please enter a valid surname."),
  phone: Yup.string()
    .matches(phoneRegex, "Please enter a valid phone number.")
    .max(25, "Please enter a valid phone number."),
  email: Yup.string().email("Plase enter a valid email address").required("Please enter a valid email address."),
  username: Yup.string()
    .min(3, "Plase enter a valid username (min 3 characters).")
    .max(20, "Please enter a valid username (max 25 characters).")
    .required("Please enter a valid username."),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .max(100, "Please enter a valid password (max 100 characters).")
    .required("Please enter a valid password"),
});
