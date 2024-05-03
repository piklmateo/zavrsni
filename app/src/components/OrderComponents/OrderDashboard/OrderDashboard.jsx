// OrderDashboard.jsx
import React, { useState } from "react";
import MenuFilter from "../../MenuComponents/MenuFilter/MenuFilter.jsx";
import OrderMenu from "../OrderMenu/OrderMenu.jsx";
import OrderModalButton from "../OrderModalButton/OrderModalButton.jsx";
import OrderSubmitButton from "../OrderSubmitButton/OrderSubmitButton.jsx";
import OrderModal from "../OrderModal/OrderModal.jsx";
import useOrder from "../../../hooks/order/useOrder.js";
import "./OrderDashboard.css";

const OrderDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Main course");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const order = useOrder();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  //MODAL
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="main__layout__container">
      <h1 className="text__center mbl-2">Order</h1>

      <MenuFilter
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
      />

      <OrderMenu category={selectedCategory} />

      <OrderModal isOpen={modalIsOpen} closeModal={closeModal} order={order} />

      <div className="order__buttons__container">
        <div className="btn__submit__show">
          <OrderSubmitButton />
          <OrderModalButton openModal={openModal} />
        </div>

        <div className="btn__submit__show"></div>
      </div>
    </div>
  );
};

export default OrderDashboard;
