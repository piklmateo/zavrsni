import * as Yup from "yup";

const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^(\+?1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$|^\d{10}$/;

export const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, "Please enter a valid name.")
    .min(2, "Please enter a valid name.")
    .max(100, "Please enter a valid name.")
    .required("Please enter a valid name."),
  surname: Yup.string()
    .matches(nameRegex, "Please enter a valid surname.")
    .min(2, "Please enter a valid surname.")
    .max(100, "Please enter a valid surname.")
    .required("Please enter a valid surname."),
  phone: Yup.string()
    .matches(phoneRegex, "Please enter a valid phone number.")
    .min(6, "Please enter a valid phone number.")
    .max(25, "Please enter a valid phone number."),
});
