import React from "react";
import { Link } from "react-router-dom";
import "./NewOrderAndModal.css";

const NewOrderAndModal = ({ openModal }) => {
  return (
    <>
      <div className="menu__item__buttons">
        <button className="btn btn__order" onClick={openModal}>
          Show order
        </button>
      </div>
    </>
  );
};

export default NewOrderAndModal;
