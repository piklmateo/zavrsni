// store.js
import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "../slices/reservations/reservationsSlice";
import categoryReducer from "../slices/category/categorySlice";
import userReducer from "../slices/user/userSlice";
import dishReducer from "../slices/dish/dishSlice";
import drinkReducer from "../slices/drink/drinkSlice";
import orderReducer from "../slices/order/orderSlice";
import orderListReducer from "../slices/order/orderListSlice";
import tableReducer from "../slices/table/tableSlice";
import statisticsReducer from "../slices/statistics/statisticsSlice";

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    category: categoryReducer,
    user: userReducer,
    dish: dishReducer,
    drink: drinkReducer,
    order: orderReducer,
    orderList: orderListReducer,
    table: tableReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
