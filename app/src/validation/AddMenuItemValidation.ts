import * as Yup from "yup";

export const ReservationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(100, "Please enter a valid dish name.").required("Please enter valid ingrediesnts."),
  ingridients: Yup.string()
    .min(6, "Please enter valid ingredients.")
    .max(255, "Please enter a valid phone number.")
    .required("Please enter valid ingredients."),
  price: Yup.string().min(1, "Plase enter a valid price").required("Please enter a valid email address."),
});
