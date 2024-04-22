import React, { useState, useEffect } from "react";
import LeftArrow from "../../assets/images/left-arrow.svg";
import RightArrow from "../../assets/images/right-arrow.svg";
import { jwtDecode } from "jwt-decode";
import "./ReservationForm.css";

const ReservationForm = () => {
  const [step, setStep] = useState(1);
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

  return (
    <div className="main__layout__container">
      <div className="reservation__form__wrapper">
        <h1>Reservation</h1>
        <form className="form">
          {step === 1 && (
            <div className="input__date">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {step === 2 && (
            <div className="select__time">
              <label htmlFor="time">Time</label>
              <select
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
              >
                {/* Options for time */}
              </select>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="input__name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
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
                  value={formData.email}
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
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button className="btn btn__reserve">Reserve</button>
              </div>
            </>
          )}
        </form>
        <div className="navigation__buttons">
          {step !== 1 && (
            <div>
              <button
                className="navigation__btn"
                onClick={() => setStep(step - 1)}
              >
                <img alt="arrow-back" src={LeftArrow} width={40} height={40} />
              </button>
            </div>
          )}
          {step !== 3 && (
            <div>
              <button
                className="navigation__btn"
                onClick={() => setStep(step + 1)}
              >
                <img alt="arrow-next" src={RightArrow} width={40} height={40} />
              </button>
            </div>
          )}
        </div>
        <div className="step__indicator">
          <div
            className={`step__line ${step >= 1 ? "step__active" : ""}`}
          ></div>
          <div
            className={`step__line ${step >= 2 ? "step__active" : ""}`}
          ></div>
          <div
            className={`step__line ${step >= 3 ? "step__active" : ""}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
