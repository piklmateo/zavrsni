import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../state/slices/user/userSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ReservationSchema } from "../../../validation/ReservationValidation";
import * as Yup from "yup";
import "./ReservationSubmitButton.css";

interface DecodedToken extends JwtPayload {
  user: {
    id_user: number;
    username: string;
    role: number;
  };
}

interface ReservationSubmitButtonProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  reservationData: {
    date: Date;
    time: string;
    table_id: number;
    user_id: number | null;
    whole_day: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  setServerError: React.Dispatch<React.SetStateAction<string>>;
}

const ReservationSubmitButton = ({
  formData,
  reservationData,
  setServerError,
  setErrors,
}: ReservationSubmitButtonProps) => {
  const dispatch = useDispatch();

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");

    let dataToSend;

    if (token) {
      try {
        const decodedToken = jwtDecode(token) as DecodedToken;
        const user_id = decodedToken.user.id_user;

        dataToSend = {
          ...reservationData,
          user_id: user_id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        };
      } catch (error) {
        console.log("Error decoding token: " + error);
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
      await ReservationSchema.validate(dataToSend, { abortEarly: false });

      const res = await fetch("http://localhost:12413/api/reservations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        dispatch(updateUser(dataToSend));
        window.location.reload();
        console.log("Successful reservation!");
      } else {
        setServerError(
          "Reservation failed: Internal server error, check data."
        );
        console.log("Error: response not ok");
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
        setServerError(
          "Reservation failed: Internal server error, check data."
        );
      }
    }
  };

  return (
    <div>
      <button className="btn btn__reserve" onClick={handleSubmit}>
        Reserve
      </button>
    </div>
  );
};

export default ReservationSubmitButton;
