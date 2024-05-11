import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../../state/slices/user/userSlice.js";
import { today } from "../../../../helpers/dateTimeFormat.js";
// import SpecialOcassionsButton from "../SpecialOccasionsButton/SpecialOcassionsButton.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SpecialOccasions.css";
import ReservationSubmitButton from "../../ReservationSubmitButton/ReservationSubmitButton.jsx";

const SpecialOccasions = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [reservationData, setReservationData] = useState({
    date: today,
    time: "12:00:00",
    table_id: 2,
    user_id: null,
    whole_day: "yes",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (userList) {
      setFormData({
        name: userList.name || "",
        phone: userList.phone || "",
        email: userList.email || "",
      });
    }
  }, [userList]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleChange = (eventOrDate, setStateFunction, stateKey) => {
    if (eventOrDate.target) {
      const { value } = eventOrDate.target;
      setStateFunction((prevState) => ({
        ...prevState,
        [stateKey]: value,
      }));
    } else {
      setStateFunction((prevState) => ({
        ...prevState,
        [stateKey]: eventOrDate,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(reservationData);
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  };

  return (
    <>
      <div className="main__layout__container">
        <h1 className="text__center mbl-2">Special occasions</h1>
        <div className="special__occasions__container">
          <div className="calendar__container">
            <DatePicker
              selected={new Date(reservationData.date)}
              onChange={(date) => handleChange(date, setReservationData, "date")}
              minDate={today}
              inline
            />
          </div>
          <div className="form__container">
            <form onSubmit={handleSubmit}>
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
              <ReservationSubmitButton formData={formData} reservationData={reservationData} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialOccasions;
