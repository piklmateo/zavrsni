import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reservation } from "../../../state/slices/reservations/reservationsSlice";
import { AppDispatch, RootState } from "../../../state/store/store";
import { maxDate, today } from "../../../helpers/dateTimeFormat";
import { User, fetchUserData } from "../../../state/slices/user/userSlice";
import "../ReservationForm/ReservationForm.css";
import { Table } from "../../../state/slices/table/tableSlice";

interface ReservationUserInputProps {
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  errors: { [key: string]: string };
  serverError: string;
}

const ReservationUserInput = ({ formData, setFormData, errors, serverError }: ReservationUserInputProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.user[0]);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    if (userStatus === "idle") {
      dispatch(fetchUserData());
    }
  }, [userStatus, dispatch]);

  if (userStatus === "failed") {
    return <div>Error: {userError}</div>;
  }

  useEffect(() => {
    if (userList) {
      setFormData({
        id_user: userList.id_user || null,
        name: userList.name || "",
        surname: userList.surname || "",
        email: userList.email || "",
        phone: userList.phone || "",
        username: userList.username || "",
        role_id: userList.role_id || null,
      });
    }
  }, [userList]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, stateKey: string) => {
    event.preventDefault();
    const value = event.target.value;

    setFormData((prevState: any) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };

  return (
    <>
      <div className="input__name">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={(event) => handleInputChange(event, "name")}
          className={errors.name ? "error__input" : ""}
          {...(isLoggedIn && { disabled: true })}
        />
        {errors.name && <div className="error__message">{errors.name}</div>}
      </div>
      <div className="input__phone">
        <label htmlFor="phone">Phone(optional)</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={(event) => handleInputChange(event, "phone")}
          className={errors.phone ? "error__input" : ""}
          {...(isLoggedIn && { disabled: true })}
        />
        {errors.phone && <div className="error__message">{errors.phone}</div>}
      </div>
      <div className="input__email">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={(event) => handleInputChange(event, "email")}
          className={errors.email ? "error__input" : ""}
          {...(isLoggedIn && { disabled: true })}
        />
        {errors.email && <div className="error__message">{errors.email}</div>}
      </div>
    </>
  );
};

export default ReservationUserInput;
