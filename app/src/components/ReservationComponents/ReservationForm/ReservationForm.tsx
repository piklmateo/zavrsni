import React, { useState, useEffect } from "react";
import ReservationSubmitButton from "../ReservationSubmitButton/ReservationSubmitButton";
import LeftArrow from "../../../assets/images/left-arrow.svg";
import RightArrow from "../../../assets/images/right-arrow.svg";
import { today } from "../../../helpers/dateTimeFormat";
import { useDispatch, useSelector } from "react-redux";
import { User, fetchUserData } from "../../../state/slices/user/userSlice";
import { fetchTables } from "../../../state/slices/table/tableSlice";
import "react-datepicker/dist/react-datepicker.css";
import "./ReservationForm.css";
import { AppDispatch, RootState } from "../../../state/store/store";
import { Reservation } from "../../../state/slices/reservations/reservationsSlice";
import ClockLoader from "react-spinners/ClockLoader";
import ReservationDatePicker from "../ReservationDatePicker/DatePickerComponent";
import ReservationTimeSelect from "../ReservationTimeSelect/ReservationTimeSelect";
import ReservationTableSelect from "../ReservationTableSelect/ReservationTableSelect";
import ReservationUserInput from "../ReservationUserInput/ReservationUserInput";

const ReservationForm = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const tableList = useSelector((state: RootState) => state.table.table);
  const tableStatus = useSelector((state: RootState) => state.table.status);
  const tableError = useSelector((state: RootState) => state.table.error);

  const [isTimePickedState, setIsTimePickedState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<User>({
    id_user: null,
    name: "",
    surname: "",
    email: "",
    phone: "",
    username: "",
    role_id: null,
  });

  const [reservationData, setReservationData] = useState<Reservation>({
    id_reservation: null,
    date: new Date(today),
    time: "12:00:00",
    table_id: 2,
    user_id: null,
    whole_day: "no",
    email: "",
    name: "",
    phone: "",
    table_number: 0,
    time_slot: "",
  });

  useEffect(() => {
    if (tableStatus === "idle") {
      dispatch(fetchTables());
    }
  }, [tableStatus, dispatch]);

  useEffect(() => {
    if (tableStatus === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [tableStatus]);

  if (tableStatus === "failed") {
    return <div>Error: {tableError}</div>;
  }

  return (
    <div className="main__layout__container">
      <div className="reservation__form__wrapper">
        {isLoading ? (
          <div className="loader__container">
            <ClockLoader color="var(--clr-primary)" size={100} />
          </div>
        ) : (
          <>
            <h1>Reservation</h1>
            <div className="step__indicator">
              <div className={`step__line ${step >= 1 ? "step__active" : ""}`}></div>
              <div className={`step__line ${step >= 2 ? "step__active" : ""}`}></div>
              <div className={`step__line ${step >= 3 ? "step__active" : ""}`}></div>
            </div>
            <form className="form">
              {step === 1 && (
                <div className="input__date">
                  <ReservationDatePicker
                    setStep={setStep}
                    reservationData={reservationData}
                    setReservationData={setReservationData}
                  />
                </div>
              )}
              {step === 2 && (
                <>
                  <div className="reservation__select-time">
                    <ReservationTimeSelect
                      reservationData={reservationData}
                      setReservationData={setReservationData}
                      setIsTimePickedState={setIsTimePickedState}
                    />
                  </div>
                  {isTimePickedState && (
                    <div className="reservation__select-people">
                      <ReservationTableSelect
                        setReservationData={setReservationData}
                        setStep={setStep}
                        tableList={tableList}
                      />
                    </div>
                  )}
                </>
              )}
              {step === 3 && (
                <>
                  <ReservationUserInput formData={formData} setFormData={setFormData} />
                  <div>
                    <ReservationSubmitButton formData={formData} reservationData={reservationData} />
                  </div>
                </>
              )}
            </form>
            <div className="navigation__buttons">
              {step !== 1 && (
                <div>
                  <button className="navigation__btn" onClick={() => setStep(step - 1)}>
                    <img alt="arrow-back" src={LeftArrow} width={40} height={40} />
                  </button>
                </div>
              )}
              {step !== 3 && (
                <div>
                  <button className="navigation__btn" onClick={() => setStep(step + 1)}>
                    <img alt="arrow-next" src={RightArrow} width={40} height={40} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
