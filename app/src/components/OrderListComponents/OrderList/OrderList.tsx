import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../state/slices/order/orderListSlice";
import OrderListCard from "../OrderListCard/OrderListCard";
import "./OrderList.css";
import { AppDispatch, RootState } from "../../../state/store/store";
import Pagination from "../../Pagination/Pagination";

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
  const error = useSelector((state: RootState) => state.orderList.error);

  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [orderStatus, dispatch]);

  if (orderStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (orderStatus === "failed") {
    return <div>Error: {error || "An unknown error occurred"}</div>;
  }

  const ordersById: { [key: number]: Order[] } = {};

  orderList.forEach((order) => {
    if (!ordersById[order.id_order]) {
      ordersById[order.id_order] = [];
    }
    ordersById[order.id_order].push(order);
  });

  const ordersByIdArray = Object.values(ordersById);
  const totalItems = ordersByIdArray.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedOrders = ordersByIdArray.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="main__layout__container">
      {paginatedOrders.length === 0 && (
        <div className="empty-reservations-message">
          <h1>No orders avaliable</h1>
        </div>
      )}
      {paginatedOrders.length !== 0 && (
        <>
          <div className="order__card__container">
            {paginatedOrders.map((orders) => (
              <OrderListCard key={orders[0].id_order} orders={orders} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="reservations__table__wrapper">
              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderList;
