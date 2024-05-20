import * as Yup from "yup";

const nameRegex = /^[A-Za-z\s]+$/;
const ingredientsRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*(?:,\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)*$/;

export const AddDishValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, "Please enter a valid name.")
    .min(2, "Please enter a valid name.")
    .max(100, "Please enter a valid name.")
    .required("Please enter a valid name."),
  ingridients: Yup.string()
    .matches(ingredientsRegex, "Please enter valid ingredients")
    .min(6, "Please enter valid ingredients.")
    .max(255, "Please enter valid ingredients.")
    .required("Please enter valid ingredients."),
  price: Yup.string().min(1, "Plase enter a valid price").required("Please enter a valid price."),
});
