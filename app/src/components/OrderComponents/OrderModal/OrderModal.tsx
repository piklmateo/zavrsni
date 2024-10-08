import React from "react";
import Modal from "react-modal";
import { OrderItem, Dish, Drink } from "../../../state/slices/order/orderSlice";
import "./OrderModal.css";
import { CSSProperties } from "react";

interface OrderModalProps {
  isOpen: boolean;
  closeModal: () => void;
  order: OrderItem[];
}

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
    maxHeight: "600px",
    overflowY: "scroll" as CSSProperties["overflowY"],
  },
};

const OrderModal = ({ isOpen, closeModal, order }: OrderModalProps) => {
  const calculateBill = () => {
    let totalBill = 0;
    for (const item of order) {
      if (item.totalPrice !== undefined) {
        totalBill += item.totalPrice;
        console.log("totalPrice od itema: " + item.totalPrice);
      }
    }
    return totalBill;
  };

  const bill = calculateBill();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Order"
      ariaHideApp={false}
      appElement={document.getElementById("root") as HTMLElement}
      style={customStyles}
    >
      <div className="order__modal__container">
        {order.map((orderItem) => (
          <div
            key={(orderItem as Dish).id_dish || (orderItem as Drink).id_drink}
          >
            <div className="order__modal__info">
              <div className="order__modal__info-left">
                <h2>{orderItem.name}</h2>
                <p>{orderItem.category_name}</p>
              </div>
              <div className="order__modal__info-right">
                <p>X{orderItem.quantity}</p>
                <p>{orderItem.price} €</p>
              </div>
            </div>
          </div>
        ))}
        <div className="order__modal__bill">
          <p>Total: {bill} €</p>
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
