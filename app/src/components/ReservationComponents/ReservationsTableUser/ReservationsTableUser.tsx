import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecialUserReservations,
  fetchUserReservations,
} from "../../../state/slices/reservations/reservationsSlice";
import { formatDate, formatTime } from "../../../helpers/dateTimeFormat";
import "./ReservationsTableUser.css";
import { AppDispatch, RootState } from "../../../state/store/store";

const ReservationsTableUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservationsUserList = useSelector((state: RootState) => state.reservations.userReservations);
  const specialReservationsList = useSelector((state: RootState) => state.reservations.userSpecialReservations);
  const status = useSelector((state: RootState) => state.reservations.status);
  const error = useSelector((state: RootState) => state.reservations.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserReservations());
      dispatch(fetchSpecialUserReservations());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="main__layout__container">
        <div className="reservations__table__wrapper">
          <h1>Reservations</h1>
          <table className="reservations__table">
            <thead>
              <tr>
                <th>
                  <h2>Date</h2>
                </th>
                <th>
                  <h2>Time</h2>
                </th>
                <th>
                  <h2>Table</h2>
                </th>
                <th>
                  <h2>Name</h2>
                </th>
                <th>
                  <h2>Email</h2>
                </th>
                <th>
                  <h2>Phone</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {reservationsUserList.map((reservation) => (
                <tr key={reservation.id_reservation}>
                  <td>{formatDate(reservation.date.toString())}</td>
                  <td>{formatTime(reservation.time)}</td>
                  <td>{reservation.table_number}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Special occasions</h1>
          <table className="reservations__table">
            <thead>
              <tr>
                <th>
                  <h2>Date</h2>
                </th>
                <th>
                  <h2>Time</h2>
                </th>
                <th>
                  <h2>Table</h2>
                </th>
                <th>
                  <h2>Name</h2>
                </th>
                <th>
                  <h2>Email</h2>
                </th>
                <th>
                  <h2>Phone</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {specialReservationsList.map((reservation) => (
                <tr key={reservation.id_reservation}>
                  <td>{formatDate(reservation.date.toString())}</td>
                  <td>{formatTime(reservation.time)}</td>
                  <td>{reservation.table_number}</td>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReservationsTableUser;
