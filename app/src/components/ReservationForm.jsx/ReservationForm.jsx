import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./ReservationForm.css";

const ReservationForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const reservationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: formData.get("date"),
      time: formData.get("time"),
      numOfPeople: formData.get("num-of-people"),
    };

    try {
      const jwtToken = sessionStorage.getItem("token");
      const availabilityResponse = await fetch(
        "http://localhost:12413/api/reservations/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
          body: JSON.stringify({
            date: reservationData.date,
            time: reservationData.time,
          }),
        }
      );

      if (!availabilityResponse.ok) {
        throw new Error("Failed to check availability");
      }

      const availabilityData = await availabilityResponse.json();

      if (availabilityData.available) {
        const reservationResponse = await fetch(
          "http://localhost:12413/api/reservations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwtToken,
            },
            body: JSON.stringify(reservationData),
          }
        );

        if (!reservationResponse.ok) {
          throw new Error("Failed to make reservation");
        }

        console.log("Reservation successful:", reservationResponse.data);
        navigate("/");
      } else {
        alert(
          "Selected date and time are not available. Please choose another slot."
        );
      }
    } catch (error) {
      console.error("Error during reservation:", error);
      alert(
        "An error occurred while making the reservation. Please try again later."
      );
    }
  };

  return (
    <div className="main__layout__container">
      <div className="reservation__form__wrapper">
        <h1>Reservation</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input__name">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div className="input__email">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="input__phone">
            <label htmlFor="phone">Phone(optional)</label>
            <input type="tel" name="phone" id="phone" />
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
            <label htmlFor="num-of-people">How many people ?</label>
            <select name="num-of-people" id="num-of-people">
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
