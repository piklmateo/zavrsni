import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2).max(100, "Please enter a valid name."),
  surname: Yup.string().min(2).max(100, "Please enter a valid surname."),
  phone: Yup.string().min(6, "Please enter a valid phone number.").max(25, "Please enter a valid phone number."),
});
