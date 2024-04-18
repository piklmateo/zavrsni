// ProfileForm.js
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id_user;

        fetchUserData(userId);
      } catch (error) {
        console.error("Invalid token specified:", error.message);
      }
    } else {
      console.error("No token found. User is not logged in.");
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      console.log("USER-ID prije fetcha: " + userId);
      const jwtToken = sessionStorage.getItem("token");
      const res = await fetch(
        `http://localhost:12413/api/users/profile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data:", res.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <div>
      {userData ? (
        <div className="main__layout__container">
          <div className="profile__form__wrapper">
            <h1>profile</h1>
            <form className="form">
              <div className="profile__form__input profile__form__name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={userData.name}
                />
              </div>
              <div className="profile__form__input profile__form__surname">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  defaultValue={userData.surname}
                />
              </div>
              <div className="profile__form__input profile__form__phone">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  defaultValue={userData.phone}
                />
              </div>
              <div className="profile__form__input profile__form__email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={userData.email}
                  disabled
                />
              </div>
              <div className="profile__form__input profile__form__username">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={userData.username}
                  disabled
                />
              </div>
              <button className="btn btn__update">Update</button>
            </form>
          </div>
        </div>
      ) : (
        <p>You must login to see your profile...</p>
      )}
    </div>
  );
};

export default ProfileForm;
