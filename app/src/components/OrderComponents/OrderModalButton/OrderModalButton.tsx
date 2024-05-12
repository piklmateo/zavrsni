import React from "react";

interface OrderModalProps {
  openModal: () => void;
}

const OrderModalButton = ({ openModal }: OrderModalProps) => {
  return (
    <button className="btn btn__order" onClick={openModal}>
      Show order
    </button>
  );
};

export default OrderModalButton;
