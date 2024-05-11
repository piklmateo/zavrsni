import React, { useEffect, useState } from "react";
import { formatDateTime } from "../../../helpers/dateTimeFormat";
import "./OrderListCard.css";

const OrderListCard = ({ orders }) => {
  const { id_order, date, status } = orders[0];

  const [orderStatus, setOrderStatus] = useState(status);

  const handleOrderStatus = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.log("You don't have a valid token");
      }

      let newStatus;
      if (orderStatus === "pending") {
        newStatus = "preparing";
      } else if (orderStatus === "preparing") {
        newStatus = "done";
      }

      setOrderStatus(newStatus);

      const res = await fetch(
        "http://localhost:12413/api/orders/status/" + id_order,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        console.log("Unable to update order status");
      }
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  };

  return (
    <div className="order__list__card">
      <div className="order__card__info">
        <div>
          <p>Order ID: {id_order}</p>
          <p>Date: {formatDateTime(date)}</p>
        </div>
        <div>
          <button
            onClick={handleOrderStatus}
            className={`btn ${
              orderStatus === "pending"
                ? "btn__order__pending"
                : orderStatus === "preparing"
                ? "btn__order__preparing"
                : "btn__order__done"
            }`}
          >
            {status}
          </button>
        </div>
      </div>
      <div className="order__card__content">
        {orders.map((order) => (
          <div key={order.dish_id || order.drink_id}>
            {order.dish_id && (
              <div className="order__item">
                <p>{order.dish_name}</p>
                <p>X{order.dish_quantity}</p>
              </div>
            )}
            {order.drink_id && (
              <div className="order__item">
                <p>{order.drink_name}</p>
                <p>X{order.drink_quantity}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderListCard;
