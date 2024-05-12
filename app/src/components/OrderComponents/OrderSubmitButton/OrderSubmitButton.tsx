import React from "react";
import { useDispatch } from "react-redux";
import { clear } from "../../../state/slices/order/orderSlice";
import useOrder from "../../../hooks/order/useOrder";
import { insertOrder, insertOrderDish, insertOrderDrink } from "../../../hooks/order/orderUtils";
import { todayTimestamp } from "../../../helpers/dateTimeFormat";
import { AppDispatch } from "../../../state/store/store";
import { OrderItem, Dish, Drink } from "../../../state/slices/order/orderSlice";

const OrderSubmitButton = () => {
  const order = useOrder();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmitOrder = async () => {
    try {
      let totalBill = 0;
      for (const item of order) {
        if (item.totalPrice !== undefined) {
          totalBill += item.totalPrice;
          console.log("totalPrice od itema: " + item.totalPrice);
        }
      }

      const orderData = {
        date: todayTimestamp,
        bill: totalBill,
        table_id: 1,
      };

      const orderId = await insertOrder(orderData);
      console.log("order id: " + orderId);
      if (!orderId) {
        console.log("Error: Failed to insert order");
        return;
      }

      for (const item of order) {
        if ((item as Dish).id_dish) {
          const dishData = {
            order_id: orderId,
            dish_id: (item as Dish).id_dish,
            quantity: item.quantity,
          };
          await insertOrderDish(dishData);
          console.log("DISH DATA: " + JSON.stringify(dishData));
        }
      }

      for (const item of order) {
        if ((item as Drink).id_drink) {
          const drinkData = {
            order_id: orderId,
            drink_id: (item as Drink).id_drink,
            quantity: item.quantity,
          };
          await insertOrderDrink(drinkData);
          console.log("DRINK DATA: " + JSON.stringify(drinkData));
        }
      }

      console.log("Order submitted successfully!");
      dispatch(clear());
      window.location.reload();
    } catch (error) {
      console.log("Error submitting order: ", error);
    }
  };

  return (
    <button className="btn btn__order" onClick={onSubmitOrder}>
      Order
    </button>
  );
};

export default OrderSubmitButton;
