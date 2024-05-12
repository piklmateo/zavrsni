// ProfileForm.js
import React, { useState, useEffect } from "react";
import "./ProfileForm.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../state/slices/user/userSlice";
import { updateUserProfile } from "../../hooks/user/userUtils";
import { AppDispatch, RootState } from "../../state/store/store";

const ProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.user[0]);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData());
      console.log(userList);
    }
  }, [status, dispatch]);

  useEffect(() => {
    setFormData({
      name: userList.name || "",
      surname: userList.surname || "",
      phone: userList.phone || "",
      email: userList.email || "",
      username: userList.username || "",
    });
  }, [userList]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setStateFunction: React.Dispatch<React.SetStateAction<any>>,
    stateKey: string
  ) => {
    const { value } = event.target;
    setStateFunction((prevState: any) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };

  return (
    <div>
      <div className="main__layout__container">
        <div className="profile__form__wrapper">
          <h1>profile</h1>
          <form className="form" onSubmit={(event) => updateUserProfile(event, formData, dispatch)}>
            <div className="profile__form__input profile__form__name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(event) => handleChange(event, setFormData, "name")}
              />
            </div>
            <div className="profile__form__input profile__form__surname">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                value={formData.surname}
                onChange={(event) => handleChange(event, setFormData, "surname")}
              />
            </div>
            <div className="profile__form__input profile__form__phone">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={(event) => handleChange(event, setFormData, "phone")}
              />
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
