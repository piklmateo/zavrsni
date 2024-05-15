import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../../state/slices/user/userSlice";
import { fetchBookedDates } from "../../../../state/slices/reservations/reservationsSlice";
import { maxDate, today } from "../../../../helpers/dateTimeFormat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReservationSubmitButton from "../../ReservationSubmitButton/ReservationSubmitButton";
import { AppDispatch, RootState } from "../../../../state/store/store";
import "./SpecialOccasions.css";

const SpecialOccasions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.user[0]);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const bookedDatesList = useSelector((state: RootState) => state.reservations.bookedDates);
  const bookedDatesStatus = useSelector((state: RootState) => state.reservations.status);
  const bookedDatesError = useSelector((state: RootState) => state.reservations.error);

  const [blockedDates, setBlockedDates] = useState([]);

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
      dispatch(fetchBookedDates());
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

  useEffect(() => {
    if (bookedDatesList.length > 0) {
      const blockedDatesArray = bookedDatesList.map((reservation) => new Date(reservation.date));
      setBlockedDates(blockedDatesArray);
    }
  }, [bookedDatesList]);

  if (status === "loading" || bookedDatesStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" || bookedDatesError === "failed") {
    return <div>Error: {error || bookedDatesError}</div>;
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
    <>
      <div className="main__layout__container">
        <h1 className="text__center mbl-2">Special occasions</h1>
        <div className="special__occasions__container">
          <div className="calendar__heading__container">
            <div className="calendar__heading">
              <h2>To reserve the restaurant</h2>
              <h2>
                for your <span className="emphasized">special</span> occasion
              </h2>
              <p>Simply select an available date</p>
              <p>and provide your contact information</p>
            </div>
            <div className="calendar__container">
              <DatePicker
                onChange={handleDateChange}
                minDate={today}
                maxDate={maxDate}
                excludeDates={blockedDates}
                inline
              />
            </div>
          </div>
          <div className="form__container">
            <form>
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
              <ReservationSubmitButton formData={formData} reservationData={reservationData} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialOccasions;
