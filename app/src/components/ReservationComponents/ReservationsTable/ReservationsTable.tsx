import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservationsStandard, fetchReservationsWholeDay } from "../../../state/slices/reservations/reservationsSlice";
import { formatDate, formatTime } from "../../../helpers/dateTimeFormat";
import "./ReservationsTable.css";
import { AppDispatch, RootState } from "../../../state/store/store";
import Pagination from "../../Pagination/Pagination";

const ReservationsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservationList = useSelector((state: RootState) => state.reservations.reservationsStandard);
  const specialReservationsList = useSelector((state: RootState) => state.reservations.specialReservations);
  const status = useSelector((state: RootState) => state.reservations.status);
  const error = useSelector((state: RootState) => state.reservations.error);

  const [currentPageStandard, setCurrentPageStandard] = useState<number>(1);

  const [currentPageSpecial, setCurrentPageSpecial] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchReservationsStandard());
    dispatch(fetchReservationsWholeDay());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const totalItemsStandard = reservationList.length;
  const totalItemsSpecial = specialReservationsList.length;

  const paginatedReservations = reservationList.slice(
    (currentPageStandard - 1) * pageSize,
    currentPageStandard * pageSize
  );
  const paginatedSpecialReservations = specialReservationsList.slice(
    (currentPageSpecial - 1) * pageSize,
    currentPageSpecial * pageSize
  );

  return (
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
            {paginatedReservations.map((reservation) => (
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
        <Pagination
          currentPage={currentPageStandard}
          totalItems={totalItemsStandard}
          pageSize={pageSize}
          onPageChange={setCurrentPageStandard}
        />
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
            {paginatedSpecialReservations.map((reservation) => (
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
        <Pagination
          currentPage={currentPageSpecial}
          totalItems={totalItemsSpecial}
          pageSize={pageSize}
          onPageChange={setCurrentPageSpecial}
        />
      </div>
    </div>
  );
};

export default ReservationsTable;
