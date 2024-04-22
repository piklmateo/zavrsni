import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LeftArrow from "../../assets/images/left-arrow.svg";
import RightArrow from "../../assets/images/right-arrow.svg";
import { today } from "../../helpers/dateTimeFormat.js";
import { jwtDecode } from "jwt-decode";
import "./ReservationForm.css";

const ReservationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [reservationData, setReservationData] = useState({
    date: today,
    time: "12:00:00",
    table_id: 1,
    user_id: null,
  });

  const handleChange = (event, setStateFunction, stateKey) => {
    const { value } = event.target;
    setStateFunction((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };

  const fetchUser = async (userID) => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`http://localhost:12413/api/users/profile/${userID}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

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
      if (token && !formData.name) {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user.id_user;
        fetchUser(id);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    let dataToSend;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.user.id_user;

        dataToSend = {
          ...reservationData,
          user_id: user_id,
        };
      } catch (error) {
        console.log("error catch: " + error);
        return;
      }
    } else {
      dataToSend = {
        ...reservationData,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
    }

    try {
      const res = await fetch("http://localhost:12413/api/reservations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        navigate("/");
        console.log("success!");
      } else {
        console.log("error res not ok");
      }
    } catch (error) {
      console.log("error catch: " + error);
    }
  };

  return (
    <div className="main__layout__container">
      <div className="reservation__form__wrapper">
        <h1>Reservation</h1>
        <div className="step__indicator">
          <div className={`step__line ${step >= 1 ? "step__active" : ""}`}></div>
          <div className={`step__line ${step >= 2 ? "step__active" : ""}`}></div>
          <div className={`step__line ${step >= 3 ? "step__active" : ""}`}></div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="input__date">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={reservationData.date}
                onChange={(event) => handleChange(event, setReservationData, "date")}
                required
              />
            </div>
          )}
          {step === 2 && (
            <>
              <div className="select__time">
                <label htmlFor="time">Time</label>
                <select
                  name="time"
                  id="time"
                  value={reservationData.time}
                  onChange={(event) => handleChange(event, setReservationData, "time")}
                  required
                >
                  <option value="12:00:00">12 PM</option>
                  <option value="13:30:00">13:30 PM</option>
                  <option value="15:00:00">15 PM</option>
                  <option value="16:30:00">16:30 PM</option>
                  <option value="18:00:00">18 PM</option>
                  <option value="19:30:00">19:30 PM</option>
                  <option value="21:00:00">21 PM</option>
                </select>
              </div>
              <div className="select__people">
                <label htmlFor="people">People</label>
                <select
                  name="people"
                  id="people"
                  value={reservationData.table_id}
                  onChange={(event) => handleChange(event, setReservationData, "table_id")}
                  required
                >
                  <option value={2}>Table 2 - 2 people</option>
                  <option value={5}>Table 5 - 2 people</option>
                  <option value={7}>Table 7 - 2 people</option>
                  <option value={8}>Table 8 - 4 people</option>
                  <option value={4}>Table 4 - 4 people</option>
                  <option value={1}>Table 1 - 4 people</option>
                  <option value={3}>Table 3 - 6 people</option>
                  <option value={6}>Table 6 - 8 people</option>
                </select>
              </div>
            </>
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
                  onChange={(event) => handleChange(event, setFormData, "name")}
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
                  onChange={(event) => handleChange(event, setFormData, "email")}
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
                  onChange={(event) => handleChange(event, setFormData, "phone")}
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
              <button className="navigation__btn" onClick={() => setStep(step - 1)}>
                <img alt="arrow-back" src={LeftArrow} width={40} height={40} />
              </button>
            </div>
          )}
          {step !== 3 && (
            <div>
              <button className="navigation__btn" onClick={() => setStep(step + 1)}>
                <img alt="arrow-next" src={RightArrow} width={40} height={40} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
