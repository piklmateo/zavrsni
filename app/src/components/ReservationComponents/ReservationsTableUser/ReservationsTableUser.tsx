import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecialUserReservations,
  fetchUserReservations,
} from "../../../state/slices/reservations/reservationsSlice";
import { formatDate, formatTime } from "../../../helpers/dateTimeFormat";
import "./ReservationsTableUser.css";
import { AppDispatch, RootState } from "../../../state/store/store";
import { Link } from "react-router-dom";

const ReservationsTableUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservationsUserList = useSelector((state: RootState) => state.reservations.userReservations);
  const specialReservationsList = useSelector((state: RootState) => state.reservations.userSpecialReservations);
  const status = useSelector((state: RootState) => state.reservations.status);
  const error = useSelector((state: RootState) => state.reservations.error);

  useEffect(() => {
    dispatch(fetchUserReservations());
    dispatch(fetchSpecialUserReservations());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="main__layout__container">
        {reservationsUserList.length === 0 && specialReservationsList.length === 0 && (
          <div className="empty-reservations-message">
            <h1>No reservations avaliable</h1>
            <h3>Book a table or the restaurant for your special occasion</h3>
            <div className="reservation-page-links">
              <Link className="reservation__link" to={"/reservation"}>
                <button className="btn btn__login">Book a table</button>
              </Link>
              <Link className="reservation__link" to={"/special-occasions"}>
                <button className="btn btn__login">Book the restaurant</button>
              </Link>
            </div>
          </div>
        )}
        <div className="reservations__table__wrapper">
          {reservationsUserList.length !== 0 && (
            <>
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
            </>
          )}

          {specialReservationsList.length !== 0 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationsTableUser;
