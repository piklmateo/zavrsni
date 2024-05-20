import * as Yup from "yup";

const nameRegex = /^[A-Za-z\s]+$/;

export const AddDrinkValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, "Please enter a valid name.")
    .min(2, "Please enter a valid name.")
    .max(100, "Please enter a valid name.")
    .required("Please enter a valid name."),
  price: Yup.string().min(1, "Plase enter a valid price").required("Please enter a valid price."),
});
