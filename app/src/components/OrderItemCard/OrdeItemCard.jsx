// OrderItem.jsx
import React from "react";
import PlusIcon from "../../assets/images/plus.svg";
import MinusIcon from "../../assets/images/minus.svg";

const OrderItemCard = ({ item, handleRemoveItem, handleAddItem }) => {
  return (
    <div className="order__grid__item" key={item.id_drink || item.id_dish}>
      <div className="order__item__info">
        <div className="order__item__info__text">
          <h3>{item.name}</h3>
          <p>{item.price} €</p>
        </div>
        <div className="order__item__info__button">
          <button className="btn__delete">Delete</button>
        </div>
      </div>
      <div className="order__item__buttons">
        <button
          className="btn btn__minus"
          onClick={() => handleRemoveItem(item)}
        >
          <img src={MinusIcon} alt="minus icon" width={25} height={25} />
        </button>
        <p>{item.quantity}</p>
        <button className="btn btn__plus" onClick={() => handleAddItem(item)}>
          <img alt="plus icon" src={PlusIcon} width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default OrderItemCard;
