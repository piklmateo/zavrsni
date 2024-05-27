import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Reservation,
  fetchBookedDates,
  fetchBookedTime,
} from "../../../state/slices/reservations/reservationsSlice";
import { AppDispatch, RootState } from "../../../state/store/store";
import { maxDate, today } from "../../../helpers/dateTimeFormat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../ReservationForm/ReservationForm.css";

interface ReservationDatePickerProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  reservationData: Reservation;
  setReservationData: React.Dispatch<React.SetStateAction<Reservation>>;
}

const ReservationDatePicker = ({
  setStep,
  reservationData,
  setReservationData,
}: ReservationDatePickerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookedDatesList = useSelector(
    (state: RootState) => state.reservations.bookedDates
  );
  const bookedDatesStatus = useSelector(
    (state: RootState) => state.reservations.status
  );
  const bookedDatesError = useSelector(
    (state: RootState) => state.reservations.error
  );

  const [blockedDatesState, setBlockedDatesState] = useState([]);

  useEffect(() => {
    console.log("status: " + bookedDatesStatus);
    console.log("status plus " + 5);
    console.log("status zarez ", 5);
    if (bookedDatesStatus === "idle") {
      setTimeout(() => {
        dispatch(fetchBookedDates());
      }, 0);
    }
  }, [bookedDatesStatus, dispatch]);

  if (bookedDatesStatus === "failed") {
    return <div>Error: {bookedDatesError}</div>;
  }

  useEffect(() => {
    if (bookedDatesList.length > 0) {
      const blockedDatesArray = bookedDatesList.map(
        (reservation) => new Date(reservation.date)
      );
      setBlockedDatesState(blockedDatesArray);
    }
  }, [bookedDatesList]);

  const handleDateChange = (date: Date) => {
    setReservationData((prevState: any) => ({
      ...prevState,
      date: date,
    }));

    const formattedDate = date.toISOString().split("T")[0];
    dispatch(fetchBookedTime(formattedDate));
    setStep(2);
  };

  return (
    <DatePicker
      selected={new Date(reservationData.date)}
      onChange={handleDateChange}
      minDate={today}
      maxDate={maxDate}
      excludeDates={blockedDatesState}
      inline
    />
  );
};

export default ReservationDatePicker;
