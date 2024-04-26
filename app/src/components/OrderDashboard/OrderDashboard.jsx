import React, { useState } from "react";
import NewMenuItem from "../NewMenuItem/NewMenuItem.jsx";
import MenuFilter from "../MenuFilter/MenuFilter.jsx";
import OrderMenu from "../OrderMenu/OrderMenu.jsx";
import NewOrderAndModal from "../NewOrderAndModal/NewOrderAndModal.jsx";

const OrderDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Main course");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="main__layout__container">
      <h1 className="text__center mbl-2">Order</h1>

      <MenuFilter
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
      />

      <OrderMenu category={selectedCategory} />

      <div className="order__buttons__container">
        <div className="flex-grow-1">
          <NewOrderAndModal />
        </div>
        <div className="flex-grow-1 text-right">
          <NewMenuItem />
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
