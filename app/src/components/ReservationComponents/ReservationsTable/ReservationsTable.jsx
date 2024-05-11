import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, fetchReservationsWholeDay } from "../../../state/slices/reservations/reservationsSlice.js";
import { formatDate, formatTime } from "../../../helpers/dateTimeFormat.js";
import "./ReservationsTable.css";

const ReservationsTable = () => {
  const dispatch = useDispatch();
  const reservationList = useSelector((state) => state.reservations.reservations);
  const specialReservationsList = useSelector((state) => state.reservations.specialReservations);
  const status = useSelector((state) => state.reservations.status);
  const error = useSelector((state) => state.reservations.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchReservations());
      dispatch(fetchReservationsWholeDay());
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
          <h1>Standard reservations</h1>
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
              {reservationList.map((reservation) => (
                <tr key={reservation.id_reservation}>
                  <td>{formatDate(reservation.date)}</td>
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
                  <td>{formatDate(reservation.date)}</td>
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

export default ReservationsTable;
