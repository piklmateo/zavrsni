import * as Yup from "yup";

const nameRegex = /^[A-Za-z\s]+$/;
const ingredientsRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*(?:,\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)*$/;

export const AddMenuItemValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, "Please enter a valid dish name.")
    .min(2)
    .max(100, "Please enter a valid dish name.")
    .required("Please enter valid ingrediesnts."),
  ingridients: Yup.string()
    .matches(ingredientsRegex, "Please enter valid ingredients")
    .min(6, "Please enter valid ingredients.")
    .max(255, "Please enter a valid phone number.")
    .required("Please enter valid ingredients."),
  price: Yup.string().min(1, "Plase enter a valid price").required("Please enter a valid email address."),
});
