import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../state/slices/order/orderListSlice.js";
import OrderListCard from "../OrderListCard/OrderListCard.jsx";
import "./OrderList.css";

const OrderList = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList.orderList);
  const orderStatus = useSelector((state) => state.orderList.status);
  //   const orderError = useSelector((state) => state.order.error);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  if (orderStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (orderStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const ordersById = {};
  orderList.forEach((order) => {
    if (!ordersById[order.id_order]) {
      ordersById[order.id_order] = [];
    }
    ordersById[order.id_order].push(order);
  });

  // Create OrderListCard for each group of orders
  const orderCards = Object.values(ordersById).map((orders) => (
    <OrderListCard key={orders[0].id_order} orders={orders} />
  ));

  return (
    <div className="main__layout__container">
      <div className="order__card__container">{orderCards}</div>
    </div>
  );
};

export default OrderList;
