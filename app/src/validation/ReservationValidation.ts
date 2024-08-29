import * as Yup from "yup";

const nameRegex = /^[A-Za-zčćžšđČĆŽŠĐ\s]+$/;
const phoneRegex = /^(\+?1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$|^\d{10}$/;

export const ReservationSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegex, "Plase enter a valid name").min(2).max(100, "Please enter a valid name."),
  phone: Yup.string()
    .notRequired()
    .matches(phoneRegex, "Please enter a valid phone number.")
    .max(25, "Please enter a valid phone number."),
  email: Yup.string().email("Plase enter a valid email address").required("Please enter a valid email address."),
});
