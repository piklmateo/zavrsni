import React, { useState, useEffect } from "react";
import ReservationSubmitButton from "../ReservationSubmitButton/ReservationSubmitButton";
import LeftArrow from "../../../assets/images/left-arrow.svg";
import RightArrow from "../../../assets/images/right-arrow.svg";
import { maxDate, today } from "../../../helpers/dateTimeFormat";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../state/slices/user/userSlice";
import { fetchTables } from "../../../state/slices/table/tableSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReservationForm.css";
import { AppDispatch, RootState } from "../../../state/store/store";
import {
  fetchBookedDates,
  fetchBookedTables,
  fetchBookedTime,
  fetchReservations,
} from "../../../state/slices/reservations/reservationsSlice";
import ClockLoader from "react-spinners/ClockLoader";

const ReservationForm = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.user[0]);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);

  const tableList = useSelector((state: RootState) => state.table.table);
  const tableStatus = useSelector((state: RootState) => state.table.status);
  const tableError = useSelector((state: RootState) => state.table.error);

  const bookedDatesList = useSelector((state: RootState) => state.reservations.bookedDates);
  const bookedDatesStatus = useSelector((state: RootState) => state.reservations.status);
  const bookedDatesError = useSelector((state: RootState) => state.reservations.error);

  const bookedTimeList = useSelector((state: RootState) => state.reservations.bookedTime);
  const bookedTimeStatus = useSelector((state: RootState) => state.reservations.status);
  const bookedTimeError = useSelector((state: RootState) => state.reservations.error);

  const bookedTableList = useSelector((state: RootState) => state.reservations.bookedTable);
  const bookedTableStatus = useSelector((state: RootState) => state.reservations.status);
  const bookedTableError = useSelector((state: RootState) => state.reservations.error);

  const [blockedDatesState, setBlockedDatesState] = useState([]);
  const [blockedTimesState, setBlockedTimesState] = useState([]);
  const [blockedTablesState, setBlockedTablesState] = useState([]);
  const [isTimePickedState, setIsTimePickedState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    if (userStatus === "idle" || tableStatus === "idle" || bookedDatesStatus === "idle") {
      dispatch(fetchUserData());
      dispatch(fetchTables());
      dispatch(fetchReservations());
      dispatch(fetchBookedDates());
    }
  }, [userStatus, tableStatus, bookedDatesStatus, dispatch]);

  useEffect(() => {
    if (userList) {
      setFormData({
        name: userList.name || "",
        email: userList.email || "",
        phone: userList.phone || "",
      });
    }
  }, [userList]);

  useEffect(() => {
    if (bookedDatesList.length > 0) {
      const blockedDatesArray = bookedDatesList.map((reservation) => new Date(reservation.date));
      setBlockedDatesState(blockedDatesArray);
    }

    if (bookedTimeList.length > 0) {
      const blockedTimesArray = bookedTimeList.map((reservation) => reservation.time_slot);
      setBlockedTimesState(blockedTimesArray);
      console.log("Blocked times:", JSON.stringify(blockedTimesArray));
    } else {
      setBlockedTimesState(bookedDatesList);
    }

    if (bookedTableList.length > 0) {
      const blockedTablesArray = bookedTableList.map((reservation) => reservation.table_id);
      setBlockedTablesState(blockedTablesArray);
      console.log("Blocked tables:", JSON.stringify(blockedTablesArray));
    } else {
      setBlockedTablesState(bookedTableList);
    }
  }, [bookedDatesList, bookedTimeList, bookedTableList]);

  useEffect(() => {
    if (
      userStatus === "loading" ||
      tableStatus === "loading" ||
      bookedDatesStatus === "loading" ||
      bookedTimeStatus === "loading" ||
      bookedTableStatus === "loading"
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [userStatus, tableStatus, bookedDatesStatus, bookedTimeStatus, bookedTableStatus]);

  if (
    userStatus === "failed" ||
    tableStatus === "failed" ||
    bookedDatesStatus === "failed" ||
    bookedTimeStatus === "failed" ||
    bookedTableStatus === "failed"
  ) {
    return <div>Error: {userError || tableError || bookedDatesError || bookedTimeError || bookedTableError}</div>;
  }

  const handleDateChange = (date: Date) => {
    setReservationData((prevState: any) => ({
      ...prevState,
      date: date,
    }));

    const formattedDate = date.toISOString().split("T")[0];
    dispatch(fetchBookedTime(formattedDate));
    setStep(2);
  };

  const handleTimeChange = (event: React.MouseEvent<HTMLButtonElement>, time: string) => {
    event.preventDefault();
    setReservationData((prevState: any) => ({
      ...prevState,
      time: time,
    }));

    const date = new Date(reservationData.date);
    const formattedDate = date.toISOString().split("T")[0];
    dispatch(fetchBookedTables({ date: formattedDate, time: time }));
    setIsTimePickedState(true);
  };

  const handleTableChange = (event: React.MouseEvent<HTMLButtonElement>, table_id: string) => {
    event.preventDefault();
    setReservationData((prevState: any) => ({
      ...prevState,
      table_id: table_id,
    }));
    setStep(3);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, stateKey: string) => {
    event.preventDefault();
    const value = event.target.value;

    setFormData((prevState: any) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };

  return (
    <div className="main__layout__container">
      <div className="reservation__form__wrapper">
        {isLoading ? (
          <div className="loader__container">
            <ClockLoader color="var(--clr-primary)" size={100} />
          </div>
        ) : (
          <>
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
                    selected={new Date(today)}
                    onChange={handleDateChange}
                    minDate={today}
                    maxDate={maxDate}
                    excludeDates={blockedDatesState}
                    inline
                  />
                </div>
              )}
              {step === 2 && (
                <>
                  <div className="reservation__select-time">
                    <div>
                      <h3>Select time</h3>
                    </div>
                    <div className="reservation__select__container">
                      {["12:00:00", "13:30:00", "15:00:00", "16:30:00", "18:00:00", "19:30:00", "21:00:00"]
                        .filter((time) => !blockedTimesState.includes(time))
                        .map((time) => {
                          const [hour, minute] = time.split(":");
                          const formattedTime = `${hour}:${minute}`;
                          return (
                            <button
                              className="btn__reservation__select"
                              key={time}
                              value={time}
                              onClick={(event) => handleTimeChange(event, time)}
                            >
                              {formattedTime}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                  {isTimePickedState && (
                    <div className="reservation__select-people">
                      <div>
                        <h3>Select amount of people</h3>
                      </div>
                      <div className="reservation__select__container">
                        {tableList
                          .filter((table) => !blockedTablesState.includes(table.id_table))
                          .map((table) => (
                            <button
                              className="btn__reservation__select"
                              key={table.id_table}
                              value={table.id_table.toString()}
                              onClick={(event) => handleTableChange(event, table.id_table.toString())}
                            >
                              {table.quantity}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
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
                      onChange={(event) => handleInputChange(event, "name")}
                      required
                      {...(isLoggedIn && { disabled: true })}
                    />
                  </div>
                  <div className="input__phone">
                    <label htmlFor="phone">Phone(optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={(event) => handleInputChange(event, "phone")}
                      {...(isLoggedIn && { disabled: true })}
                    />
                  </div>
                  <div className="input__email">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={(event) => handleInputChange(event, "email")}
                      required
                      {...(isLoggedIn && { disabled: true })}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
