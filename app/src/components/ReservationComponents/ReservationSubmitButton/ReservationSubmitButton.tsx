// ReservationSubmitButton.js
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../state/slices/user/userSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
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
}

const ReservationSubmitButton = ({ formData, reservationData }: ReservationSubmitButtonProps) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
        dispatch(updateUser(dataToSend));
        window.location.reload();
        console.log("Successfull reservation!");
      } else {
        console.log("error res not ok");
      }
    } catch (error) {
      console.log("error catch: " + error);
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
