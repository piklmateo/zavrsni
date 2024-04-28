import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../state/slices/order/orderSlice.js";
import OrderModal from "../OrderModal/OrderModal.jsx";
import OrderItemCard from "../OrderItemCard/OrdeItemCard.jsx";
import useMenuItems from "../../hooks/order/useMenuItems.js";
import useOrder from "../../hooks/order/useOrder.js";
import "./OrderMenu.css";
import OrderSubmitButton from "../OrderSubmitButton/OrderSubmitButton.jsx";

const OrderMenu = ({ category }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { dishList, dishStatus, drinkList, drinkStatus } = useMenuItems();
  const order = useOrder();
  const dispatch = useDispatch();

  //MODAL
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  //MENU ITEMS
  const handleAddItem = (item) => {
    const id = item.id_dish || item.id_drink;
    dispatch(addItem({ ...item, id }));
  };
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

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
          <OrderItemCard
            key={item.id_drink || item.id_dish}
            item={item}
            handleRemoveItem={handleRemoveItem}
            handleAddItem={handleAddItem}
            openModal={openModal}
          />
        ))}
      </div>
      <OrderSubmitButton />
      <OrderModal isOpen={modalIsOpen} closeModal={closeModal} order={order} />
    </div>
  );
};

export default OrderMenu;