import React from "react";
import { formatDateTime } from "../../helpers/dateTimeFormat";
import "./OrderListCard.css";

const OrderListCard = ({ orders }) => {
  // Get the order date and ID from the first order in the list
  const { id_order, date } = orders[0];

  return (
    <div className="order__list__card">
      <div className="order__card__info">
        <p>Order ID: {id_order}</p>
        <p>Date: {formatDateTime(date)}</p>
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
