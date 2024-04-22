import React, { useEffect, useState } from "react";
import "./ReservationsTable.css";
import { formatDate, formatTime } from "../../helpers/dateTimeFormat.js";

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const jwtToken = sessionStorage.getItem("token");
        const res = await fetch("http://localhost:12413/api/reservations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setReservations(data);
          console.log("Fetched reservations successfully:", data);
        } else {
          console.error("Failed to fetch reservations:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <>
      <div className="main__layout__container">
        <div className="reservations__table__wrapper">
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
              {reservations.map((reservation) => (
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
