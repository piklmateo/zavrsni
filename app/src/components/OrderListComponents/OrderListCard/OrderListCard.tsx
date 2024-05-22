import React, { useEffect, useState } from "react";
import { formatDateTime } from "../../../helpers/dateTimeFormat";
import "./OrderListCard.css";

interface Order {
  id_order: number;
  date: string;
  status: string;
  dish_id: number | null;
  dish_name: string | null;
  dish_quantity: number | null;
  drink_id: number | null;
  drink_name: string | null;
  drink_quantity: number | null;
}

interface OrderListCardProps {
  orders: Order[];
}

const OrderListCard = ({ orders }: OrderListCardProps) => {
  const { id_order, date, status } = orders[0];

  const [orderStatus, setOrderStatus] = useState(status);

  const handleOrderStatus = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.log("You don't have a valid token");
        return;
      }

      let newStatus = "";
      if (orderStatus === "pending") {
        newStatus = "preparing";
      } else if (orderStatus === "preparing") {
        newStatus = "done";
      } else if (orderStatus === "done") {
        newStatus = "served";
      }

      console.log("novi status: " + newStatus);

      const res = await fetch(`zavrsni-server-git-main-mateos-projects-26cbfc3e.vercel.app/api/orders/status/${id_order}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        console.log("Unable to update order status");
        return;
      }

      setOrderStatus(newStatus);
      window.location.reload();
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
            className={`btn ${orderStatus === "pending" ? "btn__order__pending" : orderStatus === "preparing" ? "btn__order__preparing" : "btn__order__done"}`}
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
