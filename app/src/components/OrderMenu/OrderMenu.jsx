import React, { useEffect, useState } from "react";
import { fetchDishes } from "../../state/slices/dish/dishSlice.js";
import { fetchDrinks } from "../../state/slices/drink/drinkSlice.js";
import { useDispatch, useSelector } from "react-redux";
import PlusIcon from "../../assets/images/plus.svg";
import MinusIcon from "../../assets/images/minus.svg";
import OrderModal from "../OrderModal/OrderModal.jsx";
import { addItem, removeItem } from "../../state/slices/order/orderSlice.js";
import "./OrderMenu.css";

const OrderMenu = ({ category }) => {
  const dispatch = useDispatch();
  const dishList = useSelector((state) => state.dish.dish);
  const dishStatus = useSelector((state) => state.dish.status);
  const dishError = useSelector((state) => state.dish.error);
  const drinkList = useSelector((state) => state.drink.drink);
  const drinkStatus = useSelector((state) => state.drink.status);
  const drinkError = useSelector((state) => state.drink.error);

  const order = useSelector((state) => state.order);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddItem = (item) => {
    const id = item.id_dish || item.id_drink;
    dispatch(addItem({ ...item, id }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  useEffect(() => {
    if (dishStatus === "idle" && drinkStatus === "idle") {
      dispatch(fetchDishes());
      dispatch(fetchDrinks());
    }
  }, [drinkStatus, dishStatus, dispatch]);

  if (dishStatus === "loading" && drinkStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (dishStatus === "failed" && drinkStatus === "failed") {
    return <div>Error: {dishError || drinkError}</div>;
  }

  const getMenuItemsWithQuantity = () => {
    const combinedMenuItems = [...drinkList, ...dishList];
    const quantities = {};
    order.forEach((orderItem) => {
      const itemId = orderItem.id_dish || orderItem.id_drink;
      if (quantities[itemId]) {
        quantities[itemId] += orderItem.quantity;
      } else {
        quantities[itemId] = orderItem.quantity;
      }
    });
    return combinedMenuItems.map((item) => ({
      ...item,
      quantity: quantities[item.id_dish || item.id_drink] || 0,
    }));
  };

  const menuItems = getMenuItemsWithQuantity().filter(
    (item) => item.category_name === category
  );

  return (
    <div className="order__menu__container">
      <div className="order__item__heading">
        <h1>{category}</h1>
      </div>
      <div className="order__grid">
        {menuItems.map((item) => (
          <div
            className="order__grid__item"
            key={item.id_drink || item.id_dish}
          >
            <div className="order__item__info">
              <div className="order__item__info__text">
                <h3>{item.name}</h3>
                <p>{item.price} €</p>
              </div>
              <div className="order__item__info__button">
                <button className="btn__delete" onClick={openModal}>
                  Delete
                </button>
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
              <button
                className="btn btn__plus"
                onClick={() => handleAddItem(item)}
              >
                <img alt="plus icon" src={PlusIcon} width={25} height={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <OrderModal isOpen={modalIsOpen} closeModal={closeModal} order={order} />
    </div>
  );
};

export default OrderMenu;
