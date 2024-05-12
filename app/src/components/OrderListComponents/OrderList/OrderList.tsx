import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../state/slices/order/orderListSlice";
import OrderListCard from "../OrderListCard/OrderListCard";
import "./OrderList.css";
import { AppDispatch, RootState } from "../../../state/store/store";

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

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderList = useSelector((state: RootState) => state.orderList.orderList);
  const orderStatus = useSelector((state: RootState) => state.orderList.status);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  if (orderStatus === "loading") {
    return <div>Loading...</div>;
  }

  const ordersById: { [key: number]: Order[] } = {};

  orderList.forEach((order) => {
    if (!ordersById[order.id_order]) {
      ordersById[order.id_order] = [];
    }
    ordersById[order.id_order].push(order);
  });
  const ordersByIdArray = Object.values(ordersById);

  return (
    <div className="main__layout__container">
      <div className="order__card__container">
        {ordersByIdArray.map((orders, index) => (
          <OrderListCard key={index} orders={orders} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
