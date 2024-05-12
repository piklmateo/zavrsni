//MOZDA HANDLECHANGE PUCA

import React, { useState, useEffect } from "react";
import ReservationSubmitButton from "../ReservationSubmitButton/ReservationSubmitButton";
import LeftArrow from "../../../assets/images/left-arrow.svg";
import RightArrow from "../../../assets/images/right-arrow.svg";
import { today } from "../../../helpers/dateTimeFormat";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../state/slices/user/userSlice";
import { fetchTables } from "../../../state/slices/table/tableSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReservationForm.css";
import { AppDispatch, RootState } from "../../../state/store/store";

const ReservationForm = () => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.user[0]);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const tableList = useSelector((state: RootState) => state.table.table);
  const tableStatus = useSelector((state: RootState) => state.table.status);

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
    whole_day: "no",
  });

  useEffect(() => {
    if (userStatus === "idle" || tableStatus === "idle") {
      dispatch(fetchUserData());
      dispatch(fetchTables());
    }
  }, [userStatus, tableStatus, dispatch]);

  useEffect(() => {
    if (userList) {
      setFormData({
        name: userList.name || "",
        email: userList.email || "",
        phone: userList.phone || "",
      });
    }
  }, [userList]);

  if (userStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (userStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleDateChange = (date: Date) => {
    setReservationData((prevState: any) => ({
      ...prevState,
      date: date,
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    stateSetter: React.Dispatch<React.SetStateAction<any>>,
    stateKey: string
  ) => {
    const { value } = event.target;
    stateSetter((prevState: any) => ({
      ...prevState,
      [stateKey]: value,
    }));
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
        <form className="form">
          {step === 1 && (
            <div className="input__date">
              <DatePicker
                selected={new Date(reservationData.date)}
                onChange={handleDateChange}
                minDate={today}
                inline
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
                  onChange={(event) => handleInputChange(event, setReservationData, "time")}
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
                  onChange={(event) => handleInputChange(event, setReservationData, "table_id")}
                  required
                >
                  {tableList.map((table) => (
                    <option key={table.id_table} value={table.id_table}>
                      {table.quantity}
                    </option>
                  ))}
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
                  onChange={(event) => handleInputChange(event, setFormData, "name")}
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
                  onChange={(event) => handleInputChange(event, setFormData, "phone")}
                />
              </div>
              <div className="input__email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(event) => handleInputChange(event, setFormData, "email")}
                  required
                />
              </div>
              <div>
                <ReservationSubmitButton formData={formData} reservationData={reservationData} />
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
