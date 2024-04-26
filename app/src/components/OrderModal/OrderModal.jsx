import React from "react";
import Modal from "react-modal";
import "./OrderModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "575px",
  },
};

const OrderModal = ({ isOpen, closeModal, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Order"
      style={customStyles}
    >
      <div className="order__modal__container">
        <div className="order__modal__info">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="order__modal__buttons">
          <button className="btn btn__close" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
