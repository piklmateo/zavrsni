import React, { useState, useEffect } from "react";
import "./ProfileForm.css";
import { useDispatch, useSelector } from "react-redux";
import { User, fetchUserData } from "../../state/slices/user/userSlice";
import { updateUserProfile } from "../../hooks/user/userUtils";
import { AppDispatch, RootState } from "../../state/store/store";
import { ProfileSchema } from "../../validation/ProfileValidation";
import ToastComponent from "../ToastComponent/ToastComponent";
import * as Yup from "yup";
import { ValidationError } from "webpack";

const ProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState<User>({
    id_user: null,
    name: "",
    surname: "",
    phone: "",
    email: "",
    username: "",
    role_id: null,
  });
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    if (status === "idle") {
      console.log("Fetching user data...");
      dispatch(fetchUserData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (userList && userList.length > 0) {
      console.log("Fetched user data:", userList[0]);
      const userData = userList[0];
      setFormData({
        ...userData,
      });
    }
  }, [userList]);

  console.log("Status:", status);
  console.log("Form data:", formData);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setStateFunction: React.Dispatch<React.SetStateAction<User>>,
    stateKey: keyof User
  ) => {
    const { value } = event.target;
    setStateFunction((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setErrors({});
      setServerError("");

      await ProfileSchema.validate(formData, { abortEarly: false });

      const result = await updateUserProfile(event, formData, dispatch);
      if (result.success) {
        setToastMessage("Profile updated successfully!");
      } else {
        setServerError("Profile update failed: Internal server error, check user data.");
        setToastMessage("Failed to update profile.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        setServerError("Profile update failed: Internal server error, check user data.");
      }
    }
  };

  return (
    <div>
      <div className="main__layout__container">
        <div className="profile__form__wrapper">
          <ToastComponent message={toastMessage} />
          <h1>profile</h1>
          <form className="form" onSubmit={handleSubmit}>
            {serverError && <div className="error__server">{serverError}</div>}
            <div className="profile__form__input profile__form__name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(event) => handleChange(event, setFormData, "name")}
                className={errors.name ? "error__input" : ""}
              />
              {errors.name && <div className="error__message">{errors.name}</div>}
            </div>
            <div className="profile__form__input profile__form__surname">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                value={formData.surname}
                onChange={(event) => handleChange(event, setFormData, "surname")}
                className={errors.surname ? "error__input" : ""}
              />
              {errors.surname && <div className="error__message">{errors.surname}</div>}
            </div>
            <div className="profile__form__input profile__form__phone">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={(event) => handleChange(event, setFormData, "phone")}
                className={errors.phone ? "error__input" : ""}
              />
              {errors.phone && <div className="error__message">{errors.phone}</div>}
            </div>
            <div className="profile__form__input profile__form__email">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={formData.email} disabled />
            </div>
            <div className="profile__form__input profile__form__username">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={formData.username} disabled />
            </div>
            <button type="submit" className="btn btn__update">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
