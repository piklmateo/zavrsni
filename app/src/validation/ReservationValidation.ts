import * as Yup from "yup";

export const ReservationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(100, "Please enter a valid name."),
  phone: Yup.string().min(6, "Please enter a valid phone number.").max(25, "Please enter a valid phone number."),
  email: Yup.string().email("Plase enter a valid email address").required("Please enter a valid email address."),
});
