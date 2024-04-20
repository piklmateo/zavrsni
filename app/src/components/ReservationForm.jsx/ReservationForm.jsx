import React, { useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import "./ReservationForm.css";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const fetchUser = async (userID) => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      `http://localhost:12413/api/users/profile/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      setFormData({
        ...formData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      console.log("formaData: " + formData);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("token token: " + token);
      if (token) {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user.id_user;
        fetchUser(id);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {});

  return (
    <div className="main__layout__container">
      <div className="reservation__form__wrapper">
        <h1>Reservation</h1>
        <form className="form">
          <div className="input__name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input__phone">
            <label htmlFor="phone">Phone(optional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className="input__date">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" />
          </div>
          <div className="select__time">
            <label htmlFor="time">Time</label>
            <select name="time" id="time">
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 AM</option>
              <option value="13:00">13:00 PM</option>
              <option value="14:00">14:00 PM</option>
              <option value="15:00">15:00 PM</option>
              <option value="16:00">16:00 PM</option>
              <option value="17:00">17:00 PM</option>
              <option value="18:00">18:00 PM</option>
              <option value="19:00">19:00 PM</option>
              <option value="20:00">20:00 PM</option>
              <option value="21:00">21:00 PM</option>
              <option value="22:00">22:00 PM</option>
            </select>
          </div>
          <div className="select__num-of-people">
            <label htmlFor="people">How many people ?</label>
            <select name="people" id="people">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div>
            <button className="btn btn__reserve">Reserve</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
