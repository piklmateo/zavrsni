import React from "react";

const OrderModalButton = ({ openModal }) => {
  return (
    <button className="btn btn__order" onClick={openModal}>
      Show order
    </button>
  );
};

export default OrderModalButton;
