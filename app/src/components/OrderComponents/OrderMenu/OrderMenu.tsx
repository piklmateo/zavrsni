import React from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../../state/slices/order/orderSlice";
import OrderItemCard from "../OrderItemCard/OrdeItemCard";
import useMenuItems from "../../../hooks/order/useMenuItems";
import useOrder from "../../../hooks/order/useOrder";
import { OrderItem, Dish, Drink } from "../../../state/slices/order/orderSlice";

import "./OrderMenu.css";

interface OrderMenuProps {
  category: string;
}

const OrderMenu = ({ category }: OrderMenuProps) => {
  const { dishList, dishStatus, drinkList, drinkStatus } = useMenuItems();
  const order = useOrder();
  const dispatch = useDispatch();

  // MENU ITEMS
  const handleAddItem = (item: OrderItem) => {
    dispatch(addItem(item));
    console.log("item: " + JSON.stringify(item));
  };

  const handleRemoveItem = (item: OrderItem) => {
    dispatch(removeItem(item));
  };

  if (dishStatus === "loading" || drinkStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (dishStatus === "failed" || drinkStatus === "failed") {
    return <div>Error: {dishStatus === "failed" ? "Dish error" : "Drink error"}</div>;
  }

  const getMenuItemsWithQuantity = () => {
    const combinedMenuItems = [...drinkList, ...dishList];
    const quantities: { [itemId: string]: number } = {}; // Use string type for itemId
    order.forEach((orderItem) => {
      const itemId: string = "id_dish" in orderItem ? orderItem.id_dish.toString() : orderItem.id_drink.toString();
      quantities[itemId] = (quantities[itemId] || 0) + orderItem.quantity;
    });
    return combinedMenuItems.map((item) => ({
      ...item,
      quantity: quantities["id_dish" in item ? item.id_dish.toString() : item.id_drink.toString()] || 0,
    }));
  };

  const menuItems = getMenuItemsWithQuantity().filter((item) => item.category_name === category);

  return (
    <div className="order__item__container">
      <div className="order__item__heading">
        <h1>{category}</h1>
      </div>
      <div className="order__grid">
        {menuItems.map((item) => (
          <OrderItemCard
            key={(item as Dish).id_dish || (item as Drink).id_drink} // Ensure a unique key for each item
            item={item}
            handleRemoveItem={handleRemoveItem}
            handleAddItem={handleAddItem}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderMenu;
