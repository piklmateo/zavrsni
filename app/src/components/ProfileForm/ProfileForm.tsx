import React, { useState, useEffect } from "react";
import "./ProfileForm.css";
import { useDispatch, useSelector } from "react-redux";
import { User, fetchUserData } from "../../state/slices/user/userSlice";
import { updateUserProfile } from "../../hooks/user/userUtils";
import { AppDispatch, RootState } from "../../state/store/store";

const ProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);
  const [formData, setFormData] = useState<User>({
    id_user: 0,
    name: "",
    surname: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    role_id: 0,
  });

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
