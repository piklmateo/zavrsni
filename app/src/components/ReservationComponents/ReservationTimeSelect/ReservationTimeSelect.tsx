import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Reservation,
  fetchBookedTables,
} from "../../../state/slices/reservations/reservationsSlice";
import { AppDispatch, RootState } from "../../../state/store/store";
import "../ReservationForm/ReservationForm.css";

interface ReservationTimeSelectProps {
  reservationData: Reservation;
  setReservationData: React.Dispatch<React.SetStateAction<Reservation>>;
  setIsTimePickedState: React.Dispatch<React.SetStateAction<boolean>>;
  isTimePickedState: boolean;
}

const ReservationTimeSelect = ({
  reservationData,
  setReservationData,
  setIsTimePickedState,
  isTimePickedState,
}: ReservationTimeSelectProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookedTimeList = useSelector(
    (state: RootState) => state.reservations.bookedTime
  );
  const bookedTimeStatus = useSelector(
    (state: RootState) => state.reservations.status
  );
  const bookedTimeError = useSelector(
    (state: RootState) => state.reservations.error
  );

  const [blockedTimesState, setBlockedTimesState] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(null);

  useEffect(() => {
    if (bookedTimeList.length > 0) {
      const blockedTimesArray = bookedTimeList.map(
        (reservation) => reservation.time_slot
      );
      setBlockedTimesState(blockedTimesArray);
      console.log("Blocked times:", JSON.stringify(blockedTimesArray));
    } else {
      setBlockedTimesState([]);
    }
  }, [bookedTimeList]);

  if (bookedTimeStatus === "failed") {
    return <div>Error: {bookedTimeError}</div>;
  }

  const handleTimeChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    time: string
  ) => {
    event.preventDefault();
    setReservationData((prevState: any) => ({
      ...prevState,
      time: time,
    }));

    const date = new Date(reservationData.date);
    const formattedDate = date.toISOString().split("T")[0];
    dispatch(fetchBookedTables({ date: formattedDate, time: time }));
    setIsTimePickedState(true);
    setSelectedTimeSlot(time);
  };

  return (
    <>
      <div>
        <h3>Select time</h3>
      </div>
      <div className="reservation__select__container">
        {[
          "12:00:00",
          "13:30:00",
          "15:00:00",
          "16:30:00",
          "18:00:00",
          "19:30:00",
          "21:00:00",
        ]
          .filter((time) => !blockedTimesState.includes(time))
          .map((time) => {
            const [hour, minute] = time.split(":");
            const formattedTime = `${hour}:${minute}`;
            return (
              <button
                className={
                  selectedTimeSlot === time
                    ? "btn__reservation__select-active"
                    : "btn__reservation__select"
                }
                key={time}
                value={time}
                onClick={(event) => handleTimeChange(event, time)}
              >
                {formattedTime}
              </button>
            );
          })}
      </div>
    </>
  );
};

export default ReservationTimeSelect;
