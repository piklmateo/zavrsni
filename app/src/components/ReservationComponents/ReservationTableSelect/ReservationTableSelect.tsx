import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Reservation } from "../../../state/slices/reservations/reservationsSlice";
import { AppDispatch, RootState } from "../../../state/store/store";
import { maxDate, today } from "../../../helpers/dateTimeFormat";
import "../ReservationForm/ReservationForm.css";
import { Table } from "../../../state/slices/table/tableSlice";

interface ReservationTableListProps {
  setReservationData: React.Dispatch<React.SetStateAction<Reservation>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  tableList: Table[];
}

const ReservationTableSelect = ({
  setReservationData,
  setStep,
  tableList,
}: ReservationTableListProps) => {
  const bookedTableList = useSelector(
    (state: RootState) => state.reservations.bookedTable
  );
  const bookedTableStatus = useSelector(
    (state: RootState) => state.reservations.status
  );
  const bookedTableError = useSelector(
    (state: RootState) => state.reservations.error
  );
  const [blockedTablesState, setBlockedTablesState] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    if (bookedTableList.length > 0) {
      const blockedTablesArray = bookedTableList.map(
        (reservation) => reservation.table_id
      );
      setBlockedTablesState(blockedTablesArray);
      console.log("Blocked tables:", JSON.stringify(blockedTablesArray));
    } else {
      setBlockedTablesState(bookedTableList);
    }
  }, [bookedTableList]);

  if (bookedTableStatus === "failed") {
    return <div>Error: {bookedTableError}</div>;
  }

  const handleTableChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    table_id: number
  ) => {
    event.preventDefault();
    setReservationData((prevState: any) => ({
      ...prevState,
      table_id: table_id,
    }));
    setStep(3);
    setSelectedTable(table_id);
  };

  return (
    <>
      <div>
        <h3>Select amount of people</h3>
      </div>
      <div className="reservation__select__container">
        {tableList
          .filter((table) => !blockedTablesState.includes(table.id_table))
          .map((table) => (
            <button
              className={
                selectedTable === table.id_table
                  ? "btn__reservation__select-active"
                  : "btn__reservation__select"
              }
              key={table.id_table}
              value={table.id_table.toString()}
              onClick={(event) => handleTableChange(event, table.id_table)}
            >
              {table.quantity}
            </button>
          ))}
      </div>
    </>
  );
};

export default ReservationTableSelect;
