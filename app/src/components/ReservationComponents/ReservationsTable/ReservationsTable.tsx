import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PaginationArguments,
  fetchReservationsStandard,
  fetchReservationsWholeDay,
} from "../../../state/slices/reservations/reservationsSlice";
import { formatDate, formatTime } from "../../../helpers/dateTimeFormat";
import "./ReservationsTable.css";
import { AppDispatch, RootState } from "../../../state/store/store";

const ReservationsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservationList = useSelector((state: RootState) => state.reservations.reservationsStandard);
  const specialReservationsList = useSelector((state: RootState) => state.reservations.specialReservations);
  const status = useSelector((state: RootState) => state.reservations.status);
  const error = useSelector((state: RootState) => state.reservations.error);

  const [page, setPage] = useState<number>(1);
  const pageSize = 2;
  const paginationArgs = {
    pageNumber: page,
    pageSize: pageSize,
  } as PaginationArguments;

  useEffect(() => {
    dispatch(fetchReservationsStandard(paginationArgs));
    dispatch(fetchReservationsWholeDay(paginationArgs));
    setPage(reservationList.length + 1);
  }, [dispatch]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    dispatch(fetchReservationsStandard(paginationArgs));
    dispatch(fetchReservationsWholeDay(paginationArgs));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    dispatch(fetchReservationsStandard(paginationArgs));
    dispatch(fetchReservationsWholeDay(paginationArgs));
  };

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
          <div className="pagination-container">
            {page !== 1 && (
              <button className="btn btn_pagination" onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </button>
            )}

            <div className="pagination-number-container">
              <span>Page</span>
              <span>{page}</span>
            </div>
            {reservationList.length !== 0 && specialReservationsList.length !== 0 && (
              <button className="btn btn_pagination" onClick={handleNextPage}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationsTable;
